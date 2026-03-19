"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/navbar";
import NeuralBackground from "@/components/ui/flow-field-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { BlurText } from "@/components/ui/blur-text";
import { RevealText } from "@/components/ui/reveal-text";
import { ArrowUpRight, Play, Users, BarChart3, Zap, Video, TrendingUp, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioHomeProps {
  showContent: boolean;
}

export function PortfolioHome({ showContent }: PortfolioHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showContent) return;
  }, [showContent]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <NeuralBackground 
          color="#0369a1" 
          particleCount={400}
          speed={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none" />
      </div>

      <div className="relative z-10">
        {/* 1. HERO SECTION */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
          <div className="max-w-4xl w-full text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="inline-block"
            >
              <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                <span className="text-[#0369a1] text-xs font-bold tracking-widest uppercase">
                  Premium Creative Services
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#f4ebd0] mb-6">
              I TURN <span className="text-[#0369a1]">CONTENT</span><br />
              INTO ATTENTION.
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-medium leading-relaxed">
              High-retention editing for athletes, artists, and elite brands who refuse to be ignored.
            </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={showContent ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-8"
            >
              <ShimmerButton 
                background="#0369a1"
                className="px-10 py-5 rounded-full text-[#f4ebd0] text-lg font-bold shadow-[0_0_40px_rgba(3,105,161,0.4)]"
              >
                Start Your Growth
              </ShimmerButton>
            </motion.div>
          </div>

          {/* Hero Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0369a1]/10 rounded-full blur-[120px] -z-10" />
        </section>

        {/* 2. PROOF / CREDIBILITY */}
        <section id="proof" className="py-24 px-6 border-y border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <h3 className="text-4xl md:text-6xl font-black text-[#f4ebd0]">50M+</h3>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Across Platforms</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-6xl font-black text-[#f4ebd0]">100%</h3>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Retention Focus</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-6xl font-black text-[#f4ebd0]">15+</h3>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Global Brands</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-6xl font-black text-[#f4ebd0]">24/7</h3>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Creative Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK */}
        <section id="work" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#f4ebd0]">SELECTED <span className="text-[#0369a1]">WORK</span></h2>
                <p className="text-white/40 max-w-md font-medium">A showcase of high-performance visual storytelling.</p>
              </div>
              <div className="h-[1px] flex-1 bg-white/10 hidden md:block mx-12" />
              <button className="flex items-center gap-2 text-[#0369a1] font-bold group">
                VIEW ALL PROJECTS <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            <BentoGrid className="max-w-7xl mx-auto">
              <BentoCard
                name="Elite Athlete Content"
                className="md:col-span-3"
                background={<div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222]" />}
                Icon={Video}
                description="Leveraging high-retention editing to dominate the algorithm."
                href="#work"
                cta="Watch Project"
              />
              <BentoCard
                name="Brand Documentary"
                className="md:col-span-3"
                background={<div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222]" />}
                Icon={Play}
                description="Cinematic storytelling for high-end luxury brands."
                href="#work"
                cta="Watch Project"
              />
              <BentoCard
                name="Social Growth Series"
                className="md:col-span-2"
                background={<div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222]" />}
                Icon={TrendingUp}
                description="Viral short-form content that converts views into followers."
                href="#work"
                cta="Watch Project"
              />
              <BentoCard
                name="Strategic Narrative"
                className="md:col-span-4"
                background={<div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222]" />}
                Icon={Target}
                description="Crafting a message that resonates with your core audience."
                href="#work"
                cta="Watch Project"
              />
            </BentoGrid>
          </div>
        </section>

        {/* 4. WHAT I DO */}
        <section id="services" className="py-32 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0369a1]/20 rounded-full blur-[60px]" />
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#f4ebd0] relative z-10 leading-[0.9]">
                  THE <span className="text-[#0369a1]">SCIENCE</span> OF VIRALITY.
                </h2>
              </div>
              <div className="grid gap-12">
                {[
                  { icon: Zap, title: "High-Retention Editing", desc: "Every frame is calculated to keep eyes glued to the screen." },
                  { icon: BarChart3, title: "Growth Strategy", desc: "We don't just edit; we build the blueprint for your platform growth." },
                  { icon: Users, title: "Personal Branding", desc: "Turning your unique personality into a recognizable global brand." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#0369a1]/10 border border-[#0369a1]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0369a1] transition-colors duration-500">
                      <s.icon className="w-6 h-6 text-[#0369a1] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#f4ebd0] mb-2">{s.title}</h4>
                      <p className="text-white/40 leading-relaxed font-medium">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHO IT'S FOR */}
        <section id="target" className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#f4ebd0] mb-6 uppercase">Built for the <span className="text-[#0369a1]">Relentless.</span></h2>
            <p className="text-white/40 max-w-xl mx-auto font-medium">We only partner with those who aim for the top tier of their industry.</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Athletes", "Creative Artists", "Modern Brands"].map((tier, i) => (
              <div key={i} className="p-10 rounded-[2rem] bg-black/40 border border-white/5 hover:border-[#0369a1]/30 transition-all duration-500 group relative overflow-hidden">
                <GlowingEffect 
                  blur={20}
                  inactiveZone={0.7}
                  proximity={0}
                  spread={40}
                  variant="default"
                  glow={true}
                  movementDuration={2}
                  borderWidth={1}
                  disabled={false}
                />
                <h3 className="text-3xl font-black text-[#f4ebd0] mb-4 uppercase">{tier}</h3>
                <p className="text-white/40 font-medium mb-8 leading-relaxed">
                  Tailored visual systems designed to highlight dominance and authority in your niche.
                </p>
                <div className="flex items-center gap-2 text-[#0369a1] text-sm font-black tracking-widest uppercase">
                  Learn More <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section id="contact" className="py-48 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-[#f4ebd0]">
              READY TO <br />
              <span className="text-[#0369a1]">DOMINATE?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl mx-auto">
              Accepting limited clients for the upcoming quarter. Apply for a consultation.
            </p>
            <div className="pt-8">
              <ShimmerButton 
                background="#0369a1"
                className="px-16 py-6 rounded-full text-[#f4ebd0] text-2xl font-black shadow-[0_0_60px_rgba(3,105,161,0.5)] scale-110"
              >
                APPLY NOW
              </ShimmerButton>
            </div>
          </div>
          
          {/* Background Highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0369a1]/10 rounded-full blur-[150px] -z-10" />
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">
            © 2026 MAXDT88. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  );
}
