"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioHomeProps {
  showContent: boolean;
}

interface PortfolioVideoProps {
  src: string;
  stats: string;
  aspectRatio?: string;
  maxWidth?: string;
}

function PortfolioVideo({ src, stats, aspectRatio = "9/16", maxWidth = "400px" }: PortfolioVideoProps) {
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

  return (
    <div className="space-y-8 flex flex-col items-center w-full" ref={containerRef}>
      <div 
        className="relative w-full rounded-2xl overflow-hidden bg-transparent shadow-2xl group border border-white/5 cursor-pointer"
        style={{ 
          aspectRatio, 
          maxWidth 
        }}
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          src={src} 
          muted={isMuted}
          loop 
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        
        {/* Play/Pause Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transform transition-all duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white fill-white" />
            ) : (
              <Play className="w-10 h-10 text-white fill-white translate-x-1" />
            )}
          </div>
        </div>

        {/* Sound Toggle Overlay */}
        <button 
          onClick={toggleMute}
          className="absolute bottom-6 right-6 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 z-20"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      <p className="text-sm md:text-base font-medium text-white/60 italic text-center">
        {stats}
      </p>
    </div>
  );
}

export function PortfolioHome({ showContent }: PortfolioHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
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
        <NeuralBackground 
          color="#2196f3" 
          particleCount={150} // Reduced for significantly better performance
          speed={1.2} 
          trailOpacity={0.025} 
          scrollProgress={scrollYProgress}
        />
      </div>

      <div className="relative z-10 w-full">
        {/* 2. HERO SECTION */}
        <section id="hero" className="relative h-[90vh] w-full flex items-center justify-center bg-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] text-white mb-6">
                High-retention <br />
                video editing.
              </h1>
              
              <p className="max-w-xl mx-auto text-lg md:text-xl text-white/70 font-medium leading-relaxed mb-12">
                For creators, athletes, and brands looking to improve engagement.
              </p>

              <div className="flex justify-center">
                <Link href="#contact">
                  <ShimmerButton 
                    background="#2196f3"
                    className="px-8 py-4 rounded-full text-white text-base font-semibold transition-transform hover:scale-105"
                  >
                    Discuss your content
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. PROOF SECTION (MINIMAL) */}
        <section id="proof" className="py-24 px-6 bg-transparent">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-sm font-semibold text-white/90 tracking-[0.2em] uppercase">
              Seen by creators, brands, and verified names
            </h2>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
              {["ESPN UK", "Canal+", "Bash The Entertainer", "Sky Sports", "Red Bull"].map((name) => (
                <span key={name} className="text-xl md:text-2xl font-bold text-white/80 hover:text-white transition-colors uppercase tracking-wider">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. VIDEO SECTION (MOST IMPORTANT) */}
        <section id="work" className="py-32 px-6 space-y-32 bg-transparent">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-white/60">
              One great edit is all it takes.
            </p>
            
            <div className="portfolio-video-container w-full">
              <PortfolioVideo 
                src="/videos/saint-9-tt-fr.mp4" 
                stats="6.2M views • 916K likes • 192K+ reposts" 
                aspectRatio="9/16"
                maxWidth="400px"
              />
            </div>

            <div className="portfolio-video-container w-full">
              <PortfolioVideo 
                src="/videos/saint-30-v2-tt.mp4" 
                stats="560k views • 116k likes • saved by Canal+" 
                aspectRatio="1.7/1"
                maxWidth="800px"
              />
            </div>
          </div>
        </section>

        {/* 5. WHAT I OFFER (CLEAN MINIMAL LIST) */}
        <section id="services" className="py-40 px-6 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-20">
              What I offer
            </h2>
            
            <div className="space-y-24">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#2196f3]">Creators</h3>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                  Clipping and edits designed to increase watch time and engagement.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#2196f3]">Athletes</h3>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                  Edits that showcase performance and build presence online.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#2196f3]">Brands</h3>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                  Content designed for social platforms — not ads that get ignored.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BRAND INSIGHT SECTION */}
        <section className="py-40 px-6 bg-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight leading-snug text-white/80">
              Most brands post ads. <br className="hidden md:block" />
              <span className="text-white">The ones that grow post content.</span>
            </h2>
          </div>
        </section>

        {/* 7. FREE OFFER SECTION */}
        <section className="py-40 px-6 bg-transparent">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg md:text-2xl text-white/60 leading-relaxed">
              I occasionally take on 1–2 projects to test new formats.
            </p>
            <p className="text-lg md:text-2xl text-white font-semibold">
              If it’s a good fit, I’ll edit your first video free.
            </p>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section id="contact" className="py-60 px-6 text-center bg-transparent">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white">
              Ready to improve <br /> your content?
            </h2>
            <div className="pt-8">
              <Link href="mailto:contact@maxdt88.com">
                <ShimmerButton 
                  background="#2196f3"
                  className="px-10 py-5 rounded-full text-white text-xl font-semibold transition-transform hover:scale-105"
                >
                  Discuss your content
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </section>

        {/* 9. MINIMAL FOOTER */}
        <footer className="py-24 px-6 bg-transparent">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-white tracking-tight">
                max.dt88
              </div>
              <p className="text-white/70 text-sm font-medium">
                High-retention video editing
              </p>
            </div>
            
            <div className="space-y-2">
              <a href="mailto:contact@maxdt88.com" className="text-lg font-semibold text-white/80 hover:text-[#2563eb] transition-colors">
                contact@maxdt88.com
              </a>
              <p className="text-[10px] text-white/40 font-semibold tracking-widest uppercase mt-4">
                © 2026 MAXDT88. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
