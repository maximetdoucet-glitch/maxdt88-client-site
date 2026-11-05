"use client";

import React, { useEffect, useRef, useState } from "react";
import { Media, IconEye } from "@/components/site/media";
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";

// Same icon treatment as the footer (chrome.tsx).
const socialIcon = "text-of-dark transition-colors duration-500 hover:text-of-grey";
import { InquiryForm } from "@/components/site/inquiry-form";
import { EMAIL, MAILTO } from "@/components/site/chrome";
import { trackEvent } from "@/components/site/track";
import { HeroCube, HeroToolList, glass } from "@/components/site/hero-cube";

// Geometry from research/reelhaus-teardown-2026-11-04.md (container 1116, gutter 11.25vw / 24, pill h36 r209 14px,
// H2 44/52.8 two-tone, 24 pill to H2, 54 H2 to content, ~200 between sections, rows 727:379 gap 10, card r10,
// title 24/28.8, stat 40/48 + label 18). Colours: the homepage runs the dark token set (.of-home in globals.css,
// Max 2026-11-04 visual correction pass); other pages keep the light set.
export const reelWrap = "px-6 md:px-[11.25vw]";
export const reelInner = "mx-auto w-full max-w-[1116px]";
const body = "text-[16px] leading-[24px] md:text-[18px] md:leading-[27px] text-of-dark";
const grey = "text-[16px] leading-[24px] md:text-[18px] md:leading-[27px] text-of-grey";
const meta = "text-[14px] leading-[20px] text-of-grey";
const title = "text-[22px] leading-[1.2] md:text-[24px] md:leading-[28.8px] font-medium text-of-dark";
const link = "underline underline-offset-4 decoration-of-grey hover:decoration-of-dark";
const card = "rounded-[10px] bg-of-card p-[10px]";
const section = "pt-[100px] md:pt-[200px]";

// Fade-up from research/reelhaus-motion-2026-11-04.md (opacity 0 + rise, expo-out, once, no stagger), retuned to a
// 48px rise over 700ms for these compact blocks. Only blocks below the fold at load are hidden, so nothing flashes.
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rh-reveal ${className}`} data-state={state}>
      {children}
    </div>
  );
}

function Head({ pill, dark, light, className = "" }: { pill: string; dark: string; light?: string; className?: string }) {
  return (
    <div className={className}>
      <span className="inline-flex h-9 items-center rounded-[209px] bg-of-panel px-4 text-[14px] leading-[20px] text-of-dark">{pill}</span>
      <h2 className="mt-6 max-w-[820px] text-[32px] leading-[1.2] md:text-[44px] md:leading-[52.8px] font-medium text-of-dark">
        {dark}
        {light && <span className="text-of-grey"> {light}</span>}
      </h2>
    </div>
  );
}

// Views chip measured live on reelhaus.framer.website 2026-11-04 ("2.1M views"): h33, pill, white 10% fill,
// padding 0/14, gap 6, eye 20px stroke 1.5, text 12/14.4 weight 500, #fafafa. Sits on the footage bottom-right
// (Max 2026-11-04), so a black 45% blur underlay keeps it legible over bright frames.
function Views({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex h-[33px] items-center gap-[6px] rounded-full bg-black/45 px-[14px] backdrop-blur-md text-[12px] font-medium leading-[14.4px] text-of-dark ${className}`}>
      <IconEye />
      {children}
    </span>
  );
}

// Client name stays dominant; the handle follows in parentheses, smaller and muted, still a link.
function Client({ name, handle, href }: { name: string; handle?: string; href?: string }) {
  return (
    <h3 className={title}>
      {name}
      {handle && href && (
        <>
          {" "}
          <a href={href} target="_blank" rel="noopener noreferrer" className={`${meta} whitespace-nowrap font-normal ${link}`}>
            ({handle})
          </a>
        </>
      )}
    </h3>
  );
}

// Hero v6 (Max 2026-11-05 "place title slightly higher and the homepage should be somethig neutral but aesthetic
// visual"; brief e: neutral, restrained, supports the typography, no showreel or extra video). Wall rejected.
// Three static Class C candidates, pick with ?hero=a|b|c, all on the of-home tokens (#0a0a0a / #181818 / #262626):
// A light falloff + film grain, B abstract edit timeline, C one still from my work blurred to a colour field.
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const tracks = [
  [[4, 14], [20, 9], [31, 22], [56, 7], [66, 18], [87, 11]],
  [[0, 9], [12, 26], [41, 12], [57, 20], [80, 16]],
  [[7, 18], [28, 8], [39, 15], [58, 24], [85, 13]],
  [[2, 22], [27, 13], [43, 9], [55, 17], [75, 21]],
];

