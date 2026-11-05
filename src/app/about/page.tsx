import { SiteNav, SiteFooter, MAILTO, EMAIL } from "@/components/site/chrome";

type Row = { title: string; paras: string[]; list?: string[] };

const rows: Row[] = [
  {
    title: "Who I am",
    paras: [
      "I'm Max, a Franco-American video editor based in the Netherlands.",
      "I started out editing for a barbershop. From there I taught myself through independent edits on my own social accounts.",
      "That work led to commissioned edits for creators and brands. Today I am expanding ongoing collaborations with creators, artists and brands.",
    ],
  },
  {
    title: "How I see content",
    paras: [
      "Content is the new way to communicate with people, and the fastest one. Different audiences care about different things, so good editing starts with knowing who the audience is, what they value and what the video should communicate.",
      "That communication can be humorous, informative, emotional, entertaining, promotional or simply satisfying to watch.",
    ],
  },
  {
    title: "How I build videos",
    paras: [
      "I start from the response the video should get. First what the audience should experience, then the payoff, the hook and the progression between them.",
      "In my Snowfall edits, viewers connected with Franklin Saint's transformation and the circumstances that drove it. I structured the edit around that emotional interest, not around effects.",
    ],
  },
  {
    title: "What drives results",
    paras: [
      "Audience response and emotional engagement. A successful edit gives its audience something to care about: humor, excitement, curiosity, recognition or an emotional connection.",
      "Engagement does not guarantee performance. It is the part of the result that editing can influence.",
    ],
  },
  {
    title: "What I prioritize",
    paras: [],
    list: [
      "1. The quality and possibilities of the available footage",
      "2. How that footage is selected and presented",
      "3. The intended audience response and the goal of the video",
    ],
  },
];

const recognition = [
  { name: "Canal+", text: "Saved one of my independent Snowfall edits." },
  { name: "Melvin Gregg", text: "Commented on one of my Snowfall edits. He played Manboy in the series." },
];

const body = "text-[16px] leading-[24px] md:text-[18px] md:leading-[25.2px] text-of-dark";
const grey = "text-[16px] md:text-[18px] leading-[1.4] text-of-grey";
const h2 = "text-[30px] md:text-[clamp(30px,3vw,40px)] leading-[1.1] font-medium";
const row = "grid gap-y-4 gap-x-[22px] md:grid-cols-12 border-b border-of-grey/40 py-10 md:py-[50px]";
const right = "md:col-span-6 md:col-start-7 max-w-[560px]";

export default function AboutPage() {
  return (
    <main className="of-page of-home min-h-screen bg-of-bg text-of-dark overflow-x-hidden">
      <SiteNav current="about" />
      <section className="px-5 md:px-[5vw] pt-[70px] pb-[70px] md:pt-[150px] md:pb-[100px]">
        <div className="mx-auto max-w-[1296px]">
          <h1 className="max-w-[1200px] text-[50px] md:text-[clamp(50px,6.3vw,90px)] leading-[1] md:leading-[0.95] font-medium">
            About me
          </h1>
          <p className={`${body} mt-8 max-w-[640px]`}>
            A video editor who puts the viewer first: the footage leads and the editing supports it.
          </p>
        </div>
      </section>
      <section className="px-5 md:px-[5vw]">
        <div className="mx-auto max-w-[1296px] border-t border-of-grey/40">
          {rows.map((r) => (
            <article key={r.title} className={row}>
              <h2 className={`${h2} md:col-span-5`}>{r.title}</h2>
              <div className={`${right} space-y-5`}>
                {r.paras.map((p) => (
                  <p key={p} className={body}>{p}</p>
                ))}
                {r.list && (
                  <ul className="space-y-1">
                    {r.list.map((li) => (
                      <li key={li} className={grey}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
          <article className={row}>
            <div className="md:col-span-5">
              <h2 className={h2}>Recognition along the way</h2>
              <p className={`${grey} mt-2`}>What started as experimenting with edits has led to some unexpected moments, including interactions with creators and accounts I grew up watching.</p>
            </div>
            <ul className={`${right} space-y-6`}>
              {recognition.map((r) => (
                <li key={r.name}>
                  <p className="text-[20px] md:text-[24px] leading-[1.2] font-medium">{r.name}</p>
                  <p className={`${body} mt-1`}>{r.text}</p>
                </li>
              ))}
            </ul>
            <div className="md:col-start-7 md:col-span-6 mt-2">
              <a href="/images/recognition/melvin-gregg-original.jpg" target="_blank" rel="noopener noreferrer" className="inline-block max-w-[220px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="View the original screenshot of Melvin Gregg's comment">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/recognition/melvin-gregg-comment.jpg" alt="Melvin Gregg commenting on my personal Snowfall edit" width={946} height={1798} loading="lazy" className="w-full rounded-lg" />
                <span className="mt-3 block text-[13px] text-of-grey underline underline-offset-4">View the original screenshot</span>
              </a>
              <p className="mt-4 text-[14px] leading-6 text-of-grey">These moments came from personal edits, outside commissioned work.</p>
            </div>
          </article>
        </div>
      </section>
      <section className="px-5 md:px-[5vw] pt-[70px] md:pt-[150px]">
        <div className="mx-auto max-w-[1296px] grid gap-y-6 gap-x-[22px] lg:grid-cols-12">
          <h2 className="lg:col-span-5 self-start text-[40px] md:text-[clamp(40px,4vw,57px)] leading-[1] font-medium">Work together</h2>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 max-w-[560px]">
            <p className={body}>I take the time to understand your style, work with your references and keep feedback easy to act on. Clear communication and consistent edits help us build a rhythm across projects.</p>
            <p className={body}>I&apos;m looking for ongoing working relationships where we can keep developing the content together.</p>
            <p className={body}>Start with a free 30 to 60 second trial edit, so you can judge the fit on your own footage.</p>
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
