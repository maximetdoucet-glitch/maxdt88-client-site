"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Twitter, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { SignupForm } from "@/components/ui/signup-form";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RevealText } from "@/components/ui/reveal-text";
import { TextShimmer } from "@/components/ui/text-shimmer";

/* ─── Lazy-load heavy visual components ─── */
const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });

export function MobileLandingV11({ showContent }: { showContent: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Continuous Flow background movement
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.95, 0.8, 0.95]);

  const scrollToSignup = () => {
    const el = document.getElementById('signup-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useGSAP(() => {
    if (!showContent) return;
    const ctx = gsap.context(() => {
      // 1. Light Burst
      gsap.fromTo(".v11-hero-burst",
        { scale: 0.6, opacity: 0 },
        { scale: 1.5, opacity: 0.5, duration: 2.0, ease: "power2.out", delay: 0.1 }
      );

      // 2. Stagger elements
      gsap.fromTo(".v11-stagger", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 1.4 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [showContent]);

  return (
    <div ref={containerRef} id="mobile-v11-copy-lock" className="flex flex-col bg-[#000000] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden scroll-smooth">
      {/* BACKGROUND GUARD (Visible throughout) */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <NeuralBackground 
          className="absolute inset-0" 
          color="#0ea5e9" 
          trailOpacity={0.12} 
          particleCount={200} 
          speed={0.4} 
        />
      </motion.div>

      {/* ─── SECTION 1: HERO (STRICT COPY + MIN-H-SCREEN) ─── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-start px-6 text-center pt-44 pb-20 overflow-hidden z-20">
        <div className="v11-hero-burst absolute inset-x-0 top-[40%] -translate-y-1/2 aspect-square bg-blue-500/25 blur-[140px] rounded-full pointer-events-none z-10 mx-auto w-[400px]" />

        <div className="w-full max-w-[375px] relative flex flex-col items-center z-20">
          <div className="w-full flex flex-col items-center mb-28">
            <RevealText 
               text="Become like" 
               fontSize="text-[52px] xs:text-[58px]"
               textColor="text-[#f4ebd0]"
               overlayColor="text-blue-500"
               letterDelay={0.06}
               className="font-black drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            />
            <RevealText 
               text="the Saint." 
               fontSize="text-[52px] xs:text-[58px]"
               textColor="text-[#f4ebd0]"
               overlayColor="text-blue-500"
               letterDelay={0.06}
               overlayDelay={0.06}
               className="font-black drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            />
          </div>
          
          <div className="space-y-20 w-full flex flex-col items-center px-4">
            <div className="space-y-10 v11-stagger">
              <p className="text-white font-bold text-[17px] leading-tight uppercase italic tracking-tight drop-shadow-md">
                Not for what he had… <br/>
                but for what he was willing to do to win.
              </p>
              
              <p className="text-zinc-400 text-[14px] font-normal max-w-[300px] leading-relaxed mx-auto italic opacity-90">
                A simple system to stay sharp, <br/>
                disciplined, and in control.
              </p>
            </div>

            <div className="v11-stagger flex flex-col items-center gap-2">
              <div className="w-12 h-[1px] bg-blue-500/20 mb-2" />
              <p className="text-[11px] uppercase tracking-[0.6em] text-white/40 font-bold">
                Takes 20–30 minutes a day.
              </p>
            </div>

            <div className="v11-stagger pt-20">
              <button 
                onClick={scrollToSignup}
                className="group flex flex-col items-center gap-6 text-white hover:text-blue-400 transition-colors"
              >
                <span className="text-[12px] uppercase tracking-[0.8em] font-black opacity-60 group-hover:opacity-100 transition-all">Start ↓</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-6 h-6 opacity-30" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FRANKLIN (STRICT COPY + NATURAL HEIGHT) ─── */}
      <section className="relative flex flex-col items-center justify-center px-8 text-center py-20 overflow-hidden z-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/franklin-saint-section-2.jpg" 
            alt="Franklin" 
            fill
            className="object-cover opacity-[0.9] grayscale contrast-[1.1] brightness-[0.6]" 
            style={{ objectPosition: "center 10%" }} 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="max-w-[320px] mx-auto space-y-10 relative z-10 pt-[15vh]"
        >
          <div className="space-y-4">
            <h2 className="text-[24px] font-black tracking-tighter leading-[1.1] uppercase text-white drop-shadow-lg">
              Why characters like Franklin Saint attract millions
            </h2>
            <div className="w-8 h-[1px] bg-blue-500/40 mx-auto" />
          </div>
          
          <div className="space-y-6 pb-20">
            <div className="space-y-2">
              <p className="text-[#f4ebd0] font-bold text-[16px] leading-tight uppercase tracking-tight italic drop-shadow-md">
                They don’t hesitate.
              </p>
              <p className="text-[#f4ebd0] font-bold text-[16px] leading-tight uppercase tracking-tight italic drop-shadow-md">
                They don’t fold under pressure.
              </p>
              <p className="text-[#f4ebd0] font-bold text-[16px] leading-tight uppercase tracking-tight italic drop-shadow-md">
                They do what it takes.
              </p>
            </div>
            <p className="text-zinc-300 text-[14px] font-bold leading-relaxed max-w-[270px] mx-auto opacity-95 drop-shadow-sm uppercase tracking-tighter italic">
              That’s what people respect.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 3: MINDSET (STRICT COPY + SEAMLESS) ─── */}
      <section className="flex flex-col items-center justify-center px-8 text-center py-16 z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[300px] mx-auto space-y-10 text-right border-r border-white/5 pr-6 translate-x-3"
        >
          <h2 className="text-[26px] font-black tracking-tighter leading-tight uppercase text-white">
            That mindset isn’t built by watching
          </h2>
          
          <div className="space-y-6">
            <p className="text-blue-500 font-bold text-[16px] uppercase italic tracking-tight leading-tight">
              It’s built through repetition. <br/>
              Through structure. <br/>
              Through daily discipline.
            </p>
            <p className="text-zinc-400 text-[13px] font-bold leading-relaxed max-w-[250px] ml-auto uppercase opacity-80">
              And it starts with your body.
            </p>
          </div>

          <button 
            onClick={scrollToSignup}
            className="text-[11px] font-black tracking-[0.6em] uppercase text-white/40 hover:text-white transition-all pt-4"
          >
            Choose to act →
          </button>
        </motion.div>
      </section>

      {/* ─── SECTION 4: THE SYSTEM (STRICT COPY + NATURAL) ─── */}
      <section className="flex flex-col items-center justify-center px-10 py-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[320px] space-y-12"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-[26px] font-black tracking-tighter uppercase text-white leading-tight">
              This is where <br/> the system comes in
            </h2>
            <div className="flex justify-center gap-1 opacity-20">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
          </div>
          
          <div className="space-y-10">
            <ul className="space-y-8 max-w-[260px] mx-auto">
              {[
                "20–30 min home routine",
                "No gym required",
                "Built for busy schedules",
                "Keeps you sharp and consistent"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5 group lg:justify-center">
                  <span className="text-blue-500 text-[12px] font-black opacity-40 group-hover:opacity-100 transition-all w-6">0{i+1}</span>
                  <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-center pt-8">
               <button 
                  onClick={scrollToSignup}
                  className="text-[11px] font-black tracking-[0.6em] uppercase text-white/40 hover:text-white transition-all"
               >
                 Start Build →
               </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 5: REACHED MILLIONS (STRICT COPY) ─── */}
      <section className="flex flex-col items-center justify-center px-8 text-center py-20 z-10 relative">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="max-w-[320px] mx-auto space-y-20"
        >
          <div className="space-y-5">
             <h3 className="text-[24px] font-black tracking-tighter leading-tight uppercase text-white">
               This mindset has already reached millions
             </h3>
          </div>
          
          <div className="flex flex-col gap-20">
            {[
              { val: "50M+", sub: "views in under a year" },
              { val: "40K+", sub: "across platforms" }
            ].map((metric, i) => (
              <div key={i} className="relative flex flex-col items-center justify-center w-full group">
                <TextShimmer 
                  baseColor="#ffffff" 
                  shimmerColor="#3b82f6" 
                  duration={3} 
                  className="text-[72px] font-black tracking-tighter uppercase leading-none"
                >
                  {metric.val}
                </TextShimmer>
                <div className="text-zinc-500 text-[12px] uppercase tracking-[0.4em] font-bold pt-4 opacity-50">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#f4ebd0] text-[15px] font-bold italic max-w-[240px] mx-auto leading-tight pt-10 uppercase tracking-tighter">
             Most watch. <br/>
             Few apply it.
          </p>
        </motion.div>
      </section>

      {/* ─── SECTION 6: CHAOS TO CONTROL (STRICT COPY) ─── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-[300px] mx-auto space-y-12 text-left border-l border-white/5 pl-8 -translate-x-3"
        >
          <div className="space-y-6">
            <h2 className="text-[28px] font-black tracking-tighter uppercase text-white leading-tight">
              From chaos <br/> to control
            </h2>
            <p className="text-blue-500 font-bold text-[15px] leading-tight uppercase tracking-tighter italic">
              Built while balancing: <br/>
              work, studies, and content.
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-6 border-b border-white/5 pb-10">
              <p className="text-zinc-400 text-[14px] font-bold leading-snug max-w-[250px] uppercase italic opacity-80">
                After cutting training from hours <br/> to 30 minutes…
              </p>
              <p className="text-white font-black text-[18px] uppercase tracking-tighter leading-tight drop-shadow-sm">
                everything became easier to manage.
              </p>
            </div>

            <button 
              onClick={scrollToSignup}
              className="text-[11px] font-black tracking-[0.6em] uppercase text-white/40 hover:text-white transition-all"
            >
              [ Initialize Your System → ]
            </button>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 7: START (STRICT COPY + NATURAL) ─── */}
      <section id="signup-section" className="flex flex-col items-center justify-center px-8 text-center pt-24 pb-12 z-10 relative scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-[340px] mx-auto space-y-12 w-full"
        >
          <div className="space-y-6">
            <h2 className="text-[58px] font-black tracking-tighter text-[#f4ebd0] uppercase leading-none">Start <br/> for $0</h2>
            <p className="text-blue-500 font-black text-[16px] italic tracking-tighter uppercase animate-pulse pt-2">
              Save time. Stay sharp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 py-10 border-y border-white/5">
             {["No gym.", "No complexity.", "No excuses."].map((text, i) => (
                <div key={i} className="text-[11px] uppercase tracking-[0.8em] text-white/20 font-black">
                  {text}
                </div>
             ))}
          </div>

          <div className="pt-6 flex flex-col items-center gap-10 w-full">
            <div className="w-full">
               <SignupForm buttonText="Access the system ↓" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-800 font-bold">
              Join 2,000+ others building discipline daily.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER (COMPACT + BLACK BACKGROUND) */}
      <footer className="w-full py-8 px-10 bg-black z-20 relative border-t border-white/5">
        <div className="max-w-[375px] mx-auto space-y-8">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-4">
              <h4 className="text-zinc-700 font-black text-[11px] uppercase tracking-[0.2em]">Navigate</h4>
              <ul className="space-y-3">
                {["Home", "Equipment", "Mission"].map((item) => (
                  <li key={item}>
                    <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-[12px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-tight">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-zinc-700 font-black text-[11px] uppercase tracking-[0.2em]">Social</h4>
              <ul className="space-y-3">
                {["Instagram", "TikTok"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[12px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-tight flex items-center gap-1">
                      {item} <ArrowUpRight className="w-2.5 h-2.5 opacity-30" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-zinc-700 font-black text-[11px] uppercase tracking-[0.2em]">Legal</h4>
              <ul className="space-y-3">
                {["Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[12px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-tight">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-zinc-700 font-black text-[11px] uppercase tracking-[0.2em]">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={scrollToSignup} className="text-[12px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-tight">
                    Free Program
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-8">
            <div className="flex items-center">
              <span className="text-white/40 font-black text-[16px] tracking-tight">max</span>
              <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="font-black text-[16px]">.dt88</TextShimmer>
            </div>
            
            <div className="text-center">
              <p className="text-[9px] text-zinc-800 uppercase tracking-[0.3em] font-bold">
                © 2026. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
