import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy and cookies",
  description: "How max.dt88 handles visitor data, analytics and cookies.",
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", siteName: "max.dt88", images: ["/opengraph-image"], title: "Privacy and cookies | max.dt88", description: "How max.dt88 handles visitor data, analytics and cookies.", locale: "en_US" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], title: "Privacy and cookies | max.dt88", description: "How max.dt88 handles visitor data, analytics and cookies." },
};

const sections = [
  {
    h: "Who runs this site",
    p: "This site is run by Max Doucet (max.dt88), a video editor based in the Netherlands. Questions about your data: maxime.t.doucet@gmail.com.",
  },
  {
    h: "Analytics",
    p: "The site uses Vercel Web Analytics and Speed Insights to count page views and measure loading speed; they set no cookies. Only if you click Accept in the cookie banner, the site also loads Google Analytics 4 (Google Ireland Ltd.) from www.googletagmanager.com, which sends usage data to www.google-analytics.com. It records pages visited, clicks on videos and links, and that a form was sent, never what you typed into the form. Google Analytics sets the cookies _ga and _ga_<ID>, which last up to two years. If you decline, Google Analytics is never loaded and no analytics events are sent.",
  },
  {
    h: "Cookies and local storage",
    p: "The site sets no advertising cookies. Google Analytics cookies (_ga, _ga_<ID>) are only set after you accept. Your cookie choice is saved in your browser local storage so the banner does not show again. To change your choice, clear this site data in your browser settings and the banner will appear again.",
  },
  {
    h: "Contact form",
    p: "When you send the contact form, your email address and message are delivered to me through Web3Forms. I only use them to reply to your enquiry and never sell or share them.",
  },
  {
    h: "Your rights",
    p: "Under the GDPR you can ask to see, correct or delete the data I hold about you. Email me and I will handle it within 30 days.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-5 sm:px-6 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
          Back to home
        </Link>
        <h1 className="mt-8 text-4xl sm:text-5xl font-tight font-semibold tracking-tight">Privacy and cookies</h1>
        <p className="mt-4 text-white/50 text-sm">Last updated: 16 October 2026</p>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-semibold mb-3">{s.h}</h2>
              <p className="text-base text-white/75 leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
