"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem("cookie-consent");
    } catch {}
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie-consent", value);
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[100] left-3 right-3 bottom-20 md:bottom-6 md:left-auto md:right-6 md:max-w-[380px]"
        >
          <div className="rounded-2xl bg-[#111111] border border-white/10 p-5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]">
            <p className="text-sm font-semibold text-white mb-1.5">Privacy-friendly analytics</p>
            <p className="text-[13px] text-white/60 leading-relaxed">
              This site uses cookieless analytics to see which pages get visited. No ads, no tracking across sites.{" "}
              <Link href="/privacy" className="text-white/85 underline underline-offset-2 hover:text-white">
                Privacy and cookies
              </Link>
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => choose("declined")}
                className="flex-1 py-2.5 rounded-full border border-white/15 text-white/85 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => choose("accepted")}
                className="flex-1 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
