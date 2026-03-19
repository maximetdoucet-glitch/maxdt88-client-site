"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Spotlight } from "@/components/ui/spotlight";
import { SplitChars, SplitWords } from "@/components/ui/text-effects";
import { TextShimmer } from "@/components/ui/text-shimmer";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });

/* ─── FAQ Accordion ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0 relative z-10">
      <button 
        type="button"
        onClick={() => setOpen((prev) => !prev)} 
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer relative z-20"
      >
        <span className="text-[#f4ebd0] font-bold text-base md:text-lg pr-4 group-hover:text-[#0369a1] transition-colors duration-300">{question}</span>
        <span className="text-[#f4ebd0] flex-shrink-0 transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <Plus className="w-5 h-5" />
        </span>
      </button>
      <div 
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ 
          maxHeight: open ? '500px' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out'
        }}
      >
        <p className="text-[#f4ebd0] text-sm md:text-base leading-relaxed pb-6 max-w-2xl whitespace-pre-line">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="relative bg-[#0a0a0a] min-h-screen text-[#f4ebd0] overflow-hidden">
      <Navbar />

      {/* Decorative elements */}
      <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.08} particleCount={350} speed={0.9} />
      <Spotlight size={500} fill="rgba(232, 98, 44, 0.06)" />

      {/* Content */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-40">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-xs font-bold tracking-[0.3em] uppercase mb-8 block">Real talk</TextShimmer>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-[#f4ebd0] whitespace-nowrap">
              <SplitChars text="Fair enough. Let's address that." />
            </h1>
            <p className="text-[#f4ebd0] text-lg max-w-none mx-auto whitespace-nowrap">
              <SplitWords text="No fluff. Just straight answers to the questions you actually have." delay={0.4} />
            </p>
          </div>

          <div className="animated-border glass rounded-2xl p-6 md:p-10">
            <FaqItem 
              question="Why is this free?" 
              answer={`The training plan is free because the goal of this project isn’t to sell motivation.
It’s to provide a simple system that helps people maintain the foundation behind discipline.
If the system proves useful, there are optional tools and equipment available.
But the starting point should always be accessible.`}
            />
            <FaqItem 
              question="Do I need equipment?" 
              answer={`No.
The program is designed to work with minimal or no equipment.
The focus is consistency, not complexity.
The routine can be done at home and takes around 15 minutes.
Optional equipment simply makes progression easier for those who want it.`}
            />
            <FaqItem 
              question="Who made this?" 
              answer={`This project was created by someone who spent years studying the mindset behind people who succeed.
The edits started as a way to highlight characters and athletes who embody relentless determination.
Over time, the goal became bigger:
to create systems that make discipline easier to maintain in real life.`}
            />
            <FaqItem 
              question="Why those specific characters?" 
              answer={`Characters like Franklin Saint resonate with millions because of the mindset they represent.
They adapt under pressure.
They stay focused when situations get difficult.
They refuse to stay weak.
The edits highlight those traits — not the lifestyle around them.
The point isn’t the character.
The point is the mindset.`}
            />
            <FaqItem 
              question="Is 15 minutes actually enough?" 
              answer={`For building a consistent baseline, yes.
The goal isn’t bodybuilding or extreme training.
The goal is maintaining a disciplined routine that keeps the body sharp and the mind focused.
Consistency beats complexity.
Fifteen focused minutes done regularly is far more effective than long workouts done inconsistently.`}
            />
            <FaqItem 
              question="Is this a fitness program?" 
              answer={`Not exactly.
The program focuses on maintaining a baseline physique that supports discipline and mental clarity.
It’s designed for people who already pursue ambitious goals and want a simple system that fits into a busy schedule.`}
            />
            <FaqItem 
              question="What happens after I enter my email?" 
              answer={`You’ll receive the free 8-week discipline plan.
Occasionally you may receive updates, improvements to the system, or new tools related to training and discipline.
No spam. Just useful material.`}
            />
          </div>

          {/* Back to home */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-[#f4ebd0]/40 hover:text-[#0369a1] transition-colors text-sm font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 12H4.5M4.5 12L11.25 5.25M4.5 12L11.25 18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER — Dark Mode */}
      <footer className="relative border-t border-[#333] py-16 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Navigate</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Home</Link></li>
                <li><Link href="/products" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Equipment</Link></li>
                <li><Link href="/about" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Mission</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/max.dt88" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@max.dt88?_r=1&_t=ZN-94mFUrNROJH" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">TikTok</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/#signup" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Free Program</Link></li>
                <li><Link href="/faq" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#333] gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-[#f4ebd0] font-black text-sm">max</span>
                <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-sm font-black">.dt88</TextShimmer>
              </div>
              <span className="text-[#6b7280] text-xs">© 2026. All rights reserved.</span>
            </div>
            <div className="text-right">
              <p className="text-[#f4ebd0]/20 text-xs italic">Built for students, by a student.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
