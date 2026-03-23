"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={handleDecline}
          />

          {/* Centered Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[100] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[440px] pointer-events-auto"
            >
              <div className="relative overflow-hidden rounded-[24px] bg-[#111111] border border-white/5 p-8 md:p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-tight font-bold text-white tracking-tight leading-tight">
                      Data improves your experience
                    </h3>
                    <p className="text-[15px] text-white/60 leading-relaxed font-sans">
                      We use cookies to enhance your experience, show you more relevant information, and help us understand how you use our site. By clicking &quot;Accept All&quot;, you agree to our use of cookies.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button 
                      onClick={handleAccept}
                      variant="default"
                      className="w-full bg-white text-black hover:bg-white/90 font-bold py-7 rounded-full text-base transition-transform active:scale-[0.98]"
                    >
                      Accept All
                    </Button>
                    <Button 
                      onClick={handleDecline}
                      variant="ghost"
                      className="w-full text-white/50 hover:text-white hover:bg-white/5 font-medium py-6 rounded-full text-sm transition-colors"
                    >
                      Decline All
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
