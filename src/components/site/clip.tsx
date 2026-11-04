"use client";

import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "./track";

// One preview plays at a time across the page, so there is never more than one sound source.
let current: HTMLVideoElement | null = null;

function play(v: HTMLVideoElement) {
  if (current && current !== v) {
    current.pause();
    current.muted = true;
    current.dispatchEvent(new Event("volumechange"));
  }
  current = v;
  v.play().catch(() => {});
}

type ClipProps = {
  src: string;
  poster: string;
  label: string;
  title: string;
  ratio: number; // width / height
  cta?: { href: string; text: string };
  className?: string;
};

export function Clip({ src, poster, label, title, ratio, cta, className }: ClipProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    hoverRef.current = canHover;
    if (canHover || !boxRef.current) return;
    // Touch: play when mostly in view, pause when it leaves.
    const io = new IntersectionObserver(
      ([e]) => {
        const v = ref.current;
        if (!v) return;
        if (e.intersectionRatio >= 0.6) play(v);
        else {
          v.pause();
          v.muted = true;
        }
      },
      { threshold: [0, 0.6] }
    );
    io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.muted = true;
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      play(v);
      trackEvent("clip_sound_on", { clip: title });
    } else {
      v.muted = true;
    }
  };

  return (
    <figure className={className}>
      <figcaption className="mb-[11.7px] md:mb-[18px] text-[16px] md:text-[18px] leading-[1.4]">
        <span className="block text-of-grey">{label}</span>
        <span className="block mt-[5px] md:mt-[10px] text-of-dark">{title}</span>
      </figcaption>
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden bg-[#e8e8e3]"
        style={{ aspectRatio: String(ratio) }}
        onMouseEnter={() => {
          if (!hoverRef.current || !ref.current) return;
          play(ref.current);
          trackEvent("clip_preview", { clip: title });
        }}
        onMouseLeave={() => {
          if (hoverRef.current) stop();
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
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={`${title}, ${label}`}
          loading="lazy"
          width={Math.round(ratio * 1000)}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] pointer-events-none"
          style={{ opacity: playing ? 0 : 1 }}
        />
        <button
          type="button"
          onClick={toggleSound}
          className="absolute left-3 bottom-3 rounded-full bg-of-dark/70 px-3 py-1.5 text-[13px] text-of-bg backdrop-blur-sm transition-colors hover:bg-of-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-of-bg"
          aria-label={muted ? `Turn sound on for ${title}` : `Mute ${title}`}
        >
          {muted ? "Sound on" : "Mute"}
        </button>
      </div>
      {cta && (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("client_post_click", { clip: title })}
          className="mt-3 inline-block text-[16px] md:text-[18px] text-of-dark underline underline-offset-4 decoration-of-grey transition-colors duration-500 hover:decoration-of-dark"
        >
          {cta.text}
        </a>
      )}
    </figure>
  );
}
