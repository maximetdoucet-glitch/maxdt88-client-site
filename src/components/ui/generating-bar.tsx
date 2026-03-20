"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GeneratingBarProps {
  className?: string;
  text?: string;
}

export const GeneratingBar = ({ 
  className,
  text = "Optimizing Architecture" 
}: GeneratingBarProps) => {
  return (
    <div
      className={cn(
        "flex items-center h-[3.5rem] px-6 bg-[#0a0a0a]/80 backdrop-blur border border-[#3b82f6]/20 rounded-[1.7rem] text-sm text-[#f4ebd0]",
        className
      )}
    >
      <Loader2 className="w-5 h-5 mr-4 text-[#3b82f6] animate-spin" />
      <span className="font-medium tracking-tight uppercase text-[0.7rem] tracking-widest">
        {text}
        <span className="inline-flex ml-1 animate-pulse">...</span>
      </span>
    </div>
  );
};
