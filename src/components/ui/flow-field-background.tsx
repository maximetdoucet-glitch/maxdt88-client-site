"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  color?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
}

export default function NeuralBackground({
  className,
  color = "#0369a1", 
  trailOpacity = 0.04,
  particleCount = 1000,
  speed = 1.3,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      age: number;
      life: number;
      currentColor: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100; 
        this.currentColor = color;
      }

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 200;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx += dx * force * 0.08; 
          this.vy += dy * force * 0.08;
          
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          const targetR = 14; 
          const targetG = 165;
          const targetB = 233;
          
          const curR = Math.round(r + (targetR - r) * force);
          const curG = Math.round(g + (targetG - g) * force);
          const curB = Math.round(b + (targetB - b) * force);
          this.currentColor = `rgb(${curR}, ${curG}, ${curB})`;
        } else {
          this.currentColor = color;
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
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.currentColor;
        const alpha = (1 - Math.abs((this.age / this.life) - 0.5) * 2) * 0.7;
        context.globalAlpha = alpha;
        context.fillRect(this.x, this.y, 1.4, 1.4);
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
      const actualParticleCount = Math.min(particleCount, 400); 
      for (let i = 0; i < actualParticleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 10, " + trailOpacity + ")";
      ctx.fillRect(0, 0, width, height);

      if (clickPulse.strength > 0) {
        clickPulse.strength *= 0.95;
        if (clickPulse.strength < 0.1) clickPulse.strength = 0;
      }

      // Add glow effect to all particles
      ctx.shadowBlur = 4;
      ctx.shadowColor = color;

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Reset shadowBlur for next frame's clear
      ctx.shadowBlur = 0;

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
  }, [color, trailOpacity, particleCount, speed, isVisible]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full bg-[#0a0a0a] overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
