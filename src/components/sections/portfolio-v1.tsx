"use client";

import React, { useEffect, useState } from "react";
import { Clip } from "@/components/site/clip";
import { InquiryForm } from "@/components/site/inquiry-form";
import { EMAIL, MAILTO } from "@/components/site/chrome";
import { trackEvent } from "@/components/site/track";

// Values from research/ordinary-folk-teardown-2026-11-04.md: margins 20/5vw, container 1296, gutter 22,
// H1 50 to 114, H2 40 to 57, stat 32/48, body 16/18, caption above media in grey + dark.
const wrap = "px-5 md:px-[5vw]";
const inner = "mx-auto max-w-[1296px]";
const h2 = "text-[40px] md:text-[clamp(40px,4vw,57px)] leading-[1] font-medium text-of-dark";
const h3 = "text-[30px] md:text-[clamp(30px,3vw,40px)] leading-[1.1] font-medium text-of-dark";
const body = "text-[16px] leading-[24px] md:text-[18px] md:leading-[25.2px] text-of-dark";
const grey = "text-[16px] md:text-[18px] leading-[1.4] text-of-grey";
const section = "pt-[70px] md:pt-[150px]";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className={grey}>{label}</p>
      <p className="mt-2 text-[32px] md:text-[48px] leading-[1.05] font-medium text-of-dark tabular-nums">{value}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className={`${wrap} pt-[70px] pb-[70px] md:pt-[150px] md:pb-[150px]`}>
      <div className={`${inner}`}>
        <p className={grey}>Short-form video editor for creators and brands</p>
        <h1 className="mt-6 max-w-[1200px] text-[50px] md:text-[clamp(50px,7.9vw,114px)] leading-[1] md:leading-[0.95] font-medium text-of-dark">
          Editing that puts your content first.
        </h1>
        <p className={`${body} mt-8 max-w-[640px]`}>
          Short-form video editing for creators and brands, built around storytelling, pacing and the viewing experience.
        </p>
        <p className={`${body} mt-6 max-w-[640px]`}>
          Not sure yet? Start with one free 30 to 60 second trial edit and judge the fit before we talk about ongoing work.{" "}
          <a href={MAILTO} onClick={() => trackEvent("contact_mailto", { source: "hero" })} className="underline underline-offset-4 decoration-of-grey hover:decoration-of-dark">
            Contact
          </a>
        </p>
      </div>
    </section>
  );
}

function Wyatt() {
  return (
    <section id="work" className={`${wrap} scroll-mt-6`}>
      <div className={inner}>
        <p className={grey}>Client work</p>
        <h2 className={`${h2} mt-3`}>Wyatt Eiden</h2>
        <p className={`${body} mt-6 max-w-[640px]`}>
          Street interviews and IRL comedy. Wyatt sent me a reference video for the style he wanted, and I edited two Shorts for his channel.
        </p>
        <div className="mt-10 md:mt-[50px] grid grid-cols-2 md:grid-cols-4 gap-x-[22px] gap-y-8">
          <Stat value="1.1M+" label="YouTube views on the first Short" />
          <Stat value="1.21M" label="Channel subscribers" />
        </div>
        <div className="mt-12 md:mt-[70px] grid gap-y-12 gap-x-[22px] md:grid-cols-3">
          <Clip
            src="/videos/work/wyatt-reference.mp4"
            poster="/videos/work/wyatt-reference.jpg"
            ratio={480 / 854}
            label="Reference, by Wyatt Eiden"
            title="Wyatt's original video"
          />
          <Clip
            src="/videos/work/wyatt-1-final.mp4"
            poster="/videos/work/wyatt-1-final.jpg"
            ratio={9 / 16}
            label="Edited by me, 1.1M+ views"
            title="Delivered Short 1"
            cta={{ href: "https://youtube.com/shorts/XeeK6zdkmOY", text: "Watch on YouTube" }}
          />
          <Clip
            src="/videos/work/wyatt-2-final.mp4"
            poster="/videos/work/wyatt-2-final.jpg"
            ratio={9 / 16}
            label="Edited by me"
            title="Delivered Short 2"
            cta={{ href: "https://youtube.com/shorts/r812DPsSyBQ", text: "Watch on YouTube" }}
          />
        </div>
      </div>
    </section>
  );
}

