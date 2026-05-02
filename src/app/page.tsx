"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { PortfolioHome } from "@/components/sections/portfolio-home";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 200);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen 
            key="loader" 
            onComplete={handleLoadComplete} 
          />
        )}
      </AnimatePresence>

      <main id="main-content-root" className="relative bg-black min-h-screen text-white overflow-x-hidden">
        <Navbar />
        <PortfolioHome showContent={showContent} />
      </main>
    </>
  );
}