function Hero() {
  const [variant, setVariant] = useState<"a" | "b" | "c">("a");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("hero");
    if (v === "b" || v === "c") setVariant(v);
  }, []);
  return (
    <section className="relative flex min-h-[calc(100svh-76px)] items-center overflow-hidden md:min-h-[calc(100svh-96px)]">
      {variant === "a" && (
        <div aria-hidden className="absolute inset-0">
        </div>
      )}
      {variant === "b" && (
        <div aria-hidden className="absolute inset-x-[10px] top-[8%] flex flex-col gap-[10px] md:inset-x-[30px] md:top-[10%]">
          <div className="flex justify-between border-b border-white/10 pb-2 text-[12px] text-of-grey tabular-nums">
            {["00:00", "00:15", "00:30", "00:45", "01:00"].map((t) => (<span key={t}>{t}</span>))}
          </div>
          {tracks.map((row, r) => (
            <div key={r} className="relative h-[34px] md:h-[46px]">
              {row.map(([x, w], i) => (
                <span key={i} className="absolute top-0 h-full rounded-[6px]" style={{ left: `${x}%`, width: `${w}%`, background: r === 1 && i === 2 ? "#3a3a3a" : r % 2 ? "#181818" : "#262626" }} />
              ))}
            </div>
          ))}
          <span className="absolute bottom-[-20px] top-0 w-px bg-white/40" style={{ left: "44%" }} />
        </div>
      )}
      {variant === "c" && (
        <div aria-hidden className="absolute inset-0">
          <img src="/videos/hero/saint-13.jpg" alt="" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-[90px] saturate-[0.6]" />
          <div className="absolute inset-0 opacity-[0.07] mix-blend-screen" style={{ backgroundImage: grain }} />
        </div>
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className={`${reelWrap} relative w-full pb-28 md:pb-36`}>
        <div className={reelInner}>
          {variant === "a" && (
            <>
              <p className="relative z-10 flex justify-center"><span className={`${glass} inline-flex h-9 items-center rounded-[209px] px-4 text-[14px] leading-[20px] text-of-dark`}>The tools I use</span></p>
              <div className="relative">
                <HeroCube className="relative mx-auto -mb-2 -mt-1 aspect-square w-[300px] md:-mb-4 md:-mt-14 md:w-[min(520px,_50svh)]" />
                <HeroToolList className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex" />
              </div>
            </>
          )}
          <h1 className="text-[44px] leading-[1.02] md:text-[clamp(56px,_5.6vw,_96px)] md:leading-[1] font-medium" style={{ letterSpacing: "-0.03em" }}>
            Specialized in <br className="hidden sm:block" />
            short-form videos.
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p className={`${grey} max-w-[520px]`}>
              Shorts, Reels and TikToks built around story, pacing and payoff. Long-form edits are available too.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-[14px] md:text-[16px] text-of-grey">Start with a free 30 to 60 second trial edit</span>
              <a
                href="#contact"
                onClick={() => trackEvent("contact_click", { source: "hero" })}
                className="inline-flex h-[46px] items-center rounded-full bg-of-dark px-6 text-[16px] text-of-bg transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-of-dark"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientWork() {
  return (
    <section id="work" className={`${reelWrap} scroll-mt-6 pt-[96px] md:pt-[150px]`}>
      <div className={reelInner}>
        <Reveal>
          <Head pill="Client work" dark="Selected client work." light="Cut from the footage creators and brands sent me." />
        </Reveal>
        <Reveal className="mt-10 md:mt-[54px]">
          {/* Option A, Wyatt as the focus (Max 2026-11-04 "wyatts should be a bit bigger"): pair grown 360 to 480 tall, text on the right. */}
          <article className={`${card} lg:flex lg:items-start lg:gap-[10px]`}>
            <div className="grid grid-cols-2 gap-[10px] md:flex md:shrink-0">
              <figure>
                <figcaption className={`${meta} mb-2 px-1`}>Reference from Wyatt</figcaption>
                <Media
                  src="/videos/work/wyatt-reference.mp4"
                  poster="/videos/work/wyatt-reference.jpg"
                  ratio={480 / 854}
                  title="Wyatt's reference video"
                  alt="Frame from the reference video Wyatt Eiden sent, not my edit"
                  className="w-full md:h-[480px] md:w-auto"
                />
              </figure>
              <figure>
                <figcaption className="mb-2 px-1 text-[14px] leading-[20px] font-medium text-of-dark">My edit</figcaption>
                <Media
                  src="/videos/work/wyatt-1-final.mp4"
                  poster="/videos/work/wyatt-1-final.jpg"
                  ratio={9 / 16}
                  title="Wyatt Eiden Short, my edit"
                  alt="Frame from the Wyatt Eiden Short I edited"
                  className="w-full md:h-[480px] md:w-auto"
                  badge={<Views>1.1M+ views</Views>}
                />
              </figure>
            </div>
            <div className="flex flex-col gap-y-6 px-[10px] pb-[10px] pt-6 lg:min-w-0 lg:flex-1 lg:pb-[14px] lg:pl-[30px] lg:pr-[20px] lg:pt-[48px]">
              <div>
                <Client name="Wyatt Eiden" handle="@wyattei" href="https://www.youtube.com/@wyattei" />
              </div>
              <div>
                <p className={meta}>Assignment</p>
                <p className={`${body} mt-1 max-w-[560px]`}>Edit a Halloween street interview Short, asking people &quot;What&apos;s your Halloween costume?&quot;, to match a viral reference style provided by the creator.</p>
              </div>
              <div>
                <p className={meta}>My approach</p>
                <p className={`${grey} mt-1 max-w-[560px]`}>
                  I went through about two hours of raw footage and kept only the strongest costume reveals. Every clip starts on the reveal instead of the walk-up and cuts the moment the answer lands, so there is no dead space between people. I matched the reference&apos;s text, effects and rhythm, kept one short caption style throughout, and changed the framing with tighter crops instead of zooming on every shot, so the energy comes from the cuts.
                </p>
              </div>
              <a
                href="https://youtube.com/shorts/XeeK6zdkmOY"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("client_post_click", { clip: "wyatt_1" })}
                className={`${body} ${link} self-start`}
              >
                Watch the Short on YouTube
              </a>
            </div>
          </article>
        </Reveal>
        {/* John slightly smaller than Wyatt (Max 2026-11-04): 640:466 split puts Showtime near 620x365, SilvaParas 360 tall. */}
        <Reveal className="mt-[10px] grid gap-[10px] md:grid-cols-[640fr_466fr]">
          <article className={card}>
            <Media
              src="/videos/work/showtimejohn-store.mp4"
              poster="/videos/work/showtimejohn-store.jpg"
              ratio={1220 / 718}
              title="Showtime John, store"
              alt="Frame from the Temptations We Face store episode, edited for Showtime John"
              className="w-full"
              badge={<Views>24K views</Views>}
            />
            <div className="px-[10px] pb-[10px] pt-5">
              <Client name="Showtime John" handle="@tempweface" href="https://www.instagram.com/tempweface/" />
              <p className={`${grey} mt-2 max-w-[640px]`}>
                Short-form editing for a YouTube drama and entertainment series: an engaging standalone clip extracted from the original episode footage.
              </p>
              <a
                href="https://www.youtube.com/watch?v=fNZ4smBfW2U"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("client_post_click", { clip: "showtimejohn_series" })}
                className={`${body} ${link} mt-3 inline-block`}
              >
                Watch the mini series on YouTube
              </a>
            </div>
          </article>
          <article className={card}>
            <Media
              src="/videos/work/silvaparas-collection.mp4"
              poster="/videos/work/silvaparas-collection.jpg"
              ratio={9 / 16}
              title="SilvaParas collection promo"
              alt="Frame from the SilvaParas collection promo"
              className="h-[380px] md:h-[360px]"
              badge={<Views>3K views</Views>}
            />
            <div className="px-[10px] pb-[10px] pt-5">
              <Client name="SilvaParas" handle="@silvaparas" href="https://www.instagram.com/silvaparas/" />
              <p className={`${grey} mt-2`}>Collection promotion edited from the brand&apos;s own behind-the-scenes iPhone footage.</p>
              <a
                href="https://www.instagram.com/silvaparas/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("client_post_click", { clip: "silvaparas" })}
                className={`${body} ${link} mt-3 inline-block`}
              >
                View on Instagram
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  {
    t: "Understand the goal and references",
    d: "What the video should give its audience: humor, information, motivation, promotion or emotional connection. Then how the references achieve it through pacing, effects, framing, sound and structure.",
  },
  { t: "Select the footage", d: "The strongest moments for the intended viewer experience, not everything available." },
  { t: "Build backward from the payoff", d: "The strongest moment first, then a hook that makes viewers want to reach it and progression that keeps them watching." },
  { t: "Construct the edit", d: "Pacing, framing, captions, sound design, effects and motion graphics, where they serve the video." },
  { t: "Review and deliver", d: "I review the edit, share it, work in the agreed feedback and run a final quality check before delivery." },
];

function Approach() {
  return (
    <section className={`${reelWrap} ${section}`}>
      <div className={`${reelInner} grid gap-y-10 gap-x-[10px] md:grid-cols-[379fr_727fr]`}>
        <Reveal>
          <Head pill="How I work" dark="The footage leads." light="The editing supports it." />
        </Reveal>
        <Reveal>
          <ol className="border-t border-of-grey/40 md:mt-[60px]">
            {steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[44px_1fr] md:grid-cols-[72px_1fr] border-b border-of-grey/40 py-5 md:py-6">
                <span className={grey}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`${body} block font-medium`}>{s.t}</span>
                  <span className={`${grey} mt-1 block`}>{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[32px] leading-[1.2] md:text-[40px] md:leading-[48px] text-of-dark tabular-nums">{value}</p>
      <p className={`${grey} mt-1`}>{label}</p>
    </div>
  );
}

// Tightened (Max 2026-11-04 "poor layout much too big"): head and stats share one row, then both edits use the
// Wyatt card pattern (fixed media height left, text right) instead of a 533px card beside an empty column.
function Personal() {
  return (
    <section className={`${reelWrap} ${section}`}>
      <div className={reelInner}>
        <Reveal className="grid gap-y-8 gap-x-[10px] md:grid-cols-[1fr_auto] md:items-end">
          <Head pill="My own content" dark="Where I built my skills." light="Independent edits, published on my own accounts." />
          <div className="grid grid-cols-2 gap-x-10 md:pb-1">
            <Stat value="45M+" label="Views across my accounts" />
            <Stat value="10+" label="Edits past one million" />
          </div>
        </Reveal>
        <Reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className={grey}>
            <span className="text-of-dark">@max.dt88</span> on all platforms
          </p>
          <div className="flex items-center gap-x-4">
            <a href="https://www.youtube.com/@Max.DT88" target="_blank" rel="noopener noreferrer" aria-label="YouTube" onClick={() => trackEvent("own_profile_click", { platform: "youtube" })} className={socialIcon}><IconBrandYoutube className="h-7 w-7" stroke={1.5} /></a>
            <a href="https://www.instagram.com/max.dt88/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" onClick={() => trackEvent("own_profile_click", { platform: "instagram" })} className={socialIcon}><IconBrandInstagram className="h-7 w-7" stroke={1.5} /></a>
            <a href="https://www.tiktok.com/@max.dt88" target="_blank" rel="noopener noreferrer" aria-label="TikTok" onClick={() => trackEvent("own_profile_click", { platform: "tiktok" })} className={socialIcon}><IconBrandTiktok className="h-7 w-7" stroke={1.5} /></a>
          </div>
        </Reveal>
        {/* Symmetrical pair (Max 2026-11-05 "a bit bigger and symmetrical"): both frames share 4:5 so the cards match;
            Where Do I Start (720x814) loses about 5% per side to object-cover, Saint #13 (1080x1350) is native 4:5. */}
        <Reveal className="mt-10 grid gap-[10px] md:mt-[54px] md:grid-cols-2">
          <article className={`${card} lg:flex lg:items-start`}>
            <Media
              src="/videos/where-do-i-start.mp4"
              poster="/videos/where-do-i-start.jpg"
              ratio={4 / 5}
              title="Where Do I Start?"
              alt="Frame from my Where Do I Start? music promotion edit"
              className="w-full lg:h-[440px] lg:w-auto lg:shrink-0"
              badge={<Views>3M views</Views>}
            />
            <div className="px-[10px] pb-[10px] pt-5 lg:min-w-0 lg:flex-1 lg:pl-[20px] lg:pt-[24px]">
              <h3 className={title}>Where Do I Start?</h3>
              <p className={`${grey} mt-2`}>
                An independent music promotion for the artist TR, published on my own account. My edits for his tracks Connected and L4P reached 5M and 4M views across all platforms.
              </p>
              <a
                href="https://www.tiktok.com/@max.dt88/video/7602695229019327766"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("own_post_click", { clip: "wdis" })}
                className={`${body} ${link} mt-3 inline-block`}
              >
                Watch it on TikTok
              </a>
            </div>
          </article>
          <article className={`${card} lg:flex lg:items-start`}>
            <Media
              src="/videos/saint-13-tt3.mp4"
              poster="/videos/saint-13-tt3.jpg"
              ratio={4 / 5}
              title="Ice Tea, Russ Millions music promo"
              alt="Frame from my music promo edit for Ice Tea by Russ Millions"
              className="w-full lg:h-[440px] lg:w-auto lg:shrink-0"
              badge={<Views>1.8M views</Views>}
            />
            <div className="px-[10px] pb-[10px] pt-5 lg:min-w-0 lg:flex-1 lg:pl-[20px] lg:pt-[24px]">
              <h3 className={title}>Ice Tea, Russ Millions</h3>
              <p className={`${grey} mt-2`}>A music promotion for the song Ice Tea by Russ Millions, edited for an agency.</p>
              <a
                href="https://www.instagram.com/reel/DNDbU_ZNcsN/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("own_post_click", { clip: "saint_13" })}
                className={`${body} ${link} mt-3 inline-block`}
              >
                Watch the reel on Instagram
              </a>
            </div>
          </article>
        </Reveal>
        {/* Pair heights match: both files are near 16:9 (720/406, 1700/1000). */}
        <Reveal className="mt-[10px]">
          <article className={`${card} lg:flex lg:items-start lg:gap-[10px]`}>
            <div className="grid gap-[10px] md:grid-cols-[1773fr_1700fr] lg:min-w-0 lg:flex-1">
              <figure>
                <figcaption className={`${meta} mb-2 px-1`}>Reference</figcaption>
                <Media
                  src="/videos/work/ref-lionsgate-official.mp4"
                  poster="/videos/work/ref-lionsgate-official.jpg"
                  ratio={720 / 406}
                  title="Lionsgate reference edit"
                  alt="Frame from Lionsgate's official Hunger Games edit, the reference, not my work"
                  className="w-full"
                />
              </figure>
              <figure>
                <figcaption className="mb-2 px-1 text-[14px] leading-[20px] font-medium text-of-dark">My recreation</figcaption>
                <Media
                  src="/videos/saint-52-tt.mp4"
                  poster="/videos/work/saint-52-tt.jpg"
                  ratio={1700 / 1000}
                  title="My recreation with Snowfall footage"
                  alt="Frame from my independent recreation of the Lionsgate edit with Snowfall footage"
                  className="w-full"
                  badge={<Views>1.5M views</Views>}
                />
              </figure>
            </div>
            <div className="px-[10px] pb-[10px] pt-5 lg:w-[300px] lg:flex-none lg:pl-[20px] lg:pt-[34px]">
              <h3 className={title}>Lionsgate reference, recreated</h3>
              <p className={`${grey} mt-2 max-w-[720px]`}>
                I rebuilt Lionsgate&apos;s Katniss Everdeen edit with Snowfall footage on my own, not as a commission. Recreating professional references taught me the editing mechanics and visual execution behind them.
              </p>
              <a
                href="https://www.tiktok.com/@max.dt88/video/7621970389752696086"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("own_post_click", { clip: "lionsgate_recreation" })}
                className={`${body} ${link} mt-3 inline-block`}
              >
                Watch my recreation on TikTok
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${reelWrap} ${section} scroll-mt-6`}>
      <div className={`${reelInner} grid gap-y-10 gap-x-[10px] md:grid-cols-2`}>
        <Reveal>
          <Head pill="Contact" dark="Start with a" light="free trial edit." />
          <p className={`${body} mt-6 max-w-[440px]`}>
            Good editing partnerships start with clear expectations. A free 30 to 60 second trial gives you a chance to see my editing, turnaround and approach to feedback. It also helps me understand your footage, creative direction and workflow, so we can decide whether working together makes sense.
          </p>
          <p className={`${grey} mt-4 max-w-[440px]`}>We agree on the scope of the trial before I start.</p>
          <p className={`${body} mt-6`}>
            Or email me at{" "}
            <a href={MAILTO} onClick={() => trackEvent("contact_mailto", { source: "contact" })} className={link}>
              {EMAIL}
            </a>
          </p>
        </Reveal>
        <div className="md:pt-[60px]">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

export function HomeReel() {
  return (
    <>
      <Hero />
      <ClientWork />
      <Approach />
      <Personal />
      <Contact />
    </>
  );
}