function OtherClients() {
  return (
    <section className={`${wrap} ${section}`}>
      <div className={inner}>
        <p className={grey}>Client work</p>
        <h2 className={`${h2} mt-3`}>More creators and brands</h2>
        <p className={`${body} mt-6 max-w-[640px]`}>
          Both projects came with a lot of creative freedom. I worked from footage the clients supplied, and they chose the music.
        </p>

        <div className="mt-12 md:mt-[70px]">
          <h3 className={h3}>Showtime John</h3>
          <p className={`${grey} mt-2`}>Short-form entertainment and storytelling</p>
          <div className="mt-8 grid gap-y-12 gap-x-[22px] md:grid-cols-2">
            <Clip src="/videos/work/showtimejohn-store.mp4" poster="/videos/work/showtimejohn-store.jpg" ratio={980 / 576} label="Edited by me" title="Temptations We Face, store" />
            <Clip src="/videos/work/showtimejohn-park.mp4" poster="/videos/work/showtimejohn-park.jpg" ratio={1024 / 576} label="Edited by me" title="Temptations We Face, park" />
          </div>
          <a
            href="https://www.instagram.com/tempweface/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("client_post_click", { clip: "showtimejohn_account" })}
            className={`${body} mt-6 inline-block underline underline-offset-4 decoration-of-grey hover:decoration-of-dark`}
          >
            See the series on Instagram
          </a>
        </div>

        <div className="mt-16 md:mt-[100px] grid gap-y-10 gap-x-[22px] md:grid-cols-4">
          <div className="md:col-span-2 md:pr-[50px]">
            <h3 className={h3}>SilvaParas</h3>
            <p className={`${grey} mt-2`}>Fashion and brand promotion</p>
            <p className={`${body} mt-6 max-w-[480px]`}>
              Promotional edits for the SilvaParas collection, cut from the brand&apos;s own footage.
            </p>
            <p className={`${body} mt-6 flex flex-wrap gap-x-6 gap-y-2`}>
              <a href="https://www.instagram.com/silvaparas/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("client_post_click", { clip: "silvaparas_account" })} className="underline underline-offset-4 decoration-of-grey hover:decoration-of-dark">
                SilvaParas on Instagram
              </a>
              <a href="https://www.silvaparas.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-of-grey hover:decoration-of-dark">
                Their website
              </a>
            </p>
          </div>
          <Clip src="/videos/work/silvaparas-collection.mp4" poster="/videos/work/silvaparas-collection.jpg" ratio={9 / 16} label="Edited by me" title="Collection promo" />
          <Clip src="/videos/work/silvaparas-process.mp4" poster="/videos/work/silvaparas-process.jpg" ratio={584 / 1038} label="Edited by me" title="Brand promo" />
        </div>
      </div>
    </section>
  );
}

const steps = [
  "I study your references and work out the viewing experience you are going for.",
  "I pick footage for what keeps a viewer interested: curiosity, humor, emotion and story.",
  "I structure the video around buildup, progression and payoff.",
  "Framing, pacing, sound design, captions and effects go where they make the content stronger.",
  "I work in your feedback and check the final delivery before it goes out.",
];

