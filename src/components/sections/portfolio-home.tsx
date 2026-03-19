"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowUpRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioHomeProps {
  showContent: boolean;
}

export function PortfolioHome({ showContent }: PortfolioHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showContent) return;
    
    const sections = containerRef.current?.querySelectorAll("section");
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [showContent]);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {/* FIXED CONTINUOUS BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground 
          color="#0369a1" 
          particleCount={800}
          speed={1.2}
          trailOpacity={0.04}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 w-full">
        {/* 1. HERO SECTION */}
        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-[#f4ebd0] mb-8">
                I create edits <br className="hidden md:block" />
                that drive <span className="text-[#0369a1]">engagement.</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/50 font-medium leading-relaxed mb-12">
                High-retention editing for athletes, artists, and modern brands.
              </p>

              <div className="flex justify-center">
                <Link href="#contact">
                  <ShimmerButton 
                    background="#0369a1"
                    className="px-10 py-5 rounded-full text-[#f4ebd0] text-xl font-bold shadow-[0_0_40px_rgba(3,105,161,0.3)] hover:scale-105 transition-transform"
                  >
                    Book a call
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <div className="w-px h-12 bg-white" />
          </div>
        </section>

        {/* 2. PROOF SECTION */}
        <section id="proof" className="py-24 px-6 relative z-10 overflow-hidden bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-10">
              <div className="h-px w-24 bg-[#0369a1]/30" />
              <p className="text-xl md:text-2xl text-[#f4ebd0] font-medium tracking-tight text-center opacity-80 uppercase tracking-[0.2em]">
                Seen by creators, brands, and verified names
              </p>
              <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 mt-4">
                {["ESPN UK", "Canal+", "Bash The Entertainer", "Verified Creators"].map((name) => (
                  <span key={name} className="text-lg md:text-3xl font-black uppercase tracking-widest">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. WORK SECTION (Solid Background for Visual Design) */}
        <section id="work" className="relative py-20 px-6 space-y-20 bg-black z-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-[#0369a1] mb-12 tracking-[0.3em] uppercase opacity-70">Selected Work</h2>
            
            <div className="space-y-32">
              <div className="group relative aspect-video w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-[#0369a1]/30">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <div className="w-24 h-24 rounded-full bg-[#0369a1]/20 backdrop-blur-xl flex items-center justify-center border border-[#0369a1]/40">
                    <Play className="w-10 h-10 text-[#f4ebd0] fill-[#f4ebd0]" />
                  </div>
                </div>
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/5 max-w-lg">
                    <h3 className="text-4xl font-black text-[#f4ebd0] mb-2 tracking-tighter">Story-driven edit</h3>
                    <p className="text-white/40 font-medium tracking-tight">Focusing on pacing and narrative flow.</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="group relative aspect-video w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-[#0369a1]/30">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <div className="w-24 h-24 rounded-full bg-[#0369a1]/20 backdrop-blur-xl flex items-center justify-center border border-[#0369a1]/40">
                    <Play className="w-10 h-10 text-[#f4ebd0] fill-[#f4ebd0]" />
                  </div>
                </div>
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/5 max-w-lg ml-auto text-right">
                    <h3 className="text-4xl font-black text-[#f4ebd0] mb-2 tracking-tighter">High-retention project</h3>
                    <p className="text-white/40 font-medium tracking-tight">Engineered for maximum audience watch time.</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT I DO */}
        <section id="services" className="py-40 px-6 relative z-10 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#0369a1] mb-8 tracking-[0.3em] uppercase opacity-70">What I do</h2>
            <p className="text-3xl md:text-5xl lg:text-6xl font-black text-[#f4ebd0] tracking-tighter leading-[1.1]">
              I create <span className="text-[#0369a1]">high-retention edits</span> designed to capture attention, increase watch time, and elevate your content.
            </p>
          </div>
        </section>

        {/* 5. FOR WHO / BRANDS */}
        <section id="target" className="py-40 px-6 relative z-10 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#f4ebd0] mb-24 text-center">
              Built for brands that <span className="text-[#0369a1]">value engagement.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Athletes", desc: "Dynamic storytelling that captures the intensity of performance and builds a direct connection with your audience." },
                { title: "Creative Artists", desc: "Elevating your distinct aesthetic with rhythmic editing and cinematic visuals that amplify your creative voice." },
                { title: "Modern Brands", desc: "Strategic video content designed to dominate attention, increase watch time, and drive measurable brand growth." }
              ].map((tier, i) => (
                <div key={i} className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-[#0369a1]/30 transition-all duration-500 group relative">
                  <h3 className="text-3xl font-black text-[#f4ebd0] mb-6 uppercase tracking-tight">{tier.title}</h3>
                  <p className="text-white/40 font-medium leading-relaxed mb-10 text-lg">{tier.desc}</p>
                  <div className="flex items-center gap-2 text-[#0369a1] text-xs font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Partner with me <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section id="contact" className="py-48 px-6 text-center relative z-10 border-t border-white/5 bg-transparent">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-[#f4ebd0]">
              Ready to <br />
              <span className="text-[#0369a1]">elevate?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-xl mx-auto">
              Accepting a limited number of client projects.
            </p>
            <div className="pt-8">
              <ShimmerButton 
                background="#0369a1"
                className="px-12 py-6 rounded-full text-[#f4ebd0] text-2xl font-black shadow-[0_0_60px_rgba(3,105,161,0.4)]"
              >
                Book a call
              </ShimmerButton>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center relative z-10 bg-black">
          <p className="text-white/20 text-xs font-bold tracking-[0.5em] uppercase">
            © 2026 MAXDT88. CINEMATIC EXCELLENCE.
          </p>
        </footer>
      </div>
    </div>
  );
}
