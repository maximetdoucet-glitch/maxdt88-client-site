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
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Brands", href: "#target" },
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
          ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-8 w-1/3">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group py-2"
            >
              <span className={cn(
                "text-sm font-medium transition-colors duration-300",
                "text-[#9ca3af] group-hover:text-[#f4ebd0]"
              )}>
                {item.name}
              </span>
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 rounded-t-full" /* Thinner, neutral */
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "circOut" }}
              />
            </Link>
          ))}
        </div>

        <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 w-full md:w-auto">
          <Link href="/" className="flex items-center group">
            <span className="text-[#f4ebd0] font-black text-xl tracking-tight transition-transform duration-500 group-hover:scale-105">
              max<TextShimmer baseColor="#ffffff20" shimmerColor="#ffffff" className="font-black text-xl">.dt88</TextShimmer>
            </span>
          </Link>
        </div>

        {/* Right Nav */}
        <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
          <div className="flex items-center gap-6 mr-4">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  "text-[#9ca3af] group-hover:text-[#f4ebd0]"
                )}>
                  {item.name}
                </span>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 rounded-t-full" /* Thinner, neutral */
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                />
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="#contact">
              <ShimmerButton 
                shimmerColor="#ffffff"
                shimmerSize="0.1em"
                background="#0369a1"
                className="px-5 py-2 rounded-full text-[#f4ebd0] text-xs font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(3,105,161,0.2)] transition-all duration-300"
              >
                Book a call
              </ShimmerButton>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-[#f4ebd0]"
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
            className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3 group border-b border-white/5"
                >
                  <span className={cn(
                    "text-xl font-black tracking-tight transition-colors text-[#f4ebd0] group-hover:text-[#0369a1] uppercase"
                  )}>
                    {item.name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                </Link>
              ))}
              
              <div className="pt-4 flex flex-col gap-4">
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    shimmerSize="0.1em"
                    background="#0369a1"
                    className="w-full py-4 rounded-full text-[#f4ebd0] font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(3,105,161,0.15)]"
                  >
                    Book a call
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
