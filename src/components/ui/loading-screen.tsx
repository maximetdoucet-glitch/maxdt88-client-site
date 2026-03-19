"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { TextShimmer } from "./text-shimmer";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const progress = useMotionValue(0);
  const [done, setDone] = useState(false);
  const [isFull, setIsFull] = useState(false);

  // Use event to update local state only once when reaching 100%
  useMotionValueEvent(progress, "change", (latest) => {
    if ((latest as number) >= 100 && !isFull) setIsFull(true);
  });

  useEffect(() => {
    let start = Date.now();
    const duration = 2200; // 2.2 second load

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out curve for natural feel
      const eased = 1 - Math.pow(1 - pct, 3);
      progress.set(Math.round(eased * 100));

      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
        setTimeout(() => onComplete(), 1200);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete, progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Logo - Memoized to prevent re-renders during progress updates */}
          <Logo />

          {/* Bottom bar */}
          <div className="absolute bottom-12 left-0 right-0 px-8 md:px-16">
            <div className="flex items-center justify-between mb-4">
              <LoadingStatus isFull={isFull} />
              <PercentageValue progress={progress} />
            </div>
            <ProgressBar progress={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sub-components to isolate re-renders from the main LoadingScreen

const Logo = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-16"
  >
    <span className="text-[#f4ebd0] font-black text-3xl tracking-tight">
      max<TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-3xl font-black"> .dt88</TextShimmer>
    </span>
  </motion.div>
));

Logo.displayName = "Logo";

const LoadingStatus = React.memo(({ isFull }: { isFull: boolean }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay: 0.3 }}
    className="text-[#f4ebd0]/40 text-xs font-medium tracking-[0.2em] uppercase"
  >
    Loading Experience
    <span className="inline-block w-4">
      {!isFull && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >…</motion.span>
      )}
    </span>
  </motion.span>
));

LoadingStatus.displayName = "LoadingStatus";

function PercentageValue({ progress }: { progress: any }) {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useMotionValueEvent(progress, "change", (latest) => {
    if (textRef.current) {
      textRef.current.textContent = `${Math.round(latest as number)}%`;
    }
  });

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-[#f4ebd0] text-sm font-bold tabular-nums"
    >
      <span ref={textRef}>0%</span>
    </motion.span>
  );
}

function ProgressBar({ progress }: { progress: any }) {
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);
  
  return (
    <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#0369a1] rounded-full"
        style={{ width }}
      />
    </div>
  );
}
