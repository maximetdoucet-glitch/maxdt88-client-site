"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "email" | "goal" | "success";

const GOALS = [
  { id: "muscle", label: "Build raw power & muscle", icon: "💪" },
  { id: "mental", label: "Sharpen focus & mental clarity", icon: "🧠" },
  { id: "bio", label: "Optimize biology & recovery", icon: "🧬" },
];

import { ShimmerButton } from "./shimmer-button";
import { TextShimmer } from "./text-shimmer";

export function SignupForm({
  buttonText = "Send me the program →"
}: {
  buttonText?: string
}) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep("goal");
  };

  const handleGoalSubmit = () => {
    if (goal) setStep("success");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-white border border-[#e5e7eb] rounded-[2rem] sm:rounded-3xl p-2 shadow-sm relative group">
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  required
                  placeholder="Your best email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-transparent border-none outline-none text-[#111111] placeholder:text-[#9ca3af] text-sm font-medium h-14"
                />
                <ShimmerButton
                  type="submit"
                  shimmerColor="#ffffff"
                  shimmerSize="0.1em"
                  shimmerDuration="2s"
                  background="#3b82f6"
                  className="px-6 py-4 text-[#f4ebd0] font-bold text-sm rounded-[1.5rem] sm:rounded-2xl hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all duration-300 whitespace-nowrap h-14 flex-shrink-0"
                >
                  {buttonText}
                </ShimmerButton>
              </form>
            </div>

            {/* Trust & Social Proof */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-[0.7rem] font-bold tracking-wider uppercase text-[#6b7280]">
                <Users className="w-3 h-3 text-[#3b82f6]" />
                Join 500+ who already started
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#3b82f6]/5 border border-[#3b82f6]/10 rounded-full text-[0.65rem] font-bold text-[#3b82f6] uppercase tracking-tighter">
                <ShieldCheck className="w-3 h-3" />
                Privacy First · No spam. Ever.
              </div>
            </div>
          </motion.div>
        )}

        {step === "goal" && (
          <motion.div
            key="goal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 text-left"
          >
            <div className="space-y-3">
              <p className="text-[#6b7280] text-sm font-bold uppercase tracking-widest mb-4">
                What&apos;s your primary goal?
              </p>
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group",
                    goal === g.id
                      ? "bg-[#3b82f6] border-[#3b82f6] text-[#f4ebd0] shadow-md shadow-[#3b82f6]/20"
                      : "bg-white border-[#e5e7eb] text-[#111111] hover:border-[#d1d5db] hover:shadow-sm"
                  )}
                >
                  <span className="text-xl">{g.icon}</span>
                  <span className="flex-1 font-bold text-sm">{g.label}</span>
                  {goal === g.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>

            <ShimmerButton
              onClick={handleGoalSubmit}
              disabled={!goal}
              shimmerColor="#ffffff"
              shimmerSize="0.1em"
              background={goal ? "#111111" : "#f3f4f6"}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300",
                goal
                  ? "text-[#f4ebd0] hover:shadow-lg"
                  : "text-[#9ca3af] cursor-not-allowed border border-[#e5e7eb]"
              )}
            >
              Finish & Download →
            </ShimmerButton>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#3b82f6]/20">
              <Check className="w-8 h-8 text-[#f4ebd0]" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-[#111111] mb-3">
              You&apos;re in.
            </h3>
            <p className="text-[#6b7280] text-sm mb-8 font-medium">
              Check your inbox. Day 1 starts now.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="hover:underline"
            >
              <TextShimmer baseColor="#3b82f6" shimmerColor="#ffffff" className="text-xs font-bold uppercase tracking-widest">
                Reset form
              </TextShimmer>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
