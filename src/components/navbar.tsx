"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { TextShimmer } from "./ui/text-shimmer";
import { ShimmerButton } from "./ui/shimmer-button";

const navItems = [
  { name: "Services", href: "/#services" },
  { name: "About Me", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
        scrolled
          ? "bg-black/50 backdrop-blur-xl py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        
        <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 w-full md:w-auto">
          <Link href="/" className="flex items-center group">
            <span className="text-white font-tight font-semibold text-xl tracking-tight transition-transform duration-500 group-hover:scale-105">
              max<TextShimmer baseColor="#2196f3" shimmerColor="#ffffff" className="font-tight font-semibold text-xl" duration={2}>.dt88</TextShimmer>
            </span>
          </Link>
        </div>

        {/* Right Nav */}
        <div className="hidden md:flex items-center justify-end gap-4 w-full">
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className={cn(
                  "text-sm font-sans font-normal transition-colors duration-300",
                  "text-white/80 group-hover:text-white"
                )}>
                  {item.name}
                </span>
                <motion.div 
                   className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 rounded-t-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                />
              </Link>
            ))}
          </div>
          
          <Link href="mailto:max.doucet@icloud.com?subject=Content%20Inquiry&body=Hi%20Max%2C%0A%0AI%20came%20across%20your%20work%20and%20I%E2%80%99m%20interested%20in%20working%20together.%0A%0AHere%E2%80%99s%20what%20I%E2%80%99m%20looking%20for%3A%0A%0AName%3A%0APlatform%20(TikTok%20%2F%20YouTube%20%2F%20Brand)%3A%0AType%20of%20content%3A%0AGoal%3A">
            <ShimmerButton 
              shimmerColor="#ffffff"
              shimmerSize="0.05em"
              background="#2196f3"
              className="px-6 py-2 rounded-full text-white text-[10px] font-sans font-medium uppercase tracking-widest transition-all duration-300 glow-button"
            >
              Share your vision
            </ShimmerButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/5 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-10 flex flex-col gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 group border-b border-white/5"
                >
                  <span className={cn(
                    "text-2xl font-tight font-semibold tracking-tight transition-colors text-white/80 group-hover:text-white uppercase"
                  )}>
                    {item.name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                </Link>
              ))}
              
              <div className="pt-6 flex flex-col gap-4">
                <Link
                  href="mailto:max.doucet@icloud.com?subject=Content%20Inquiry&body=Hi%20Max%2C%0A%0AI%20came%20across%20your%20work%20and%20I%E2%80%99m%20interested%20in%20working%20together.%0A%0AHere%E2%80%99s%20what%20I%E2%80%99m%20looking%20for%3A%0A%0AName%3A%0APlatform%20(TikTok%20%2F%20YouTube%20%2F%20Brand)%3A%0AType%20of%20content%3A%0AGoal%3A"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    shimmerSize="0.1em"
                    background="#2196f3"
                    className="w-full py-4 rounded-full text-white font-sans font-medium uppercase tracking-widest text-[10px] glow-button"
                  >
                    Share your vision
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
