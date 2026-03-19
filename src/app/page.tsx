"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { PortfolioHome } from "@/components/sections/portfolio-home";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 200);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <main id="main-content-root" className="relative bg-black min-h-screen text-white overflow-x-hidden">
        <Navbar />
        
        <PortfolioHome showContent={showContent} />
      </main>
    </>
  );
}
