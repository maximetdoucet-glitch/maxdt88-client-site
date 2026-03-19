"use client";

import React from 'react';

/**
 * A mesmerizing dance animation component that displays a dynamic text effect
 * with layered CSS animations and a dark theme.
 */
const DanceTextAnimation = ({ text = "DANCE TEXT", className = "" }: { text?: string, className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none min-h-[150px] md:min-h-[250px] ${className}`}>
      <style>
        {`
          @keyframes dance {
            0%, 100% { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1) rotate(0deg);
              text-shadow: 0 0 10px rgba(3, 105, 161, 0.8), 0 0 20px rgba(14, 165, 233, 0.6); 
            }
            25% { 
              opacity: 0.7; 
              transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
              text-shadow: 0 0 15px rgba(3, 105, 161, 0.9), 0 0 25px rgba(14, 165, 233, 0.7); 
            }
            50% { 
              opacity: 0.9; 
              transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
              text-shadow: 0 0 8px rgba(3, 105, 161, 0.7), 0 0 15px rgba(14, 165, 233, 0.5); 
            }
            75% { 
              opacity: 0.8; 
              transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
              text-shadow: 0 0 12px rgba(3, 105, 161, 0.8), 0 0 22px rgba(14, 165, 233, 0.6); 
            }
          }

          .dance-layer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: 950;
            mix-blend-mode: screen;
            animation: dance 2s infinite;
            text-wrap: balance;
            text-align: center;
            width: 100%;
            will-change: transform, opacity;
            letter-spacing: -0.05em;
            line-height: 1;
          }

          .dance-layer-1 {
            color: #0369a1;
            animation-delay: 0s;
            z-index: 1;
          }

          .dance-layer-2 {
            color: #0ea5e9;
            animation-delay: 0.3s;
            animation-duration: 2.2s;
            z-index: 2;
          }

          .dance-layer-3 {
            color: #38bdf8;
            animation-delay: 0.6s;
            animation-duration: 2.4s;
            z-index: 3;
          }
        `}
      </style>

      <div className="dance-animation relative w-full h-full">
        <div className="dance-layer dance-layer-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{text}</div>
        <div className="dance-layer dance-layer-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{text}</div>
        <div className="dance-layer dance-layer-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{text}</div>
      </div>
    </div>
  );
};

export default DanceTextAnimation;
