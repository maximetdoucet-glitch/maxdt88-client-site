"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import VaporizeTextCycle from "@/components/ui/vapour-text-effect";
import RadialShaderEffect from "@/components/ui/raidal-2";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { MetalButton, LiquidButton } from "@/components/ui/liquid-glass-button";
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

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle: string, centered?: boolean }) => (
  <div className={centered ? "text-center mb-16" : "mb-12"}>
    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-[#f4ebd0]">
      <SplitChars text={title} />
    </h2>
    <p className="text-lg text-[#f4ebd0]/50 max-w-2xl mx-auto font-medium tracking-tight uppercase">
      <SplitWords text={subtitle} delay={0.4} />
    </p>
  </div>
);

export default function Vision() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-[#0369a1] selection:text-[#f4ebd0] pt-32 overflow-hidden">
      <Navbar />
      
      {/* SECTION 1 — THE BELIEF */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
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
          {/* Section badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0369a1]/10 rounded-full border border-[#0369a1]/20 mb-16">
              <motion.span 
                className="w-1.5 h-1.5 rounded-full bg-[#0369a1]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">The Belief</span>
            </div>
          </Reveal>

          {/* Hero heading */}
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-20 text-[#f4ebd0]">
              Why this<br />
              <motion.span 
                className="text-[#0369a1] inline-block"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                project
              </motion.span>{" "}exists
            </h1>
          </Reveal>

          {/* Staggered paragraphs with generous spacing */}
          <div className="max-w-3xl mx-auto space-y-10">
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/50 font-medium leading-relaxed">
                The internet is full of content designed to capture attention.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/50 font-medium leading-relaxed">
                Every day, millions of people watch stories about individuals who overcome impossible odds, rise above their circumstances, and refuse to stay weak.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed">
                Characters like <span className="text-[#f4ebd0] font-bold">Franklin Saint</span> resonate with audiences because of the mindset behind their actions — not the chaos around them.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/50 font-medium leading-relaxed">
                Across sports, business, and real life, the same pattern repeats itself.
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/50 font-medium leading-relaxed">
                People admire those who stay composed under pressure, adapt when things become difficult, and keep moving forward when others stop.
              </p>
            </Reveal>

            <Reveal delay={0.7}>
              <p className="text-lg md:text-xl text-[#f4ebd0]/60 font-medium leading-relaxed pt-4">
                This project was created around a simple belief:
              </p>
            </Reveal>
          </div>

          {/* Cinematic conclusion statement */}
          <Reveal delay={0.9}>
            <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-[#0369a1]/20 relative">
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0369a1]"
                animate={{ boxShadow: ["0 0 10px #0369a1", "0 0 30px #0369a1", "0 0 10px #0369a1"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.p 
                className="text-[#f4ebd0] font-black text-3xl md:text-5xl uppercase tracking-tight leading-tight"
                whileInView={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                discipline is the foundation behind every form of{" "}
                <span className="text-[#0369a1]">success.</span>
              </motion.p>
            </div>
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

      {/* SECTION 2 — THE REALITY */}
      <section className="relative py-40 bg-[#0a0a0a] text-[#f4ebd0] overflow-hidden border-t border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.1} particleCount={400} speed={0.8} />
        <div className="container relative z-20 px-6 mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0369a1]/10 rounded-sm border border-[#0369a1]/20 mb-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">SECTION 2 — THE REALITY</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-none text-[#f4ebd0]">
                The challenge <span className="text-[#0369a1]">ambitious</span> people face
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-[#f4ebd0]/60 font-medium leading-relaxed text-lg">
                    For people chasing something meaningful, life rarely slows down.
                  </p>
                  <p className="text-[#f4ebd0]/60 font-medium leading-relaxed text-lg">
                    Work, studies, relationships, responsibilities, and personal goals all compete for time and attention.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-[#f4ebd0]/60 font-medium leading-relaxed text-lg">
                    Maintaining discipline across every area of life becomes difficult when the schedule never stops moving.
                  </p>
                  <p className="text-[#f4ebd0]/60 font-medium leading-relaxed text-lg">
                    Most people understand the importance of physical strength and mental resilience.
                  </p>
                </div>
              </div>
              
              <div className="text-center pt-12 border-t border-white/10">
                <p className="text-[#f4ebd0]/60 font-medium leading-relaxed text-xl mb-4">
                  But maintaining that baseline consistently can become another source of stress.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-8">
                  <div className="text-center">
                    <p className="text-[#f4ebd0]/30 font-black uppercase tracking-tighter text-3xl line-through decoration-[#0369a1]">Perfection</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2">The trap</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#f4ebd0] font-black uppercase tracking-tighter text-5xl">Consistency</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 underline decoration-[#0369a1] decoration-2 underline-offset-4">The Goal</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — THE INTENTION */}
      <section className="py-40 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.15} particleCount={300} speed={0.4} />
        <div className="container px-6 mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0369a1]/10 rounded-sm border border-[#0369a1]/20 mb-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">SECTION 3 — THE INTENTION</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#f4ebd0] mb-12">
                What this site is <span className="text-[#0369a1]">meant</span> to provide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-[#0369a1] font-black uppercase tracking-widest text-sm">The Foundation</h3>
                <p className="text-[#f4ebd0]/80 font-medium leading-relaxed">
                  The purpose of this project is simple. Not to promise shortcuts. Not to sell unrealistic dreams.
                </p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-[#0369a1] font-black uppercase tracking-widest text-sm">The Catalyst</h3>
                <p className="text-[#f4ebd0]/80 font-medium leading-relaxed">
                  Instead, the goal is to provide small systems that make discipline easier to maintain.
                </p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-[#0369a1] font-black uppercase tracking-widest text-sm">The Support</h3>
                <p className="text-[#f4ebd0]/80 font-medium leading-relaxed">
                  The edits highlight individuals who embody relentless determination. The tools on this site support that mindset.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="bg-[#0369a1]/5 p-12 border border-[#0369a1]/20 rounded-sm">
                <div className="space-y-4 mb-12">
                  <p className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#f4ebd0]">A simple training structure that removes friction.</p>
                  <p className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#f4ebd0]">A system that makes consistency easier.</p>
                  <p className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#f4ebd0]">A place for people who value discipline and personal progress.</p>
                </div>
                
                <div className="space-y-4 pt-8 border-t border-white/10">
                  <p className="text-[#f4ebd0]/40 font-medium text-lg uppercase tracking-widest italic">
                    Because success rarely comes from motivation alone.
                  </p>
                  <p className="text-[#f4ebd0] font-black text-2xl md:text-3xl uppercase tracking-tighter">
                    It comes from <span className="text-[#0369a1]">systems</span> that make the right actions easier to repeat every day
                  </p>
                </div>
              </div>

              <div className="pt-20">
                <LiquidButton onClick={() => window.location.href = "/#signup"}>
                  Initialize Your System
                </LiquidButton>
              </div>
            </div>
          </Reveal>
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
