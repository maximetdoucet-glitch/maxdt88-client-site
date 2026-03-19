"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { SplitChars, SplitWords } from "@/components/ui/text-effects";
import Link from "next/link";
import { TextShimmer } from "@/components/ui/text-shimmer";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function AboutUsPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-[#0369a1] selection:text-[#f4ebd0] pt-32 overflow-hidden">
      <Navbar />

      {/* HERO — About Us */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.06} particleCount={250} speed={0.5} />
        <DottedSurface className="opacity-10" />

        {/* Floating decorative glow */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#0369a1]/5 blur-[120px] pointer-events-none"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative z-10 px-6 mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0369a1]/10 rounded-full border border-[#0369a1]/20 mb-16">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#0369a1]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">About Us</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-[#f4ebd0]">
              About{" "}
              <motion.span
                className="text-[#0369a1] inline-block"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Us
              </motion.span>
            </h1>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#f4ebd0]/30">Scroll</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#0369a1]/50 to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 1 — How this started */}
      <section className="relative py-32 md:py-40 overflow-hidden border-b border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.08} particleCount={300} speed={0.6} />

        <div className="container relative z-10 px-6 mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0369a1]/10 rounded-full border border-[#0369a1]/20 mb-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">Origin</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#f4ebd0] leading-tight">
                How this <span className="text-[#0369a1]">started</span>
              </h2>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-10">
            <Reveal delay={0.15}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                What began as simple entertainment quickly turned into something much bigger.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                The edits highlighting characters like <span className="text-[#f4ebd0] font-bold">Franklin Saint</span> were originally created to capture moments of determination, resilience, and ambition — the kinds of traits people naturally gravitate toward.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="py-8 border-y border-[#0369a1]/20 my-4 relative">
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0369a1]"
                  animate={{ boxShadow: ["0 0 10px #0369a1", "0 0 30px #0369a1", "0 0 10px #0369a1"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-2xl md:text-3xl text-[#f4ebd0] font-black uppercase tracking-tight text-center">
                  The response was bigger than expected.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                In less than a year, the content reached over <span className="text-[#f4ebd0] font-bold">50 million views</span> and attracted a growing audience of people drawn to that same mindset: discipline, focus, and the pursuit of something greater.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                But watching those stories made one thing clear.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/70 font-semibold leading-relaxed">
                People aren&apos;t just entertained by that mindset — they recognize something <span className="text-[#0369a1]">familiar</span> in it.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                And that raised a question.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="bg-[#0369a1]/5 border border-[#0369a1]/15 rounded-lg p-8 md:p-10 mt-4">
                <p className="text-xl md:text-2xl text-[#f4ebd0] font-black leading-snug text-center italic">
                  If so many people are drawn to that mentality, what would it look like to build something that actually helps <span className="text-[#0369a1]">support</span> it?
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2 — The story behind it */}
      <section className="relative py-32 md:py-40 overflow-hidden border-b border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.1} particleCount={350} speed={0.7} />

        <div className="container relative z-10 px-6 mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0369a1]/10 rounded-full border border-[#0369a1]/20 mb-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">Personal</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#f4ebd0] leading-tight">
                The story <span className="text-[#0369a1]">behind</span> it
              </h2>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-10">
            <Reveal delay={0.15}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                I&apos;m a young man chasing success like many others — balancing work, learning, personal projects, and everything that comes with trying to move forward in life.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                For a long time, training was one of the most time-consuming parts of my routine. Gym sessions could easily stretch into two or three hours, and trying to balance that with everything else made consistency harder than it needed to be.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/70 font-semibold leading-relaxed">
                Eventually I started simplifying everything.
              </p>
            </Reveal>

            {/* Simplified training callout */}
            <Reveal delay={0.35}>
              <div className="grid grid-cols-3 gap-4 py-6">
                {["Shorter workouts.", "Home routines.", "Efficiency over complexity."].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-lg p-5 text-center"
                    whileHover={{ scale: 1.03, borderColor: "rgba(3, 105, 161, 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[#f4ebd0] font-bold text-sm md:text-base">{item}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                What used to take hours started taking <span className="text-[#f4ebd0] font-bold">30 minutes or less</span>, while still maintaining a strong physique and staying lean.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="py-8 border-y border-[#0369a1]/20 my-4 relative">
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0369a1]"
                  animate={{ boxShadow: ["0 0 10px #0369a1", "0 0 30px #0369a1", "0 0 10px #0369a1"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-2xl md:text-3xl text-[#f4ebd0] font-black uppercase tracking-tight text-center">
                  That change created something more valuable than just a workout routine.
                </p>
                <p className="text-xl md:text-2xl text-[#0369a1] font-black uppercase tracking-tight text-center mt-4">
                  It created time and mental clarity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                With less friction in that part of life, it became easier to focus on other pursuits — building projects, improving skills, and eventually growing an editing platform that reached <span className="text-[#f4ebd0] font-bold">tens of millions of viewers</span>.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/70 font-semibold leading-relaxed">
                At that point, the idea became obvious.
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                If these edits were already providing motivation and entertainment, why not also provide something practical?
              </p>
            </Reveal>

            <Reveal delay={0.65}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                Something simple that could help people maintain discipline while still chasing bigger goals.
              </p>
            </Reveal>

            {/* Final statement */}
            <Reveal delay={0.7}>
              <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[#0369a1]/20 relative">
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0369a1]"
                  animate={{ boxShadow: ["0 0 10px #0369a1", "0 0 30px #0369a1", "0 0 10px #0369a1"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.p
                  className="text-[#f4ebd0] font-black text-3xl md:text-5xl uppercase tracking-tight leading-tight text-center"
                >
                  That idea eventually became{" "}
                  <span className="text-[#0369a1]">this project.</span>
                </motion.p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER — Dark Mode */}
      <footer className="relative border-t border-[#333] py-16 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Navigate</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Home</Link></li>
                <li><Link href="/products" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Equipment</Link></li>
                <li><Link href="/about" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Mission</Link></li>
                <li><Link href="/about-us" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/max.dt88" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@max.dt88?_r=1&_t=ZN-94mFUrNROJH" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">TikTok</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/#signup" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Free Program</Link></li>
                <li><Link href="/faq" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#333] gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-[#f4ebd0] font-black text-sm">max</span>
                <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-sm font-black">.dt88</TextShimmer>
              </div>
              <span className="text-[#6b7280] text-xs">© 2026. All rights reserved.</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#f4ebd0]/20 uppercase font-black tracking-widest">
                INTERNAL DISTRIBUTION SYSTEM
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
