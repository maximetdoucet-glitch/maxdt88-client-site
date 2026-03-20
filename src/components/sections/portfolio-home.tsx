"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextShimmer } from "@/components/ui/text-shimmer";
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
    <div className="space-y-12 flex flex-col items-center w-full" ref={containerRef}>
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
      <p className="font-sans font-medium text-white/75 text-xs text-center">
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
              <h1 className="text-5xl md:text-8xl font-tight font-semibold tracking-[-0.02em] leading-[0.95] text-white mb-6 shadow-blue-glow">
                High retention video editing.
              </h1>
              
              <div className="max-w-xl mx-auto text-lg md:text-xl font-sans font-normal text-white/80 leading-[1.4] mb-8 space-y-4">
                <p>For creators, athletes, and brands.</p>
              </div>

              <div className="flex justify-center pt-6">
                <Link href="#contact">
                  <ShimmerButton 
                    background="#2196f3"
                    className="px-8 py-4 rounded-full text-white text-base font-sans font-medium tracking-wider transition-transform hover:scale-105 glow-button"
                  >
                    Share your vision
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. PROOF SECTION (MINIMAL) */}
        <section id="proof" className="py-16 px-6 bg-transparent">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h2 className="text-sm font-tight font-semibold text-white tracking-tight uppercase">
              Seen by creators, brands, and verified names
            </h2>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
              {["ESPN UK", "Canal+", "Bash The Entertainer", "Monet McMichael"].map((name) => (
                <span key={name} className="text-xl md:text-2xl font-tight font-semibold text-white/80 hover:text-white transition-colors uppercase tracking-tight">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. VIDEO SECTION (MOST IMPORTANT) */}
        <section id="work" className="py-20 px-6 space-y-16 bg-transparent">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            <p className="text-sm font-sans font-medium tracking-tight uppercase text-white/80 mb-8">
              One edit is all it takes to be seen by millions.
            </p>
            
            <div className="portfolio-video-container w-full space-y-12">
              <PortfolioVideo 
                src="/videos/saint-9-tt-fr.mp4" 
                stats="6.2M views • 900K+ likes • 200K+ reposts" 
                aspectRatio="9/16"
                maxWidth="400px"
              />
            </div>

            <div className="portfolio-video-container w-full pt-8">
              <PortfolioVideo 
                src="/videos/saint-30-v2-tt.mp4" 
                stats="560K views • 116K likes • saved by Canal+" 
                aspectRatio="1.7/1"
                maxWidth="800px"
              />
            </div>
          </div>
        </section>

        {/* 5. WHAT I OFFER (CLEAN MINIMAL LIST) */}
        <section id="services" className="py-32 px-6 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-tight font-semibold tracking-tight text-white mb-12">
              What I offer
            </h2>
            
            <div className="space-y-16">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-tight font-semibold text-white">
                  <TextShimmer baseColor="#ffffff" shimmerColor="#2196f3" duration={3}>
                    Creators
                  </TextShimmer>
                </h3>
                <div className="text-base md:text-lg font-sans font-normal text-white/85 leading-relaxed max-w-2xl space-y-4">
                  <p>Long-form editing (YouTube, vlogs).</p>
                  <p>Clipping and posting across multiple platforms (2–5 posts daily).</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-tight font-semibold text-white">
                  <TextShimmer baseColor="#ffffff" shimmerColor="#2196f3" duration={3}>
                    Athletes
                  </TextShimmer>
                </h3>
                <div className="text-base md:text-lg font-sans font-normal text-white/85 leading-relaxed max-w-2xl space-y-4">
                  <p>Mixtapes, game footage, and training edits.</p>
                  <p>Lifestyle content to increase visibility and attract brand opportunities.</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-tight font-semibold text-white">
                  <TextShimmer baseColor="#ffffff" shimmerColor="#2196f3" duration={3}>
                    Brands
                  </TextShimmer>
                </h3>
                <div className="text-base md:text-lg font-sans font-normal text-white/85 leading-relaxed max-w-2xl space-y-4">
                  <p>Content design for social media with a focus on engagement.</p>
                  <p>Content rollout strategies that perform better than traditional ads.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 7. FREE OFFER + CTA SECTION (COMBINED) */}
        <section id="contact" className="py-24 px-6 text-center bg-transparent">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
              <p className="text-lg md:text-2xl font-sans font-normal text-white/85 leading-relaxed">
                I take on projects where I understand the vision.
              </p>
              <p className="text-lg md:text-2xl font-tight font-semibold text-white">
                If it’s a good fit, I’ll edit your first video for free.
              </p>
            </div>
            <div className="pt-4">
              <Link href="mailto:max.doucet@icloud.com">
                <ShimmerButton 
                  background="#2196f3"
                  className="px-10 py-5 rounded-full text-white text-xl font-sans font-medium tracking-wider transition-transform hover:scale-105 glow-button"
                >
                  Discuss your content
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </section>

        {/* 9. REDESIGNED FOOTER */}
        {/* 9. REDESIGNED FOOTER */}
        {/* 9. REDESIGNED FOOTER */}
        <footer className="py-10 px-6 bg-[#000000] border-t border-white/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6 text-left">
              <div className="text-2xl font-tight font-semibold text-white tracking-tight">
                max<TextShimmer baseColor="#2196f3" shimmerColor="#ffffff" className="text-2xl font-tight font-semibold" duration={3}>.dt88</TextShimmer>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-sans font-normal text-white/75">
                  Video editing built for engagement.
                </p>
                <p className="text-xs font-sans font-normal text-white/65">
                  Available for select projects
                </p>
              </div>
            </div>
            
            {/* MIDDLE COLUMN (Centered) */}
            <div className="space-y-6 md:text-center">
              <h4 className="text-base font-tight font-semibold text-white uppercase tracking-wider">Contact</h4>
              <a 
                href="mailto:max.doucet@icloud.com" 
                className="text-base font-sans font-normal text-white hover:brightness-125 transition-all duration-300 block"
              >
                max.doucet@icloud.com
              </a>
            </div>
            
            {/* RIGHT COLUMN (Far Right Content - Left Aligned Text) */}
            <div className="md:justify-self-end text-left space-y-6">
              <h4 className="text-base font-tight font-semibold text-white uppercase tracking-wider text-left">Socials</h4>
              <nav className="flex flex-col gap-4 items-start text-left">
                <a href="#" className="text-base font-sans font-normal text-white hover:brightness-125 transition-all duration-300 text-left">TikTok</a>
                <a href="#" className="text-base font-sans font-normal text-white hover:brightness-125 transition-all duration-300 text-left">Instagram</a>
                <a href="#" className="text-base font-sans font-normal text-white hover:brightness-125 transition-all duration-300 text-left">YouTube</a>
              </nav>
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
