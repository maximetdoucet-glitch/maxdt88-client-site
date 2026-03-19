"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionCurveProps {
  className?: string;
  position?: "top" | "bottom";
  color?: string;
}

export const SectionCurve = ({ 
  className, 
  position = "top",
  color = "#f4ebd0" // Matches our cocaine white/cream background
}: SectionCurveProps) => {
  return (
    <div
      className={cn(
        "absolute left-0 w-full pointer-events-none z-10",
        position === "top" ? "-top-[1px]" : "-bottom-[1px]",
        className
      )}
    >
      <svg
        className={cn(
          "w-full h-[6.25rem] fill-current",
          position === "bottom" && "rotate-180"
        )}
        style={{ color }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 100C240 100 480 0 720 0C960 0 1200 100 1440 100V0H0V100Z" />
      </svg>
    </div>
  );
};

/* ─── Plus Symbol Decorative Element ─── */
export const PlusSymbol = ({ className }: { className?: string }) => (
  <div className={cn("absolute text-[#0a0a0a]/20 font-light select-none pointer-events-none", className)}>
    +
  </div>
);
