"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "./track";

// Playback rules (Max 2026-11-04): desktop previews muted on hover, phones preview muted while mostly in view.
// Sound is opt-in: a click or tap selects a video (it grows slightly and a sound button appears), the button toggles
// audio, and a click anywhere else returns it to normal size, muted, button hidden. One selected video at a time.
// Selecting restarts from 0 and shows a time bar to scrub (Max 2026-11-05 "should play from the beginning ... a time bar").
let previewing: HTMLVideoElement | null = null;
let audible: HTMLVideoElement | null = null;
let selected: { box: HTMLDivElement; release: () => void } | null = null;

function silence(v: HTMLVideoElement) {
  v.muted = true;
  v.dispatchEvent(new Event("volumechange"));
  if (audible === v) audible = null;
}

function preview(v: HTMLVideoElement) {
  if (previewing && previewing !== v && previewing !== audible) previewing.pause();
  previewing = v;
  v.play().catch(() => {});
}

function withSound(v: HTMLVideoElement) {
  if (audible && audible !== v) {
    audible.pause();
    silence(audible);
  }
  audible = v;
  v.muted = false;
  v.play().catch(() => {});
}

// Icon paths from Tabler Icons (MIT): volume, volume-3, eye. 24 grid, stroke 2.
const svg = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const speaker = "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5";

function IconVolume() {
  return (
    <svg {...svg}>
      <path d="M15 8a5 5 0 0 1 0 8" />
      <path d="M17.7 5a9 9 0 0 1 0 14" />
      <path d={speaker} />
    </svg>
  );
}

function IconVolumeOff() {
  return (
    <svg {...svg}>
      <path d={speaker} />
      <path d="M16 10l4 4m0 -4l-4 4" />
    </svg>
  );
}

export function IconEye({ size = 20, stroke = 1.5 }: { size?: number; stroke?: number }) {
  return (
    <svg {...svg} width={size} height={size} strokeWidth={stroke}>
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  );
}

type MediaProps = {
  src: string;
  poster: string;
  title: string;
  alt: string;
  ratio: number; // width / height of the file; the frame takes this ratio so nothing is letterboxed
  className?: string; // sets one dimension (height or width); aspect-ratio derives the other
  badge?: React.ReactNode; // overlay pinned bottom-right on the frame (views chip, Max 2026-11-04)
};

export function Media({ src, poster, title, alt, ratio, className = "", badge }: MediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const release = useCallback(() => {
    const v = ref.current;
    if (v) {
      silence(v);
      if (hoverRef.current) v.pause();
    }
    activeRef.current = false;
    setActive(false);
    if (selected?.box === boxRef.current) selected = null;
  }, []);

  const select = () => {
    const v = ref.current;
    const box = boxRef.current;
    if (activeRef.current || !v || !box) return;
    if (selected) selected.release();
    selected = { box, release };
    activeRef.current = true;
    setActive(true);
    v.currentTime = 0;
    preview(v);
    trackEvent("clip_select", { clip: title });
  };

  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) release();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") release();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [active, release]);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    hoverRef.current = canHover;
    if (canHover || !boxRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = ref.current;
        if (!v) return;
        if (e.intersectionRatio >= 0.6) {
          if (v !== audible) preview(v);
        } else {
          if (activeRef.current) release();
          v.pause();
          silence(v);
        }
      },
      { threshold: [0, 0.6] }
    );
    io.observe(boxRef.current);
    return () => io.disconnect();
  }, [release]);

  const live = playing && !muted;

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    if (live) {
      silence(v);
    } else {
      withSound(v);
      trackEvent("clip_sound_on", { clip: title });
    }
  };

  return (
    <div
      ref={boxRef}
      role={active ? undefined : "button"}
      tabIndex={active ? -1 : 0}
      aria-label={active ? undefined : `Select ${title} to choose sound`}
      onClick={select}
      onKeyDown={(e) => {
        if (!active && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          select();
        }
      }}
      className={`relative max-w-full overflow-hidden rounded-[10px] bg-black transition-[transform,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        active ? "z-10 scale-[1.08] shadow-[0_18px_48px_rgba(0,0,0,0.6)]" : "cursor-pointer"
      } ${className}`}
      style={{ aspectRatio: ratio }}
      onMouseEnter={() => {
        const v = ref.current;
        if (!hoverRef.current || !v || activeRef.current) return;
        preview(v);
        trackEvent("clip_preview", { clip: title });
      }}
      onMouseLeave={() => {
        const v = ref.current;
        if (hoverRef.current && v && !activeRef.current) v.pause();
      }}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        data-title={title}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onTimeUpdate={(e) => active && setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        width={Math.round(ratio * 1000)}
        height={1000}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        style={{ opacity: started ? 0 : 1 }}
      />
      {badge && !active && <div className="pointer-events-none absolute bottom-3 right-3">{badge}</div>}
      {active && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8">
          <button
            type="button"
            autoFocus
            onClick={toggleSound}
            aria-pressed={live}
            aria-label={live ? `Mute ${title}` : `Play ${title} with sound`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {live ? <IconVolume /> : <IconVolumeOff />}
          </button>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.05}
            value={Math.min(time, duration || 0)}
            aria-label={`Seek ${title}`}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              const v = ref.current;
              if (!v) return;
              v.currentTime = Number(e.currentTarget.value);
              setTime(v.currentTime);
            }}
            className="h-6 min-w-0 flex-1 cursor-pointer accent-white"
          />
        </div>
      )}
    </div>
  );
}
