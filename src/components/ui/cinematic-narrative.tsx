"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface StageProps {
  text: string;
  highlight?: boolean;
  color?: string;
  large?: boolean;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

function NarrativeStage({ text, highlight, color, large, progress, index, total }: StageProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  // Opacity: fade in and out center-weighted
  const opacity = useTransform(
    progress,
    [start, mid - 0.05, mid + 0.05, end],
    [0, 1, 1, 0]
  );

  // Scale: subtle growth during the stage
  const scale = useTransform(
    progress,
    [start, mid, end],
    [0.9, 1, 1.05]
  );

  // Blur: cinematic focus shift
  const blurValue = useTransform(
    progress,
    [start, mid - 0.05, mid + 0.05, end],
    [10, 0, 0, 10]
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  // Y translation: subtle lift
  const y = useTransform(
    progress,
    [start, end],
    [40, -40]
  );

  return (
    <motion.div
      style={{ opacity, scale, y, filter }}
      className="absolute inset-0 flex items-center justify-center p-6 text-center"
    >
      <div className="max-w-4xl">
        <h3
          className={cn(
            "text-3xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]",
            highlight ? "" : "text-[#9ca3af]/60",
            large ? "text-5xl md:text-7xl lg:text-9xl" : ""
          )}
          style={{ color: highlight ? color : undefined }}
        >
          {text}
        </h3>
      </div>
    </motion.div>
  );
}

interface CinematicNarrativeProps {
  className?: string;
}

export function CinematicNarrative({ className }: CinematicNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stages = [
    {
      text: "People who pursue ambitious goals rarely struggle with motivation.",
      highlight: false,
    },
    {
      text: "They struggle with time.",
      highlight: true,
      color: "#0ea5e9",
    },
    {
      text: "Between work, study, and responsibilities, staying consistent is the challenge.",
      highlight: false,
    },
    {
      text: "The goal is not to become a bodybuilder.",
      highlight: false,
    },
    {
      text: "The goal is to maintain the baseline that keeps the mind sharp.",
      highlight: true,
      color: "#0ea5e9",
    },
    {
      text: "A simple system makes that easier.",
      highlight: false,
    },
    {
      text: "That’s where this project comes in.",
      highlight: true,
      color: "#f4ebd0",
      large: true,
    },
  ];

  return (
    <div ref={containerRef} className={cn("relative h-[500vh]", className)}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Visual Artifacts */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border-[0.5px] border-[#0ea5e9]/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border-[0.5px] border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          {stages.map((stage, index) => (
            <NarrativeStage
              key={index}
              {...stage}
              progress={scrollYProgress}
              index={index}
              total={stages.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
