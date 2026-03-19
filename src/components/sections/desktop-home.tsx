"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Brain, Clock, Activity, Dumbbell, Globe, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SignupForm } from "@/components/ui/signup-form";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Spotlight } from "@/components/ui/spotlight";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { EvervaultCard } from "@/components/ui/evervault-card";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import SectionWithMockup from "@/components/ui/section-with-mockup";
import { RevealText } from "@/components/ui/reveal-text";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { BlurText } from "@/components/ui/blur-text";

/* ─── Lazy-load heavy visual components ─── */
const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });
const ShaderAnimation = dynamic(() => import("@/components/ui/shader-lines").then((mod) => mod.ShaderAnimation), { ssr: false });
const MagneticGrid = dynamic(() => import("@/components/ui/magnetic-grid"), { ssr: false });

/* ─── Register GSAP ─── */
gsap.registerPlugin(ScrollTrigger);

interface DesktopHomeProps {
  showContent: boolean;
}

export function DesktopHome({ showContent }: DesktopHomeProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const truthRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const roadblockRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);

  /* ─── GSAP Scroll Animations ─── */
  useGSAP(() => {
    if (!showContent) return;
    const ctx = gsap.context(() => {
      // Hero entrance animations
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 30,
          scale: 0.95,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        // Track A: Text split stagger
        const chars = heroRef.current.querySelectorAll('.text-split-char');
        gsap.fromTo(chars, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out", delay: 0.2 }
        );

        const heroEls = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroEls, 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.6 }
        );

        // Hero pills stagger
        const pills = heroRef.current.querySelectorAll('.hero-pill');
        gsap.fromTo(pills,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 1 }
        );
      }

      // Section reveals
      const sections = [mirrorRef, truthRef, solutionRef, roadblockRef, bridgeRef, offerRef];
      sections.forEach((ref) => {
        if (!ref.current) return;

        // Headings slide up
        ref.current.querySelectorAll('.gsap-heading').forEach((el) => {
          gsap.fromTo(el, { y: 100, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
          });
        });

        // Text paragraphs
        ref.current.querySelectorAll('.gsap-text').forEach((el, i) => {
          gsap.fromTo(el, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, delay: 0.12 * i, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" }
          });
        });

        // Cards with stagger
        const cards = ref.current.querySelectorAll('.gsap-card');
        if (cards.length > 0) {
          gsap.fromTo(cards, { y: 80, opacity: 0, scale: 0.92 }, {
            y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cards[0], start: "top 88%", toggleActions: "play none none none" }
          });
        }

        // Ellipse parallax
        ref.current.querySelectorAll('.gsap-ellipse').forEach((el) => {
          gsap.fromTo(el, { y: 80, scale: 0.7, opacity: 0 }, {
            y: -80, scale: 1.2, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 }
          });
        });

        // Visual centerpiece scale-in
        ref.current.querySelectorAll('.gsap-visual').forEach((el) => {
          gsap.fromTo(el, { scale: 0.5, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.5, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
          });
        });

        // Word-by-word fade
        ref.current.querySelectorAll('.word-fade-container').forEach((container) => {
          const words = container.querySelectorAll('.word-fade');
          gsap.fromTo(words, { opacity: 0, filter: "blur(8px)" }, {
            opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: container, start: "top 85%", toggleActions: "play none none none" }
          });
        });

        // Count-up numbers
        ref.current.querySelectorAll('.count-up-target').forEach((el) => {
          const target = parseInt(el.getAttribute('data-value') || "0");
          gsap.fromTo(el, { innerHTML: 0 }, {
            innerHTML: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerHTML: 1 },
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
          });
        });

        // Element-Level Parallax Support
        document.querySelectorAll('[data-speed]').forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || "1");
          gsap.to(el, {
            y: (i, target) => -100 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, { dependencies: [showContent], scope: mainRef });

  return (
    <div ref={mainRef} className="relative">
      {/* 1. HERO */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center pb-16 pt-32 overflow-hidden">
        <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.05} particleCount={500} speed={0.6} />
        <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10 text-center w-full">
          <div className="mb-8">
            <RevealText 
              text="Become Like" 
              fontSize="text-6xl md:text-8xl lg:text-[7rem]"
              textColor="text-[#f4ebd0]"
            />
            <RevealText 
              text="The Saint." 
              fontSize="text-6xl md:text-8xl lg:text-[7rem]"
              textColor="text-[#f4ebd0]"
              letterDelay={0.1}
            />
          </div>
          <div className="hero-animate text-[#9ca3af] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto space-y-4">
            <p>
              Franklin Saint didn’t build his reputation because of crime.<br/>
              He built it because he refused to stay weak.<br/>
              Every great character people admire shares the same foundation:
            </p>
            <p className="font-bold text-[#f4ebd0] text-xl md:text-2xl mt-4">
              discipline.
            </p>
          </div>
          <div className="hero-animate max-w-lg mx-auto relative z-20">
             <SignupForm buttonText="Get the Free Discipline Plan" />
             <p className="text-[10px] text-[#9ca3af] mt-4 font-bold uppercase tracking-[0.2em]">
               No gym. No equipment. Start today.
             </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }} animate={showContent ? { opacity: 1 } : {}} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
            <span className="text-[#9ca3af] text-[10px] tracking-[0.3em] uppercase font-bold">Scroll</span>
            <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. IDENTITY RECOGNITION */}
      <section ref={mirrorRef} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <ShaderAnimation />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />
        <SectionWithMockup 
          title={
            <BlurText
              text="Why characters like Franklin Saint attract millions."
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#f4ebd0] mb-8"
              animateBy="words"
              direction="bottom"
              delay={100}
            />
          }
          description={
            <div className="space-y-4">
              <p>People don’t admire Franklin Saint because he sells drugs. <strong className="text-[#f4ebd0]">They admire him because he refuses to lose.</strong></p>
              <p>Because he adapts. Because he becomes stronger. Because he does whatever it takes to rise above his circumstances.</p>
              <p>Across movies, sports, and real life — the same pattern appears again and again. People gravitate toward individuals who build power quietly and win when the odds are against them.</p>
            </div>
          }
          primaryImageSrc="/franklin-saint-section-2.jpg"
          secondaryImageSrc="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=2069&auto=format&fit=crop"
          reverseLayout={false}
        />
      </section>

      {/* 3. THE TRUTH ABOUT WINNERS */}
      <section ref={truthRef} className="relative py-20 md:py-32 bg-[#0a0a0a] overflow-hidden">
        <MagneticGrid className="absolute inset-0 z-0" color="#f4ebd0" gap={40} dotSize={1.5} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <GradientHeading variant="white" size="xl" weight="black" className="gsap-heading text-center mb-0 md:mb-16">
            Every winner builds the same foundation.
          </GradientHeading>
          <div className="relative -mt-10 md:mt-0">
            <RadialOrbitalTimeline 
              timelineData={[
                { id: 1, title: "The Baseline", date: "starting point", content: "Before the money. Before the recognition. Before the success.", category: "Foundation", icon: Activity, relatedIds: [2], status: "completed", energy: 0 },
                { id: 2, title: "Discipline", date: "step 2", content: "Daily actions that build strength and consistency.", category: "Action", icon: Dumbbell, relatedIds: [1, 3], status: "completed", energy: 33 },
                { id: 3, title: "Mental Strength", date: "step 3", content: "Discipline over the body creates the mental fortitude to overcome any challenge and adopt the never give up mentality.", category: "Mindset", icon: Shield, relatedIds: [2, 4], status: "in-progress", energy: 67 },
                { id: 4, title: "The Result", date: "final destination", content: "A strong mindset which drives you to accomplish your goals and lead you to success.", category: "Power", icon: Brain, relatedIds: [3], status: "pending", energy: 100 }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. VISION & BENTO SYSTEM */}
      <section ref={solutionRef} className="relative py-20 md:py-32 overflow-hidden">
        <NeuralBackground className="absolute inset-0 z-0" color="#0ea5e9" trailOpacity={0.1} particleCount={300} speed={0.6} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <GradientHeading variant="white" size="xl" weight="black" className="gsap-heading text-center mb-16">
            People chasing success understand this.
          </GradientHeading>
          <BentoGrid className="lg:grid-rows-3">
            <BentoCard name="The Motivation Paradox" className="lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-3" Icon={Zap} description="People who pursue ambitious goals rarely struggle with motivation. They struggle with time." href="#signup" cta="Register Access" background={<EvervaultCard text="CORE" className="opacity-30" />} />
            <BentoCard name="The Friction" className="lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-2" Icon={Clock} description="Between work, study, responsibilities, and personal growth, maintaining consistency becomes another challenge to manage." href="#signup" cta="Details" />
            <BentoCard name="The Target" className="lg:col-start-5 lg:col-end-7 lg:row-start-2 lg:row-end-3" Icon={Brain} description="The goal is not to become a bodybuilder. The goal is to maintain the baseline that keeps the mind sharp and the body disciplined." href="#signup" cta="Explore" />
            <BentoCard name="Simple System" className="lg:col-start-1 lg:col-end-7 lg:row-start-3 lg:row-end-4" Icon={Shield} description="This project was created for people chasing ambitious goals. Simple systems make it easier to maintain a disciplined routine, protect consistency, and maintain the baseline that supports a strong mindset. The goal isn't complexity. The goal is removing friction so ambitious people can stay consistent." href="#signup" cta="Initialize Baseline" />
          </BentoGrid>
        </div>
      </section>

      {/* 5. CREDIBILITY */}
      <section ref={roadblockRef} className="relative py-20 md:py-32 overflow-hidden">
        <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.25} particleCount={800} speed={1.2} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <GradientHeading variant="white" size="xl" weight="black" className="gsap-heading mb-6">This mindset attracts millions.</GradientHeading>
              <div className="space-y-6 gsap-text">
                <p className="text-lg md:text-xl text-[#9ca3af] leading-relaxed">In less than a year:</p>
                <ul className="text-lg md:text-xl text-[#f4ebd0] font-bold leading-relaxed border-l-4 border-[#0369a1] pl-6 space-y-2">
                  <li>• 50M+ views across platforms</li>
                  <li>• 40K+ followers across multiple accounts</li>
                  <li>• A growing community drawn to the same mindset.</li>
                </ul>
                <div className="text-lg md:text-xl text-[#9ca3af] leading-relaxed space-y-4">
                  <p>The edits started as entertainment. But something became clear very quickly. Millions of people are fascinated by discipline, resilience, and the mindset required to win.</p>
                  <p>Most people enjoy watching it. A smaller group chooses to build it.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <StatCard icon={Globe} value="50" suffix="M+" label="Views Generated" color="#0369a1" />
              <StatCard icon={Users} value="40" suffix="k+" label="Followers Across Accounts" color="#0ea5e9" />
              <StatCard icon={Clock} value="15" label="Minutes A Day" color="#f4ebd0" opacity={0.05} />
              <StatCard icon={DollarSign} value="$0" label="To Get Started" color="#0ea5e9" />
            </div>
          </div>
          <div className="mt-20 pt-12 border-t border-white/5 text-center gsap-text">
            <p className="text-2xl md:text-4xl font-black text-[#f4ebd0] tracking-tight">This site exists for the second group.</p>
            <TextShimmer baseColor="#0ea5e9" shimmerColor="#ffffff" className="text-xl md:text-2xl font-bold mt-2">The ones who choose to act.</TextShimmer>
          </div>
        </div>
      </section>

      {/* 6. MISSION */}
      <section ref={bridgeRef} className="relative py-32 md:py-48 bg-[#030303] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.08)_0%,transparent_70%)] opacity-80" />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-50" fill="#0ea5e9" />
        <Spotlight className="top-40 right-0 md:right-40 md:top-20 opacity-30" fill="#0369a1" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
             <div className="space-y-6">
                <GradientHeading variant="white" size="lg" weight="black" className="gsap-heading mb-8">Why this site exists.</GradientHeading>
               <div className="gsap-text text-lg md:text-xl text-[#9ca3af] leading-relaxed space-y-4">
                  <p>The internet is full of entertainment and motivation. <strong className="text-[#f4ebd0]">But motivation fades quickly.</strong></p>
                  <p>What people actually need are simple systems that make discipline easier to maintain.</p>
                  <p>This project started by creating edits that highlight characters and athletes who embody relentless determination.</p>
                  <p className="text-[#f4ebd0] font-bold pt-4 border-t border-[#333]">Now the goal is simple:<br/>provide tools that make it easier for people chasing success to maintain the foundation that supports everything else.</p>
               </div>
             </div>
             <div className="flex justify-center lg:justify-end">
               <DatabaseWithRestApi 
                 title="System Architecture" circleText="CORE" lightColor="#0ea5e9"
                 badgeTexts={{ first: "SYSTEMS", second: "TOOLS", third: "MINDSET", fourth: "DISCIPLINE" }}
                 buttonTexts={{ first: "Relentless Focus", second: "Consistency" }}
               />
             </div>
           </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section ref={offerRef} id="signup" className="relative py-24 md:py-32 overflow-hidden">
        <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.1} particleCount={450} speed={1.0} />
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <BlurText text="Make your training simpler." className="text-4xl md:text-5xl font-black tracking-tight leading-[1] mb-6 text-[#f4ebd0] justify-center" animateBy="words" direction="top" delay={150} />
          <div className="gsap-text text-[#9ca3af] text-lg mb-12 max-w-2xl mx-auto leading-relaxed space-y-4">
            <p>Most people chasing big goals already understand the importance of discipline. The challenge isn’t knowing what to do.<br/>It’s maintaining consistency without wasting time.</p>
            <p className="font-medium text-[#f4ebd0]">A structured discipline plan removes the commute, removes the friction, and keeps your physique sharp with minimal time investment.</p>
            <p>Enter your email below to get the free 8-week discipline plan.</p>
          </div>
          <div className="gsap-visual bg-[#111]/80 backdrop-blur-md border border-[#333] shadow-2xl shadow-black/50 rounded-[2.5rem] p-8 md:p-10 max-w-3xl mx-auto">
            <SignupForm buttonText="Get the Free Discipline Plan" />
            <p className="text-sm font-medium text-[#9ca3af] mt-4 tracking-wide font-bold">Join 2,000+ others building discipline daily.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, value, suffix, label, color, opacity = 0.1 }: any) {
  return (
    <div className="gsap-visual relative bg-[#111]/80 backdrop-blur-md border border-[#333] rounded-2xl p-4 text-center shadow-xl shadow-black/50">
      <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mx-auto mb-3 shadow-inner shadow-white/10 border border-[#444]">
        <Icon className="w-4 h-4 text-[#f4ebd0]" />
      </div>
      <div className="text-3xl md:text-4xl font-black text-[#f4ebd0] mb-1 tracking-tighter">
        {value.startsWith('$') ? value : <><span className="count-up-target" data-value={value}>0</span>{suffix}</>}
      </div>
      <div className="text-[#9ca3af] font-bold tracking-[0.1em] uppercase text-[10px]">{label}</div>
      <div className="absolute top-0 right-0 w-[80px] h-[80px] rounded-full pointer-events-none" style={{ background: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`, filter: 'blur(30px)' }} />
    </div>
  );
}