function Approach() {
  return (
    <section className={`${wrap} ${section}`}>
      <div className={`${inner} grid gap-y-10 gap-x-[22px] lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <p className={grey}>How I work</p>
          <h2 className={`${h2} mt-3 max-[400px]:text-[34px]`}>The footage leads. The editing supports it.</h2>
          <p className={`${body} mt-6 max-w-[480px]`}>
            You get a video that feels like your channel and holds attention, without effects that pull focus from what you filmed.
          </p>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7 border-t border-of-grey/40">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[48px_1fr] md:grid-cols-[72px_1fr] border-b border-of-grey/40 py-5 md:py-6">
              <span className={grey}>{i + 1}</span>
              <span className={body}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Recognition() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className="mt-16 md:mt-[100px] grid gap-y-8 gap-x-[22px] md:grid-cols-12 items-start">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:col-span-3 block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-of-dark"
        aria-label="Enlarge the original Instagram screenshot"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/recognition/melvin-gregg-comment.jpg"
          alt="Instagram post of my Snowfall edit with the comment 'This edit' and three fire emojis from melvingregg"
          width={946}
          height={1798}
          loading="lazy"
          className="w-full max-w-[280px] h-auto"
        />
        <span className={`${grey} mt-3 block`}>Tap to see the original screenshot</span>
      </button>
      <div className="md:col-span-6 md:col-start-5">
        <h3 className={h3}>Recognized by the people behind the content.</h3>
        <p className={`${body} mt-6 max-w-[560px]`}>
          While developing my skills through independent cinematic edits, one of my Snowfall videos caught the attention of Melvin Gregg, an actor from the series and established digital creator, who commented on my work.
        </p>
        <p className={`${grey} mt-4 max-w-[560px]`}>An independent personal edit. Not a commission, collaboration or endorsement.</p>
      </div>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Original Instagram screenshot"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-of-dark/90 p-5"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/recognition/melvin-gregg-original.jpg"
            alt="Original uncropped Instagram screenshot with the melvingregg comment"
            width={946}
            height={2048}
            className="max-h-full w-auto"
          />
          <button type="button" className="absolute right-5 top-5 text-of-bg text-[18px] underline underline-offset-4" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function PersonalResults() {
  return (
    <section className={`${wrap} ${section}`}>
      <div className={inner}>
        <p className={grey}>Independent work on my own accounts, not client work</p>
        <h2 className={`${h2} mt-3`}>Results from my own content</h2>
        <div className="mt-10 md:mt-[50px] grid grid-cols-2 md:grid-cols-4 gap-x-[22px] gap-y-8">
          <Stat value="45M+" label="Total views across my own content" />
          <Stat value="10+" label="Videos past one million views" />
          <Stat value="5M" label="Views on Connected, Instagram and TikTok" />
          <Stat value="Nearly 4M" label="Views on L4P" />
        </div>
        <div className="mt-12 md:mt-[70px] grid gap-y-10 gap-x-[22px] md:grid-cols-12 items-start">
          <Clip
            className="md:col-span-5"
            src="/videos/where-do-i-start.mp4"
            poster="/videos/where-do-i-start.jpg"
            ratio={720 / 814}
            label="Music promotion, my own edit"
            title="Where Do I Start?"
          />
          <div className="md:col-span-6 md:col-start-7 md:pt-[68px]">
            <h3 className={h3}>#1 most-liked video on the &quot;Where Do I Start?&quot; sound.</h3>
            <p className={`${body} mt-6 max-w-[560px]`}>
              Publishing again and again on my own accounts taught me what keeps people watching: a clear hook, a story that builds and a payoff worth waiting for. The numbers show reach. They do not prove that any single editing choice caused it.
            </p>
          </div>
        </div>
        <Recognition />
      </div>
    </section>
  );
}

function Study({ name, text, original, recreation }: {
  name: string;
  text: string;
  original: { src: string; poster: string; ratio: number; title: string };
  recreation: { src: string; poster: string; ratio: number; title: string };
}) {
  return (
    <div className="mt-12 md:mt-[70px]">
      <h3 className={h3}>{name}</h3>
      <p className={`${body} mt-4 max-w-[640px]`}>{text}</p>
      <div className="mt-8 grid gap-y-12 gap-x-[22px] md:grid-cols-2 items-start">
        <Clip {...original} label={`Original, by ${name}`} />
        <Clip {...recreation} label="My recreation" />
      </div>
    </div>
  );
}

function Recreations() {
  return (
    <section className={`${wrap} ${section}`}>
      <div className={inner}>
        <p className={grey}>Independent style studies</p>
        <h2 className={`${h2} mt-3`}>Reference recreations</h2>
        <p className={`${body} mt-6 max-w-[640px]`}>
          I break an original down cut by cut, its rhythm, transitions and on-screen text, then rebuild that structure with different footage. These are personal studies with no affiliation to Lionsgate or Ligue 1.
        </p>
        <Study
          name="Lionsgate"
          text="Lionsgate's own Hunger Games edit, rebuilt with Snowfall footage."
          original={{ src: "/videos/work/ref-lionsgate-official.mp4", poster: "/videos/work/ref-lionsgate-official.jpg", ratio: 720 / 406, title: "The Hunger Games edit" }}
          recreation={{ src: "/videos/saint-52-tt.mp4", poster: "/videos/work/saint-52-tt.jpg", ratio: 1700 / 1000, title: "Snowfall, same style" }}
        />
        <Study
          name="Ligue 1"
          text="A Ligue 1 match edit, rebuilt with N.E.C. Nijmegen footage."
          original={{ src: "/videos/work/ref-ligue1.mp4", poster: "/videos/work/ref-ligue1.jpg", ratio: 762 / 576, title: "Ligue 1 edit" }}
          recreation={{ src: "/videos/n-e-c-1-fv-tt.mp4", poster: "/videos/work/n-e-c-1-fv-tt.jpg", ratio: 1480 / 1040, title: "N.E.C., same style" }}
        />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${wrap} ${section}`}>
      <div className={`${inner} grid gap-y-10 gap-x-[22px] md:grid-cols-12`}>
        <div className="md:col-span-5">
          <h2 className={h2}>Need an editor for the long run?</h2>
          <p className={`${body} mt-6 max-w-[480px]`}>
            I work best in recurring partnerships with creators and brands. Start with one free 30 to 60 second trial edit with an agreed scope, so you can judge the fit before we talk about ongoing work.
          </p>
          <p className={`${body} mt-6`}>
            Or email me directly at{" "}
            <a href={MAILTO} onClick={() => trackEvent("contact_mailto", { source: "contact" })} className="underline underline-offset-4 decoration-of-grey hover:decoration-of-dark">
              {EMAIL}
            </a>
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

export function PortfolioV1() {
  return (
    <>
      <Hero />
      <Wyatt />
      <OtherClients />
      <Approach />
      <PersonalResults />
      <Recreations />
      <Contact />
    </>
  );
}
