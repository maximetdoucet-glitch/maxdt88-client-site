"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionValueEvent } from "framer-motion";

interface NeuralBackgroundProps {
  className?: string;
  color?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
  scrollProgress?: any; // Accept MotionValue
}

export default function NeuralBackground({
  className,
  color = "#2196f3", 
  trailOpacity = 0.025, 
  particleCount = 200, 
  speed = 1.2,
  scrollProgress,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(0);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    scrollRef.current = latest as number;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    let clickPulse = { x: -1000, y: -1000, strength: 0 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      px: number;
      py: number;
      age: number;
      life: number;
      currentColor: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.px = this.x;
        this.py = this.y;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100; 
        this.currentColor = color;
      }

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        
        this.vx += Math.cos(angle) * 0.22 * speed;
        this.vy += Math.sin(angle) * 0.22 * speed;
        
        this.vx += (Math.random() - 0.5) * 0.08;
        this.vy += (Math.random() - 0.5) * 0.08;
        
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 300;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx += dx * force * 0.04; 
          this.vy += dy * force * 0.04;
        }

        if (clickPulse.strength > 0) {
          const cdx = clickPulse.x - this.x;
          const cdy = clickPulse.y - this.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const pulseRadius = 300;
          if (cdist < pulseRadius) {
            const pForce = (pulseRadius - cdist) / pulseRadius;
            this.vx -= (cdx / cdist) * pForce * clickPulse.strength;
            this.vy -= (cdy / cdist) * pForce * clickPulse.strength;
          }
        }

        this.px = this.x;
        this.py = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;

        this.age++;
        if (this.age > this.life) {
          this.reset();
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.px = this.x;
        this.py = this.y;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = color;
        context.lineWidth = 1.2;
        context.lineCap = "round";
        const alpha = (1 - Math.abs((this.age / this.life) - 0.5) * 2) * 0.7;
        context.globalAlpha = alpha;
        // Prevent drawing lines when particle wraps around
        const dx = Math.abs(this.x - this.px);
        const dy = Math.abs(this.y - this.py);
        if (dx < 100 && dy < 100) {
          context.beginPath();
          context.moveTo(this.px, this.py);
          context.lineTo(this.x, this.y);
          context.stroke();
        }
      }
    }

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); 
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      particles = [];
      const actualParticleCount = Math.min(particleCount, 800); 
      for (let i = 0; i < actualParticleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, " + trailOpacity + ")";
      ctx.fillRect(0, 0, width, height);

      if (clickPulse.strength > 0) {
        clickPulse.strength *= 0.95;
        if (clickPulse.strength < 0.1) clickPulse.strength = 0;
      }

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      clickPulse.x = e.clientX - rect.left;
      clickPulse.y = e.clientY - rect.top;
      clickPulse.strength = 15;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed, isVisible, scrollProgress]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full bg-black overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
