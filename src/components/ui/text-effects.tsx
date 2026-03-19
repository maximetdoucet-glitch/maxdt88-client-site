"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function SplitChars({ text, className, delay = 0.2 }: { text: string; className?: string; delay?: number }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.text-split-char');
    gsap.fromTo(chars, 
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out", delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block text-split-char" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll('.word-fade');
    gsap.fromTo(words, { opacity: 0, filter: "blur(8px)" }, {
      opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.05, ease: "power2.out", delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block word-fade pointer-events-none">{word}</span>
          {i < text.split(" ").length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
}
