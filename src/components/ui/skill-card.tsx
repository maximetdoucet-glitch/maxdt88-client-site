"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextShimmer } from "./text-shimmer";

interface SkillCardProps {
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  className?: string;
}

export function SkillCard({
  phase,
  title,
  description,
  icon: Icon,
  difficulty,
  tags,
  className,
}: SkillCardProps) {
  const difficultyColor = {
    Beginner: "text-green-600 bg-green-50",
    Intermediate: "text-[#3b82f6] bg-[#3b82f6]/5",
    Advanced: "text-red-600 bg-red-50",
  }[difficulty];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:border-[#3b82f6]/20 hover:shadow-2xl hover:shadow-[#3b82f6]/5",
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#3b82f6]/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a0a0a] text-[#f4ebd0] transition-transform group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>
            <TextShimmer baseColor="#3b82f6" shimmerColor="#ffffff" className="text-xs font-bold uppercase tracking-widest">
              {phase}
            </TextShimmer>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
              difficultyColor
            )}
          >
            {difficulty}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-black tracking-tight text-[#0a0a0a]">
          {title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-[#0a0a0a]/70 group-hover:text-[#0a0a0a] transition-colors">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[#0a0a0a]/5 bg-[#0a0a0a]/2 px-2.5 py-1 text-[10px] font-semibold text-[#0a0a0a]/60 transition-colors group-hover:border-[#3b82f6]/20 group-hover:text-[#0a0a0a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
