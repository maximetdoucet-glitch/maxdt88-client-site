"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SvgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  px?: string;
  white?: boolean;
}

export const SvgButton = ({ 
  children, 
  className, 
  onClick, 
  px = "px-7",
  white = false
}: SvgButtonProps) => {
  const classes = cn(
    "button relative inline-flex items-center justify-center h-11 transition-colors hover:text-[#1d4ed8]",
    px,
    white ? "text-[#0a0a0a]" : "text-[#f4ebd0]",
    className
  );

  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  return renderButton();
};

const ButtonSvg = (white: boolean) => {
  return (
    <>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className={cn(
            "fill-current transition-colors",
            white ? "text-[#f4ebd0]" : "text-[#0a0a0a]"
          )}
          d="M0 5 L5 0 L95 0 L100 5 L100 95 L95 100 L5 100 L0 95 Z"
        />
        <path
          className="fill-none stroke-[#1d4ed8]/20 stroke-[1]"
          d="M0 5 L5 0 L95 0 L100 5 L100 95 L95 100 L5 100 L0 95 Z"
        />
      </svg>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity" />
    </>
  );
};
