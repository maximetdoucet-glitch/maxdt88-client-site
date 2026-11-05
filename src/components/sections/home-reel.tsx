"use client";

import React, { useEffect, useRef, useState } from "react";
import { Media, IconEye } from "@/components/site/media";
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";

// Same icon treatment as the footer (chrome.tsx).
const socialIcon = "text-of-dark transition-colors duration-500 hover:text-of-grey";
import { InquiryForm } from "@/components/site/inquiry-form";
import { EMAIL, MAILTO } from "@/components/site/chrome";
import { trackEvent } from "@/components/site/track";
import { SoftwareTiles } from "@/components/site/software-tiles";
import { PlatformLink } from "@/components/site/platform-link";

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
    <span className={`inline-flex h-[33px] items-center gap-[6px] whitespace-nowrap rounded-full bg-black/45 px-[14px] backdrop-blur-md text-[12px] font-medium leading-[14.4px] text-of-dark ${className}`}>
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

function Hero() {
  return (
    <section className="relative flex flex-col pt-6 pb-12 md:min-h-[calc(100svh-82px)] md:justify-center md:pt-4 md:pb-10">
      {/* Max 2026-11-05: hero fills the first screen (viewport minus the 82px header). */}
      <div className={reelWrap}>
        <div className={reelInner}>
          <SoftwareTiles />
          <div className="h-10 md:h-20" aria-hidden="true" />
          <h1 className="text-[44px] leading-[1.02] md:text-[clamp(52px,_4.8vw,_80px)] md:leading-[1.02] font-medium [text-wrap:balance]" style={{ letterSpacing: "-0.03em" }}>
            Short &amp; long form video editing.
          </h1>
          <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-8">
            <p className={`${grey} max-w-[500px]`}>Shorts, Reels and TikToks built around storytelling, pacing and viewer engagement. Long-form edits are available too.</p>
            <div className="shrink-0">
              <p className="mb-3 text-[13px] text-of-grey">Start with a free 30 to 60 second trial edit</p>
              <div className="flex items-center gap-6">
                <a href="#contact" onClick={() => trackEvent("contact_click", { source: "hero" })} className="inline-flex h-[46px] items-center rounded-full bg-of-dark px-6 text-[16px] text-of-bg transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-of-dark">Contact</a>
                <a href="#work" className="text-[14px] text-of-grey underline underline-offset-4 hover:text-of-dark">See client work <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientWork() {
  return (
    <section id="work" className={`${reelWrap} scroll-mt-6 pt-[56px] md:pt-[80px]`}>
      <div className={reelInner}>
        <Reveal>
          <Head pill="Client work" dark="Selected client work." light="Cut from the footage creators and brands sent me." />
        </Reveal>
        <Reveal className="mt-10 md:mt-[54px]">
          <article className={card}>
            <div className="px-2 pt-3 pb-6 md:px-5 md:pt-5">
              <Client name="Wyatt Eiden" handle="@wyattei" href="https://www.youtube.com/@wyattei" />
              <p className={`${grey} mt-2`}>Two commissioned street interview edits, shaped around Wyatt&apos;s reference style.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.12fr_1fr] lg:gap-8">
              <div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <figure>
                    <figcaption className={`${meta} mb-2 px-1`}>Reference from Wyatt</figcaption>
                    <Media src="/videos/work/wyatt-reference.mp4" poster="/videos/work/wyatt-reference.jpg" ratio={480 / 854} title="Wyatt's reference video" alt="Frame from the reference video Wyatt Eiden sent, not my edit" className="w-full" />
                  </figure>
                  <figure>
                    <figcaption className="mb-2 px-1 text-[14px] leading-[20px] text-of-dark">My edit · 01</figcaption>
                    <Media src="/videos/work/wyatt-1-final.mp4" poster="/videos/work/wyatt-1-final.jpg" ratio={9 / 16} title="Wyatt Eiden, edit 01" alt="Frame from the first Wyatt Eiden Short I edited" className="w-full" badge={<Views>1.1M views</Views>} />
                    <PlatformLink platform="youtube" href="https://youtube.com/shorts/XeeK6zdkmOY" title="Wyatt Eiden, edit 01" />
                  </figure>
                </div>
              </div>
              <div className="px-2 pb-4 lg:pr-5">
                <p className={meta}>The first edit</p>
                <p className={`${body} mt-2`}>A Halloween street interview, cut to match the text, effects and rhythm of Wyatt&apos;s reference.</p>
                <p className={`${grey} mt-3`}>From two hours of footage, I kept the strongest costume reveals. Each cut starts on the reveal and ends when the answer lands, with tighter crops and consistent captions keeping the pace moving.</p>
                <div className="mt-6 flex items-start gap-5 border-t border-white/10 pt-5">
                  <figure className="w-[125px] shrink-0">
                    <figcaption className="mb-2 text-[14px] leading-[20px] text-of-dark">My edit · 02</figcaption>
                    <Media src="/videos/work/wyatt-2-final.mp4" poster="/videos/work/wyatt-2-final.jpg" ratio={9 / 16} title="Wyatt Eiden, edit 02" alt="Frame from the second commissioned Wyatt Eiden edit" className="w-full" badge={<Views className="!gap-[4px] !px-[8px] !text-[11px]">90K views</Views>} />
                  </figure>
                  <div className="min-w-0 pt-7">
                    <p className="text-[18px] font-medium text-of-dark">A second commission</p>
                    <p className={`${meta} mt-2`}>Another delivered edit for Wyatt&apos;s channel.</p>
                    <PlatformLink platform="instagram" href="https://www.instagram.com/reel/DfQO1OMptPH/" title="Wyatt Eiden, edit 02" />
                  </div>
                </div>
              </div>
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
              badge={<Views>24K combined views</Views>}
            />
            <div className="px-[10px] pb-[10px] pt-5">
              <p className={`${meta} mb-3`}>Combined Instagram + TikTok views</p>
              <Client name="Showtime John" handle="@tempweface" href="https://www.instagram.com/tempweface/" />
              <p className={`${grey} mt-2 max-w-[640px]`}>
                Short-form editing for a YouTube drama and entertainment series: an engaging standalone clip extracted from the original episode footage.
              </p>
              <PlatformLink platform="youtube" href="https://www.youtube.com/watch?v=fNZ4smBfW2U" title="Temptations We Face miniseries" context="Series context" />
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
              <PlatformLink platform="instagram" href="https://www.instagram.com/reel/DXO4IOKgq5B/" title="SilvaParas collection promo" />
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
          <Head pill="My own content" dark="Where I built my skills." light="Personal edits and music promotions, published on my own accounts." />
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
                A paid music promotion for the artist TR, published on my own account. My edits for his tracks Connected and L4P reached 5M and 4M views across all platforms.
              </p>
              <PlatformLink platform="tiktok" href="https://www.tiktok.com/@max.dt88/video/7602695229019327766" title="Where Do I Start?" context="Watch on" />
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
              <PlatformLink platform="instagram" href="https://www.instagram.com/reel/DNDbU_ZNcsN/" title="Ice Tea, Russ Millions" context="Watch on" />
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
              <PlatformLink platform="tiktok" href="https://www.tiktok.com/@max.dt88/video/7621970389752696086" title="Lionsgate recreation" context="Watch on" />
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
