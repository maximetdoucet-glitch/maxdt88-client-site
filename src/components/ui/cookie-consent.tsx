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
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[100]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 shadow-2xl shadow-blue-500/10">
            <button 
              onClick={handleDecline}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-tight font-semibold text-white">
                  Privacy & Experience
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  I use minimal tracking to understand how you navigate the site and improve the experience. No personal data is sold or used for ads.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button 
                  onClick={handleAccept}
                  variant="default"
                  className="bg-white text-black hover:bg-white/90 font-medium px-6"
                >
                  Accept
                </Button>
                <Button 
                  onClick={handleDecline}
                  variant="outline"
                  className="border-white/10 text-white/60 hover:text-white hover:border-white/20 px-6"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
