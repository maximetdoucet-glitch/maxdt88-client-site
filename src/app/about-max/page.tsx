"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import VaporizeTextCycle from "@/components/ui/vapour-text-effect";
import RadialShaderEffect from "@/components/ui/raidal-2";
import ShaderBackground from "@/components/ui/shader-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MetalButton, LiquidButton } from "@/components/ui/liquid-glass-button";
import { SplitChars, SplitWords } from "@/components/ui/text-effects";
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

export default function Architecture() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-[#0369a1] selection:text-[#f4ebd0] pt-32 overflow-hidden">
      <Navbar />

      {/* HERO SECTION - ARCHITECTURE */}
      <section className="relative py-40 border-b border-white/5 flex flex-col items-center justify-center min-h-[50vh] overflow-hidden">
        <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.1} particleCount={300} speed={0.6} />
        <div className="container relative z-10 px-6 mx-auto text-center">
          <Reveal>
            <h1 className="text-6xl md:text-[12rem] font-black uppercase tracking-tighter leading-none mb-12 text-[#f4ebd0]">
              The <span className="text-[#0369a1]">WHY</span>
            </h1>
            <p className="text-xl md:text-3xl text-[#f4ebd0]/50 max-w-4xl mx-auto font-black uppercase tracking-widest leading-normal">
              Not a personality. Not a guru. We are an architecture for those who seek the 1% trajectory.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COLLECTIVE FOCUS - RADIAL SHADER */}
      <section className="relative py-40 bg-[#0a0a0a] text-[#f4ebd0] overflow-hidden border-t border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.05} particleCount={250} speed={0.4} />
        <RadialShaderEffect className="opacity-30 relative z-10" />
        <div className="container relative z-20 px-6 mx-auto">
          <SectionHeading 
            title="The Supporters" 
            subtitle="We don't build fans. We build supporters. People who internalize the protocol and become part of the inevitable architecture."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <Reveal>
               <div className="space-y-12">
                 {[
                   { title: "Economic Excellence", desc: "Every protocol you execute is a distributed investment in yourself. We scale with your results." },
                   { title: "Silence Mastery", desc: "Silence is the lab. results are the product. If you're talking about it, you're observing, not building." },
                   { title: "Protocol Loyalty", desc: "The protocol is the leader. Not a face. The architecture remains long after the people change." }
                 ].map((item, i) => (
                   <div key={i} className="group">
                     <h3 className="text-2xl font-black uppercase tracking-tight text-[#0369a1] mb-4">{item.title}</h3>
                     <p className="text-[#f4ebd0]/50 font-black uppercase tracking-widest text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
               </div>
             </Reveal>
             
             <Reveal delay={0.2}>
               <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                 <div className="absolute inset-0 opacity-40">
                   <ShaderBackground />
                 </div>
                 <h3 className="text-4xl font-black uppercase text-[#0369a1] z-10 tracking-[0.4em]">ARCHITECTURE</h3>
               </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CALL */}
      <section className="py-40 bg-[#0a0a0a] relative overflow-hidden text-center border-t border-white/5">
         <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.2} particleCount={500} speed={1.2} />
         <div className="container px-6 mx-auto relative z-10">
           <Reveal>
             <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#f4ebd0] mb-12">
               Are you part of the <span className="text-[#0369a1]">system?</span>
             </h2>
             <p className="text-xl md:text-3xl font-black uppercase tracking-widest text-[#f4ebd0]/30 max-w-3xl mx-auto mb-20 leading-relaxed">
               The blueprint is ready. The lab is open. The architecture waits for your execution.
             </p>
             <LiquidButton onClick={() => window.location.href = "/#signup"}>
               Get Started
             </LiquidButton>
           </Reveal>
         </div>
         <div className="absolute top-10 left-10 text-right opacity-10">
            <VaporizeTextCycle 
                texts={["MAX.DT88"]}
                font={{ fontSize: "14px", fontWeight: 900 }}
                color="#0369a1"
              />
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#0a0a0a] border-t border-white/5 relative z-10 text-right pr-6">
        <p className="text-[10px] text-[#f4ebd0]/20 uppercase font-black tracking-widest">
          © 2026 INTERNAL DISTRIBUTION SYSTEM
        </p>
      </footer>
    </main>
  );
}
