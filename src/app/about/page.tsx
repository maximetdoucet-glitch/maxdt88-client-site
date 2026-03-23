"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { Navbar } from "@/components/navbar";
import NeuralBackground from "@/components/ui/flow-field-background";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="relative bg-black min-h-screen text-white overflow-x-hidden selection:bg-[#2196f3]/30">
      <Navbar />
      
      {/* 1. CONTINUOUS BACKGROUND */}
      <div className="absolute inset-x-0 top-0 h-full z-0 overflow-hidden pointer-events-none">
        <NeuralBackground 
          color="#2196f3" 
          particleCount={150}
          speed={1.2} 
          trailOpacity={0.025} 
          scrollProgress={scrollYProgress}
        />
      </div>

      <div className="relative z-10 w-full pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-6 space-y-20 md:space-y-24">
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-tight font-semibold text-white mb-16 px-0 leading-[1.1] md:leading-[1.05]">
            About Me
          </h1>

          {/* Section 1 — Who I Am */}
          <section id="identity" className="text-left space-y-5 pt-10 border-t border-white/5 first:border-t-0 first:pt-0">
            <h2 className="text-xl md:text-2xl font-tight font-semibold text-white">
              Who I Am
            </h2>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                I’m Max, a Franco-American video editor based in the Netherlands.
              </p>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                I started building on social media in April 2025 and quickly generated videos reaching millions of views organically.
              </p>
            </div>
          </section>

          {/* Section 2 — Where My Work Shows Up */}
          <section id="proof" className="text-left space-y-5 pt-10 border-t border-white/5">
            <h2 className="text-xl md:text-2xl font-tight font-semibold text-white">
              Where My Work Shows Up
            </h2>
            <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
              My work has been seen by brands the likes of ESPN UK and Canal+, as well as by popular creators and influencers across multiple niches.
            </p>
          </section>

          {/* Section 3 — How I See Content */}
          <section id="angle" className="text-left space-y-5 pt-10 border-t border-white/5">
            <h2 className="text-xl md:text-2xl font-tight font-semibold text-white">
              How I See Content
            </h2>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                Most brands approach social media like advertising.<br />
                I approach it like content.
              </p>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                The goal isn’t to push products.<br />
                It’s to create videos people actually want to watch.
              </p>
            </div>
          </section>

          {/* Section 4 — How I Build Videos */}
          <section id="how-i-think" className="text-left space-y-5 pt-10 border-t border-white/5">
            <h2 className="text-xl md:text-2xl font-tight font-semibold text-white">
              How I Build Videos
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                Every project starts with understanding the vision.
              </p>
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  How you want to be perceived.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  What you want to highlight.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  What matters to your audience.
                </p>
              </div>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                From there, I build each video around a clear storyline — not just visuals.
              </p>
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  A strong hook to stop the scroll.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  A structured flow that keeps attention.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  A climax that creates impact.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  And an ending that leaves either closure or curiosity.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  It doesn’t need to be complex.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  But it needs to make sense.
                </p>
              </div>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                Because when a video makes sense, people stay.
              </p>
            </div>
          </section>

          {/* Section 5 — What Actually Drives Results */}
          <section id="connection" className="text-left space-y-5 pt-10 border-t border-white/5">
            <h2 className="text-xl md:text-2xl font-tight font-semibold text-white">
              What Actually Drives Results
            </h2>
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  The goal isn’t just attention.
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  It’s connection.
                </p>
              </div>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                The strongest content makes people see themselves in it.
              </p>
              <div className="space-y-3">
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  Whether it’s the emotion, the mindset, the humor, or the identity —
                </p>
                <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                  if people relate to what they’re watching, they engage with it.
                </p>
              </div>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                That’s what drives likes, saves, reposts, and comments.
              </p>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                Not just views — but real traction.
              </p>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                And over time, that’s what builds an audience that comes back.
              </p>
            </div>
          </section>

          {/* Section 6 — What I Focus On */}
          <section id="standard" className="text-left space-y-5 pb-20 pt-10 border-t border-white/5">
            <h2 className="text-xl md:text-2xl font-tight font-semibold text-white">
              What I Focus On
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                I don’t chase views alone.
              </p>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                I focus on strong engagement —<br />
                a healthy ratio of likes, saves, reposts, and comments.
              </p>
              <p className="text-lg md:text-xl font-sans font-normal text-white/85 leading-relaxed">
                Because that’s what builds consistency, not just one viral moment.
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className="py-12 px-6 bg-[#000000] border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-12">
          {/* LEFT SIDE - BRAND */}
          <div className="space-y-6 text-left w-full md:w-auto">
            <div className="text-2xl font-tight font-semibold text-white tracking-tight">
              max<TextShimmer baseColor="#2196f3" shimmerColor="#ffffff" className="text-2xl font-tight font-semibold" duration={3}>.dt88</TextShimmer>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-sans font-normal text-white/75">
                Video editing built for engagement.
              </p>
              <p className="text-xs font-sans font-normal text-white/65">
                Available for select projects
              </p>
            </div>
          </div>
          
          {/* RIGHT SIDE - INFO STACK */}
          <div className="flex flex-col space-y-4 text-left md:text-right md:items-end w-full md:w-auto">
            <div className="space-y-3">
              <h4 className="text-[10px] font-tight font-semibold text-white/50 uppercase tracking-widest">Contact</h4>
              <a 
                href="mailto:max.doucet@icloud.com" 
                className="text-sm font-sans font-normal text-white hover:brightness-125 transition-all duration-300 block"
              >
                max.doucet@icloud.com
              </a>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-tight font-semibold text-white/50 uppercase tracking-widest">Socials</h4>
              <nav className="flex flex-col gap-2 items-start md:items-end">
                <a href="https://www.tiktok.com/@max.dt88?_r=1&_t=ZN-94sSG2dY6SM" target="_blank" rel="noopener noreferrer" className="text-sm font-sans font-normal text-white hover:brightness-125 transition-all duration-300">TikTok</a>
                <a href="https://www.instagram.com/max.dt88?igsh=YW9lenBseGM0Z3Zu&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-sm font-sans font-normal text-white hover:brightness-125 transition-all duration-300">Instagram</a>
                <a href="https://www.youtube.com/@Max.DT88/shorts" target="_blank" rel="noopener noreferrer" className="text-sm font-sans font-normal text-white hover:brightness-125 transition-all duration-300">YouTube</a>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-10 text-left">
          <p className="text-[10px] font-sans font-normal text-white/40 tracking-widest uppercase">
            © 2026 MAXDT88. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}
