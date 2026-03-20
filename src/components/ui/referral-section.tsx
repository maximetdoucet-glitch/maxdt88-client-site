"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Share2, Copy, Check, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextShimmer } from "./text-shimmer";

export function ReferralSection() {
  const [copied, setCopied] = useState(false);
  const referralLink = "max.dt88/join?ref=builder_77";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Content & Incentive */}
        <div className="text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d4ed8]/10 border border-[#1d4ed8]/20 rounded-full">
            <TrendingUp className="w-3 h-3 text-[#1d4ed8]" />
            <TextShimmer baseColor="#1d4ed8" shimmerColor="#ffffff" className="text-[0.65rem] font-bold uppercase tracking-widest">
              Growth Engine Active
            </TextShimmer>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-[#0a0a0a]">
            Refer a builder,<br /> 
            <TextShimmer baseColor="#1d4ed8" shimmerColor="#ffffff" className="text-3xl md:text-5xl font-black">Expand the Bazaar.</TextShimmer>
          </h2>
          
          <p className="text-[#0a0a0a]/70 text-base leading-relaxed max-w-md">
            The protocol is stronger when shared. Invite a fellow builder to join the community and you both unlock 
            <span className="font-bold text-[#0a0a0a]"> 3 months of Premium Bazaar Access</span>. 
            Double-sided impact. No friction.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#f4ebd0] bg-[#0a0a0a]/10 overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 123}`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#f4ebd0] bg-[#1d4ed8] flex items-center justify-center text-[0.6rem] font-bold text-[#f4ebd0]">
                +50k
              </div>
            </div>
            <div className="text-xs font-medium text-[#0a0a0a]/50">
              <span className="text-[#0a0a0a] font-bold">50,214 builders</span> already active
            </div>
          </div>
        </div>

        {/* Right: Interactive Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#1d4ed8]/5 rounded-[2.5rem] blur-2xl transform rotate-3" />
          <div className="glass relative rounded-[2.5rem] p-8 border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Gift className="w-24 h-24 text-[#0a0a0a]" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <TextShimmer baseColor="#1d4ed8" shimmerColor="#ffffff" className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                  Your Referral Link
                </TextShimmer>
                <div className="flex items-center gap-2 p-4 bg-[#0a0a0a]/5 rounded-2xl border border-[#0a0a0a]/5 group hover:border-[#1d4ed8]/20 transition-all">
                  <code className="flex-1 text-sm font-medium text-[#0a0a0a]/70 truncate">
                    {referralLink}
                  </code>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-[#1d4ed8]/10 rounded-xl transition-colors text-[#1d4ed8]"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 bg-[#0a0a0a] text-[#f4ebd0] rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#1d4ed8] transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                  Share Meta
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-transparent border border-[#0a0a0a]/10 text-[#0a0a0a] rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all duration-300">
                  <Users className="w-4 h-4" />
                  Invite direct
                </button>
              </div>

              <div className="pt-4 border-t border-[#0a0a0a]/5">
                <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-widest mb-4 text-[#0a0a0a]/40">
                  <span>Your Impact</span>
                  <TextShimmer baseColor="#1d4ed8" shimmerColor="#ffffff" className="text-[0.7rem] font-bold uppercase tracking-widest">Level 2 Builder</TextShimmer>
                </div>
                <div className="w-full h-1.5 bg-[#0a0a0a]/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#1d4ed8]" 
                  />
                </div>
                <div className="flex justify-between mt-3 text-[0.65rem] text-[#0a0a0a]/50 font-medium">
                  <span>7 / 10 Referrals</span>
                  <span>Next milestone: Exclusive Kit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
