"use client";
import React, { useRef, useEffect, useState } from "react";

interface MagneticGridProps {
  className?: string;
  color?: string;
  dotSize?: number;
  gap?: number;
}

export const MagneticGrid: React.FC<MagneticGridProps> = ({
  className = "",
  color = "#f4ebd0",
  dotSize = 1.0,
  gap = 42,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    let scanLineY = 0;

    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      angle: number;
      size: number;
      color: string;
      opacity: number;
      ease: number;
      depth: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.angle = 0;
        this.depth = 0.5 + Math.random() * 0.5;
        this.size = dotSize * this.depth;
        this.color = color;
        this.opacity = 0.05 + this.depth * 0.05;
        this.ease = (0.04 + Math.random() * 0.06) * this.depth;
      }

      update(mx: number, my: number, sy: number) {
        const dx = mx - this.x;
        const dy = my - this.y;
        this.angle = Math.atan2(dy, dx);
        
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300 * this.depth;
        
        let force = 0;
        if (dist < maxDist) {
          force = (maxDist - dist) / maxDist;
          this.x = this.originX - Math.cos(this.angle) * force * 30 * this.depth;
          this.y = this.originY - Math.sin(this.angle) * force * 30 * this.depth;
        } else {
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
        }

        const sDist = Math.abs(this.y - sy);
        const sMaxDist = 150;
        let sForce = 0;
        if (sDist < sMaxDist) {
            sForce = (sMaxDist - sDist) / sMaxDist;
        }

        const totalForce = Math.max(force, sForce * 0.4);
        this.opacity = (0.05 + this.depth * 0.05) + (totalForce * 0.7);
        this.size = (dotSize * this.depth) + totalForce * 2.5;
        
        if (totalForce > 0.4) {
          this.color = "#0ea5e9";
        } else if (sForce > 0.2) {
          this.color = "#1d4ed8";
        } else {
          this.color = color;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1 * this.depth;
        
        const length = this.size * 3.5;
        
        // Crosshair
        ctx.beginPath();
        ctx.moveTo(-length, 0);
        ctx.lineTo(length, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -length * 0.6);
        ctx.lineTo(0, length * 0.6);
        ctx.stroke();
        
        // Core glow
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // High-intensity center
        if (this.opacity > 0.4) {
          ctx.globalAlpha = 1.0;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(0, 0, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      particles = [];

      for (let x = gap / 2; x < canvas.offsetWidth; x += gap) {
        for (let y = gap / 2; y < canvas.offsetHeight; y += gap) {
          particles.push(new Particle(x, y));
        }
      }
    };

    let rafId: number;
    const animate = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      scanLineY += 1.5;
      if (scanLineY > canvas.offsetHeight) scanLineY = 0;

      // Subtle background starfield texture
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = color;
      for(let i=0; i<40; i++) {
          const sx = (i * 137) % canvas.offsetWidth;
          const sy = (i * 157) % canvas.offsetHeight;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.8, 0, Math.PI*2);
          ctx.fill();
      }

      particles.forEach((p) => {
        p.update(mouseRef.current.x, mouseRef.current.y, scanLineY);
        p.draw(ctx);
      });
      
      const grad = ctx.createLinearGradient(0, scanLineY - 120, 0, scanLineY + 120);
      grad.addColorStop(0, "rgba(14, 165, 233, 0)");
      grad.addColorStop(0.5, "rgba(14, 165, 233, 0.04)");
      grad.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanLineY - 120, canvas.offsetWidth, 240);

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [color, dotSize, gap, isVisible, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block bg-transparent ${className}`}
    />
  );
};

export default MagneticGrid;
