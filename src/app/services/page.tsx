import type { Metadata } from "next";
import { SiteNav, SiteFooter, MAILTO, EMAIL } from "@/components/site/chrome";

const description =
  "Short-form editing for YouTube Shorts, TikTok and Instagram Reels, long-form YouTube editing and AI-assisted UGC. Start with a free 30 to 60 second trial edit.";

export const metadata: Metadata = {
  title: "Video Editing Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: "/services", siteName: "max.dt88", images: ["/opengraph-image"], title: "Video Editing Services | max.dt88", description },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], title: "Video Editing Services | max.dt88", description },
};

const services = [
  {
    name: "Short-form video editing",
    tag: "Main focus. YouTube Shorts, TikTok and Instagram Reels",
    text: "Personality-driven content, entertainment, storytelling, promotional videos and edits built from your reference. This is the work I do most, for clients and on my own accounts.",
  },
  {
    name: "Long-form video editing",
    tag: "For suitable YouTube and creator projects",
    text: "Full YouTube videos where the same principles apply: a clear hook, a structure that builds and pacing that keeps people watching. My commissioned portfolio here is still small, so we start with a trial to check the fit.",
  },
  {
    name: "AI-assisted UGC and video production",
    tag: "UGC-style videos with AI-assisted workflows",
    text: "UGC-style product and promo videos, produced with AI-assisted tools where they save time or open up options. I have no published client results in this area yet, and I am happy to show how the workflow runs.",
  },
];

const grey = "text-[16px] md:text-[18px] leading-[1.4] text-of-grey";
const body = "text-[16px] leading-[24px] md:text-[18px] md:leading-[25.2px] text-of-dark";

export default function ServicesPage() {
  return (
    <main className="of-page of-home min-h-screen bg-of-bg text-of-dark overflow-x-hidden">
      <SiteNav current="services" />
      <section className="px-5 md:px-[5vw] pt-[70px] pb-[70px] md:pt-[150px] md:pb-[100px]">
        <div className="mx-auto max-w-[1296px]">
          <h1 className="max-w-[1200px] text-[50px] md:text-[clamp(50px,6.3vw,90px)] leading-[1] md:leading-[0.95] font-medium">
            Video editing services
          </h1>
          <p className={`${body} mt-8 max-w-[640px]`}>
            Three ways I can help, all built on the same idea: the footage leads and the editing supports it.
          </p>
        </div>
      </section>
      <section className="px-5 md:px-[5vw]">
        <div className="mx-auto max-w-[1296px] border-t border-of-grey/40">
          {services.map((s) => (
            <article key={s.name} className="grid gap-y-4 gap-x-[22px] md:grid-cols-12 border-b border-of-grey/40 py-10 md:py-[50px]">
              <div className="md:col-span-5">
                <h2 className="text-[30px] md:text-[clamp(30px,3vw,40px)] leading-[1.1] font-medium">{s.name}</h2>
                <p className={`${grey} mt-2`}>{s.tag}</p>
              </div>
              <p className={`${body} md:col-span-6 md:col-start-7 max-w-[560px]`}>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="px-5 md:px-[5vw] pt-[70px] md:pt-[150px]">
        <div className="mx-auto max-w-[1296px] grid gap-y-6 gap-x-[22px] lg:grid-cols-12">
          <h2 className="lg:col-span-5 self-start text-[40px] md:text-[clamp(40px,4vw,57px)] leading-[1] font-medium">How we work together</h2>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 max-w-[560px]">
            <p className={body}>You send the raw footage with a reference or a short brief. I return a first cut, then we refine it together with your notes until it feels right.</p>
            <p className={body}>Along the way I keep track of what you like: pacing, captions, framing and the moments you always want kept. That way every next video needs fewer changes, which is why I prefer recurring, part-time or full-time collaborations.</p>
            <p className={body}>
              <a href={MAILTO} className="underline underline-offset-4 decoration-of-grey hover:decoration-of-dark">{EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
