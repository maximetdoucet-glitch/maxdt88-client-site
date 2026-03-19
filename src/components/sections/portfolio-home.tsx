"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);

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
      {/* FIXED CONTINUOUS BACKGROUND WITH PARALLAX */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <NeuralBackground 
          color="#0369a1" 
          particleCount={600}
          speed={0.8}
          trailOpacity={0.03}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/50" />
      </motion.div>

      <div className="relative z-10 w-full">
        {/* 1. HERO SECTION */}
        <section id="hero" className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-transparent">
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-[#f4ebd0] mb-8 uppercase">
                Your content <br className="hidden md:block" />
                isn’t the <span className="text-[#0369a1]">problem.</span> <br />
                It’s how <span className="text-white/40">it’s edited.</span>
              </h1>
              
              <p className="max-w-xl mx-auto text-base md:text-lg text-white/60 font-medium leading-relaxed mb-12">
                I create high-retention edits that make people watch, engage, and stay.
              </p>

              <div className="flex justify-center">
                <Link href="#contact">
                  <ShimmerButton 
                    background="#0369a1"
                    className="px-8 py-4 rounded-full text-[#f4ebd0] text-lg font-bold shadow-[0_0_30px_rgba(3,105,161,0.15)] hover:scale-105 transition-transform"
                  >
                    Book a call
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. PROOF SECTION */}
        <section id="proof" className="py-12 px-6 relative z-10 overflow-hidden bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="h-px w-20 bg-white/10" />
              <p className="text-xs md:text-sm text-[#f4ebd0] font-black tracking-[0.4em] text-center opacity-40 uppercase">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-30 mt-4">
                {["ESPN UK", "Canal+", "Bash The Entertainer", "Verified Creators"].map((name) => (
                  <span key={name} className="text-lg md:text-xl font-black uppercase tracking-widest">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. VIDEO SHOWCASE SECTION */}
        <section id="work" className="relative py-24 px-6 bg-transparent z-10">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              className="text-sm md:text-base font-black tracking-[0.3em] uppercase text-[#f4ebd0]"
            >
              One great edit is all it takes.
            </motion.p>
            
            <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              {/* Using a placeholder video/styled container since I don't have a specific video URL, 
                  but setting up the structure for a premium autoplay video. */}
              <video 
                src="https://cdn.pixabay.com/video/2021/04/12/70874-537443198_large.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
            </div>
          </div>
        </section>

        {/* 4. WHAT I DO */}
        <section id="services" className="py-40 px-6 relative z-10 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[10px] font-black text-white/40 mb-8 tracking-[0.6em] uppercase">Results</h2>
            <p className="text-2xl md:text-4xl lg:text-5xl font-black text-[#f4ebd0] tracking-tighter leading-[1.1] uppercase">
              I deliver <span className="text-[#0369a1]">high-retention</span> edits engineered to hold attention and convert viewers into <span className="text-white/40">loyal fans.</span>
            </p>
          </div>
        </section>

        {/* 5. TARGET AUDIENCE */}
        <section id="target" className="py-40 px-6 relative z-10 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#f4ebd0] mb-24 text-center leading-none uppercase">
              Built for those who <br className="md:hidden" /><span className="text-[#0369a1]">value impact.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Athletes", desc: "Dynamic storytelling that captures performance intensity and builds a direct audience connection." },
                { title: "Creators", desc: "Elevating your distinct aesthetic with rhythmic editing that amplifies your unique voice." },
                { title: "Brands", desc: "Strategic content designed to dominate attention and drive measurable growth." }
              ].map((tier, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-[#0369a1]/20 transition-all duration-700 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0369a1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg font-black text-[#f4ebd0] mb-4 uppercase tracking-tight">{tier.title}</h3>
                  <p className="text-white/40 font-medium leading-relaxed text-sm">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section id="contact" className="py-48 px-6 text-center relative z-10 bg-transparent">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] text-[#f4ebd0] uppercase">
              Ready to <br />
              <span className="text-[#0369a1]">scale?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/40 font-medium max-w-xl mx-auto">
              Accepting a limited number of projects for Q2 2026.
            </p>
            <div className="pt-8">
              <Link href="mailto:contact@maxdt88.com">
                <ShimmerButton 
                  background="#0369a1"
                  className="px-10 py-5 rounded-full text-[#f4ebd0] text-xl font-black shadow-[0_0_40px_rgba(3,105,161,0.2)]"
                >
                  Book a call
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-6 border-t border-white/5 relative z-10 bg-transparent">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6">
              <div className="text-2xl font-black text-[#f4ebd0] tracking-tighter uppercase">
                max<span className="text-[#0369a1]">.dt88</span>
              </div>
              <p className="text-white/30 text-sm max-w-xs font-medium leading-relaxed">
                High-end video editing for the next generation of digital-first brands and athletes.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">Connect</p>
              <a href="mailto:contact@maxdt88.com" className="text-lg font-bold text-[#f4ebd0] hover:text-[#0369a1] transition-colors">
                contact@maxdt88.com
              </a>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5">
            <p className="text-white/10 text-[10px] font-bold tracking-[0.4em] uppercase">
              © 2026 MAXDT88. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
