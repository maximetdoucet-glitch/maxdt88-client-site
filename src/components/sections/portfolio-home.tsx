"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
// import NeuralBackground from "@/components/ui/flow-field-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { LeadForm } from "@/components/ui/lead-form";
import { Volume2, VolumeX, Play, Pause, Maximize2 } from "lucide-react";
import { IconBrandInstagram } from "@tabler/icons-react";
import { track } from "@vercel/analytics";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

interface PortfolioHomeProps {
  showContent: boolean;
}

interface PortfolioVideoProps {
  src: string;
  stats: string;
  label?: string;
  aspectRatio?: string;
  maxWidth?: string;
}

function PortfolioVideo({ src, stats, label, aspectRatio = "9/16", maxWidth = "400px" }: PortfolioVideoProps) {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          // Lower threshold to 0.3 for faster response
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.3;
          
          if (inView) {
            // Auto-play when in view, but ONLY if not manually paused
            if (!isManuallyPaused) {
              videoRef.current.play().catch(() => {
                setIsPlaying(false);
              });
              setIsPlaying(true);
            }
          } else {
            // Auto-pause when scrolling away
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before it fully exits/enters
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isManuallyPaused]); // Re-subscribe when manual pause state changes

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true); // User manually paused
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setIsManuallyPaused(false); // User manually played
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const enterFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    } | null;
    if (!v) return;
    // Unmute on fullscreen — full-screen viewing should have sound by default
    v.muted = false;
    setIsMuted(false);
    if (typeof v.webkitEnterFullscreen === "function") {
      v.webkitEnterFullscreen(); // iOS Safari
    } else if (v.requestFullscreen) {
      v.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="flex flex-col items-center w-full" ref={containerRef} style={{ maxWidth }}>
      <div className="relative w-full mx-auto" style={{ maxWidth }}>
        {/* Soft ambient glow — premium, not flashy */}
        <div
          className="absolute -inset-x-6 -inset-y-6 sm:-inset-x-10 sm:-inset-y-10 bg-[#2196f3]/20 blur-3xl opacity-40 pointer-events-none -z-10"
          aria-hidden
        />

        <div
          className="relative w-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black/40 group border border-white/10 cursor-pointer ring-1 ring-white/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-white/20"
          style={{ aspectRatio }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={src}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* Top fade for label legibility */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />
          {/* Bottom fade for stats legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

          {/* Top label chip */}
          {label && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20 flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2196f3]" />
              <span className="text-[8px] sm:text-[10px] md:text-[11px] font-medium tracking-widest uppercase text-white/90">
                {label}
              </span>
            </div>
          )}

          {/* Stats overlay (bottom) */}
          <div className="absolute bottom-2 left-2 right-20 sm:bottom-3 sm:left-3 sm:right-24 md:bottom-4 md:left-4 md:right-32 z-20">
            <p className="text-[10px] sm:text-xs md:text-sm font-medium text-white/95 leading-snug drop-shadow-md">
              {stats}
            </p>
          </div>

          {/* Play/Pause Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 transform transition-all duration-300 group-hover:scale-110">
              {isPlaying ? (
                <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
              ) : (
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white translate-x-0.5" />
              )}
            </div>
          </div>

          {/* Bottom-right controls */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 flex items-center gap-1.5 sm:gap-2 z-20">
            <button
              type="button"
              onClick={enterFullscreen}
              className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 transition-all hover:scale-110 hover:bg-black/70 active:scale-95"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 transition-all hover:scale-110 hover:bg-black/70 active:scale-95"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioHome({ showContent }: PortfolioHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [showBackground, setShowBackground] = React.useState(false);

  useEffect(() => {
    if (showContent) {
      // Delay background initialization to prioritize rendering text and layout
      const timer = setTimeout(() => setShowBackground(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showContent]);
  
  // No parallax: Endless background revealed by naturally scrolling the page

  useEffect(() => {
    if (!showContent) return;
    
    const sections = containerRef.current?.querySelectorAll("section");
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [showContent]);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-[#2196f3]/30">
      {/* 1. CONTINUOUS BACKGROUND (Revealed naturally as you scroll) */}
      <div 
        className="absolute inset-x-0 top-0 h-full z-0 overflow-hidden pointer-events-none"
      >
        <AnimatePresence>
          {showBackground && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full"
            >
              <NeuralBackground 
                color="#2196f3" 
                particleCount={150} // Reduced for significantly better performance
                speed={1.2} 
                trailOpacity={0.025} 
                scrollProgress={scrollYProgress}
                resolution={0.7} // Lower internal Resolution for performance
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full">
        {/* 2. HERO SECTION */}
        <section id="hero" className="relative min-h-[82vh] md:h-[90vh] w-full flex items-center justify-center bg-transparent pt-24 pb-8 md:pt-0 md:pb-0">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-[11px] sm:text-xs uppercase tracking-widest text-white/70 mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3] animate-pulse" />
                Free first edit · no commitment
              </div>

              <h1 className="text-[44px] sm:text-6xl md:text-[100px] font-tight font-semibold tracking-[-0.025em] leading-[1.02] md:leading-[0.92] text-white mb-5 md:mb-7 shadow-blue-glow">
                Edits people <span className="italic font-medium text-white/95">actually</span> finish.
              </h1>

              <div className="max-w-xl mx-auto text-base sm:text-lg md:text-xl font-sans font-normal text-white/75 leading-[1.5] mb-8 space-y-4 px-2">
                <p>
                  Short-form video, cut for retention — for creators, athletes, and brands.
                  <span className="text-white"> Send one clip. The first edit is on me.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4 sm:px-0">
                <Link
                  href="https://ig.me/m/max.dt88"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("cta_click", { source: "hero_dm" })}
                  className="w-full sm:w-auto"
                >
                  <ShimmerButton
                    background="#2196f3"
                    className="w-full sm:w-auto px-8 py-4 rounded-full text-white text-base font-sans font-semibold tracking-tight transition-transform hover:scale-105 glow-button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <IconBrandInstagram className="w-4 h-4" />
                      DM for your free edit
                    </span>
                  </ShimmerButton>
                </Link>
                <Link
                  href="#contact"
                  onClick={() => track("cta_click", { source: "hero_form" })}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-white/85 text-base font-sans font-medium tracking-tight border border-white/15 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Claim my free edit
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Subtle section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-3xl mx-auto" />

        {/* 3. PROOF SECTION (MINIMAL) */}
        <section id="proof" className="pt-10 pb-10 sm:pt-12 sm:pb-12 px-5 sm:px-6 bg-transparent">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-[11px] sm:text-sm font-tight font-semibold text-white/60 tracking-widest uppercase">
              Loved by
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-x-16">
              {["ESPN UK", "Canal+", "Bash The Entertainer", "Monet McMichael"].map((name) => (
                <span key={name} className="text-base sm:text-xl md:text-2xl font-tight font-semibold text-white/80 hover:text-white transition-all duration-200 ease-out uppercase tracking-tight hover:scale-[1.02]">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. VIDEO SECTION (MOST IMPORTANT) */}
        <section id="work" className="pt-10 pb-16 sm:pb-24 md:pb-32 px-5 sm:px-6 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-14 md:mb-16">
              <p className="text-[11px] sm:text-xs font-sans font-medium tracking-widest uppercase text-[#2196f3] mb-3">
                Selected work
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-tight font-semibold tracking-tight text-white leading-[1.1]">
                Imagine your content, <br className="sm:hidden" />
                <span className="text-white/60">cut like this.</span>
              </h2>
            </div>

            {/* 1. Hero TikTok (vertical) + Cinematic Lionsgate — stacked on mobile, side-by-side on desktop with matching heights */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12">
              <div className="w-full md:w-[253px] flex justify-center">
                <PortfolioVideo
                  src="/videos/saint-9-tt-fr.mp4"
                  label="TikTok"
                  stats="200K reposts"
                  aspectRatio="9/16"
                  maxWidth="380px"
                />
              </div>

              <div className="mt-10 sm:mt-16 md:mt-0 w-full md:w-[800px] flex justify-center">
                <PortfolioVideo
                  src="/videos/saint-52-tt.mp4"
                  label="Cinematic"
                  stats="Lionsgate edit style"
                  aspectRatio="16/9"
                  maxWidth="900px"
                />
              </div>
            </div>

            {/* 2. Football N-E-C + Cinematic Canal+ — side by side, even on mobile */}
            <div className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-2 gap-3 sm:gap-5 md:gap-12 items-center max-w-5xl mx-auto">
              <PortfolioVideo
                src="/videos/n-e-c-1-fv-tt.mp4"
                label="Football"
                stats="Ligue 1 style adapted to N-E-C"
                aspectRatio="16/9"
                maxWidth="560px"
              />
              <PortfolioVideo
                src="/videos/saint-30-v2-tt.mp4"
                label="Cinematic"
                stats="Saved by Canal+"
                aspectRatio="16/9"
                maxWidth="560px"
              />
            </div>

            {/* Inline CTA after work — low-friction Instagram DM */}
            <div className="mt-14 sm:mt-16 md:mt-20 flex flex-col items-center text-center">
              <Link
                href="https://ig.me/m/max.dt88"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cta_click", { source: "midpage_dm" })}
                className="inline-flex"
              >
                <ShimmerButton
                  background="#2196f3"
                  className="px-8 py-4 rounded-full text-white text-base font-sans font-semibold tracking-tight transition-transform hover:scale-105 glow-button"
                >
                  <span className="flex items-center gap-2">
                    <IconBrandInstagram className="w-4 h-4" />
                    DM me on Instagram
                  </span>
                </ShimmerButton>
              </Link>
              <p className="text-xs text-white/45 mt-4">One tap · first edit free</p>
            </div>
          </div>
        </section>

        {/* 5. WHAT I OFFER (CLEAN MINIMAL LIST) */}
        <section id="services" className="py-14 sm:py-24 md:py-32 px-5 sm:px-6 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 sm:mb-14 md:mb-16">
              <p className="text-[11px] sm:text-xs font-sans font-medium tracking-widest uppercase text-[#2196f3] mb-3">What I do</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-tight font-semibold tracking-tight text-white max-w-2xl leading-[1.05]">
                Same craft.<br className="sm:hidden" /> Three kinds of people.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Creators Box */}
              <div className="p-6 sm:p-7 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col h-full text-left transition-all hover:bg-white/[0.05] hover:border-white/20">
                <h3 className="text-xl md:text-2xl font-tight font-semibold text-white mb-4 md:mb-6">
                  <TextShimmer baseColor="#ffffff" shimmerColor="#2196f3" duration={3}>
                    Creators
                  </TextShimmer>
                </h3>
                <div className="text-base md:text-lg font-sans font-normal text-white/85 leading-relaxed space-y-3 md:space-y-4">
                  <p>Long-form that doesn&apos;t lose them at minute three.</p>
                  <p>Daily clipping built to be reposted, not scrolled past.</p>
                </div>
              </div>

              {/* Athletes Box */}
              <div className="p-6 sm:p-7 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col h-full text-left transition-all hover:bg-white/[0.05] hover:border-white/20">
                <h3 className="text-xl md:text-2xl font-tight font-semibold text-white mb-4 md:mb-6">
                  <TextShimmer baseColor="#ffffff" shimmerColor="#2196f3" duration={3}>
                    Athletes
                  </TextShimmer>
                </h3>
                <div className="text-base md:text-lg font-sans font-normal text-white/85 leading-relaxed space-y-3 md:space-y-4">
                  <p>Highlights and mixtapes scouts actually finish.</p>
                  <p>Lifestyle cuts that turn followers into brand deals.</p>
                </div>
              </div>

              {/* Brands Box */}
              <div className="p-6 sm:p-7 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col h-full text-left transition-all hover:bg-white/[0.05] hover:border-white/20">
                <h3 className="text-xl md:text-2xl font-tight font-semibold text-white mb-4 md:mb-6">
                  <TextShimmer baseColor="#ffffff" shimmerColor="#2196f3" duration={3}>
                    Brands
                  </TextShimmer>
                </h3>
                <div className="text-base md:text-lg font-sans font-normal text-white/85 leading-relaxed space-y-3 md:space-y-4">
                  <p>Content that doesn&apos;t feel like an ad — and outperforms one.</p>
                  <p>Native to the platform. Not adapted from a TV spot.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 7. FREE OFFER + LEAD FORM (THE CONVERSION POINT) */}
        <section id="contact" className="pt-14 pb-20 sm:pt-24 sm:pb-28 md:pt-32 md:pb-40 px-5 sm:px-6 bg-transparent">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-4">
              <p className="text-[11px] sm:text-xs font-sans font-medium tracking-widest uppercase text-[#2196f3]">
                Try for free
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-tight font-semibold text-white tracking-tight leading-[1.05]">
                Send one clip.<br className="hidden sm:block" />
                <span className="text-white/70"> See what changes.</span>
              </h2>
              <p className="text-base sm:text-lg font-sans text-white/70 max-w-xl mx-auto leading-relaxed pt-2">
                Tell me what you&apos;re building. I&apos;ll cut your first edit free — no contract, no catch.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 md:p-9 backdrop-blur-sm shadow-[0_0_60px_rgba(33,150,243,0.08)]">
              <LeadForm />
            </div>

            {/* Low-friction alternative */}
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <span className="text-white/40">Prefer one tap?</span>
              <Link
                href="https://ig.me/m/max.dt88"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cta_click", { source: "contact_dm_secondary" })}
                className="inline-flex items-center gap-1.5 text-white/85 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-all"
              >
                <IconBrandInstagram className="w-3.5 h-3.5" />
                DM me on Instagram
              </Link>
            </div>

            {/* Steps */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
              {[
                { n: "01", t: "You send", d: "One rough clip + your goal." },
                { n: "02", t: "I edit free", d: "Delivered in 48–72 hours." },
                { n: "03", t: "We scale", d: "If it works, we keep going." },
              ].map((s) => (
                <div key={s.n} className="text-left p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.015]">
                  <div className="text-[10px] sm:text-xs font-mono text-[#2196f3] mb-2 tracking-widest">{s.n}</div>
                  <div className="text-base sm:text-lg font-semibold text-white mb-1">{s.t}</div>
                  <div className="text-sm text-white/60 leading-snug">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. REDESIGNED FOOTER */}

        <footer className="py-10 sm:py-12 px-5 sm:px-6 bg-[#000000] border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
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
      </div>
    </div>
  );
}
