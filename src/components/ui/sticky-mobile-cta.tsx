"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandInstagram } from "@tabler/icons-react";
import { track } from "@vercel/analytics";

export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      const contact = document.getElementById("contact");
      const contactInView =
        contact &&
        contact.getBoundingClientRect().top < window.innerHeight - 100;
      // Show after they've scrolled past the hero, hide when contact form is visible
      setShow(y > 500 && !contactInView);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="md:hidden fixed bottom-3 left-3 right-3 z-[90] pointer-events-none"
        >
          <div className="pointer-events-auto rounded-full bg-black/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(33,150,243,0.5)] px-2 py-2 flex items-center gap-2">
            <Link
              href="https://ig.me/m/max.dt88"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_click", { source: "sticky_mobile_dm" })}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#2196f3] text-white text-sm font-semibold tracking-tight active:scale-[0.98] transition-transform"
            >
              <IconBrandInstagram className="w-4 h-4" />
              DM for your free edit
            </Link>
            <Link
              href="#contact"
              onClick={() => track("cta_click", { source: "sticky_mobile_form" })}
              className="px-3 py-3 rounded-full text-white/70 text-xs font-medium border border-white/10 active:scale-[0.98] transition-transform whitespace-nowrap"
            >
              Email
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
