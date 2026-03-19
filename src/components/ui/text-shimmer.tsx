'use client';
import React, { useMemo, type JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  baseColor?: string;
  shimmerColor?: string;
}

export const TextShimmer = React.memo(function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 3,
  spread = 2,
  baseColor = '#3b82f6',
  shimmerColor = '#ffffff',
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-clip-text text-transparent bg-[length:200%_100%] [background-repeat:repeat] px-[0.1em]',
        className
      )}
      initial={{ backgroundPosition: '0% center' }}
      animate={{ backgroundPosition: '-200% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={{
        backgroundImage: `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 40%, ${shimmerColor} 50%, ${baseColor} 60%, ${baseColor} 100%)`,
      }}
    >
      {children}
    </MotionComponent>
  );
});
