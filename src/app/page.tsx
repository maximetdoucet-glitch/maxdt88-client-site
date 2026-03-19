"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { DesktopHome } from "@/components/sections/desktop-home";
import { MobileLandingV11 } from "@/components/sections/mobile-landing-v11";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  // Default to null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 200);
  }, []);

  // Absolute separation logic
  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <style jsx global>{`
        @media (max-width: 1023px) {
          #desktop-viewport-container { display: none !important; }
        }
        @media (min-width: 1024px) {
          #mobile-viewport-container { display: none !important; }
        }
      `}</style>

      <main id="main-content-root" className="relative bg-black min-h-screen text-white overflow-x-hidden">
        <Navbar />

        {/* 
           STRICT ISOLATION V11 (Copy Lock):
           We use both JS-based mounting AND CSS-based display:none 
           to definitively kill duplication.
        */}
        
        {isMobile === true && (
          <div key="mobile" id="mobile-viewport-container">
            <MobileLandingV11 showContent={showContent} />
          </div>
        )}

        {isMobile === false && (
          <div key="desktop" id="desktop-viewport-container">
            <DesktopHome showContent={showContent} />
          </div>
        )}

        {/* Fallback for system delay */}
        {isMobile === null && (
          <div className="fixed inset-0 bg-black z-50 pointer-events-none" />
        )}
      </main>
    </>
  );
}
