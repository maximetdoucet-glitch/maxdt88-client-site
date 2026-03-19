"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Brain, 
  Activity, 
  Target, 
  ShieldCheck, 
  Flame, 
  Moon, 
  Dumbbell,
  PenTool,
  Camera,
  Play
} from "lucide-react";
import { SkillCard } from "./skill-card";
import { cn } from "@/lib/utils";

const protocols = [
  {
    category: "Physical",
    phase: "Phase 1",
    title: "Foundation: The Primal Shift",
    description: "Re-establish the relationship with your body. Focus on explosive compound movements and mobility anchors. Zero equipment, maximum intent.",
    icon: Flame,
    difficulty: "Beginner" as const,
    tags: ["Explosive", "Bodyweight", "Mobility"],
  },
  {
    category: "Physical",
    phase: "Phase 2",
    title: "Hypertrophy of Presence",
    description: "Volume-based progressions to build the frame. Every rep is a lesson in control. This is where the physical shift becomes visible to others.",
    icon: Dumbbell,
    difficulty: "Intermediate" as const,
    tags: ["Volume", "Density", "Hypertrophy"],
  },
  {
    category: "Mental",
    phase: "Week 1-4",
    title: "The Silent Commander",
    description: "Morning protocol to calibrate the prefrontal cortex. Dopamine detoxing and focus anchors. Calmness in the chaos.",
    icon: Brain,
    difficulty: "Beginner" as const,
    tags: ["Focus", "Dopamine", "Morning"],
  },
  {
    category: "Mental",
    phase: "Week 5-8",
    title: "Execution Under Pressure",
    description: "Advanced cognitive stressors. Learning to maintain the flow state when the noise is loudest. The internal shift is now permanent.",
    icon: Target,
    difficulty: "Advanced" as const,
    tags: ["Flow State", "Stress", "Execution"],
  },
  {
    category: "Biohacking",
    phase: "Nights",
    title: "Deep Recovery Architecture",
    description: "Protocol for non-negotiable sleep quality and circadian alignment. Recovery is the only way to sustain the high-performance output.",
    icon: Moon,
    difficulty: "Intermediate" as const,
    tags: ["Recovery", "Sleep", "Biohacking"],
  },
  {
    category: "Biohacking",
    phase: "Mornings",
    title: "Metabolic Ignition",
    description: "Optimizing your biological engine. Focused on cold exposure, sunlight timing, and metabolic flexibility.",
    icon: Zap,
    difficulty: "Intermediate" as const,
    tags: ["Cold Exposure", "Metabolic", "Morning"],
  },
  {
    category: "Writing",
    phase: "Skills",
    title: "AI Writing Protocol",
    description: "Advanced prompt engineering and documentation framework. Derived from Refly's writing agents.",
    icon: PenTool,
    difficulty: "Advanced" as const,
    tags: ["Refine", "Summarize", "Expand"],
  },
  {
    category: "DevOps",
    phase: "Infrastructure",
    title: "Cluster Architecture",
    description: "Deep dive into the Kubernetes control plane and node communication. A blueprint for resilient infrastructure.",
    icon: ShieldCheck,
    difficulty: "Advanced" as const,
    tags: ["Control Plane", "Nodes", "Architecture"],
  },
  {
    category: "DevOps",
    phase: "Orchestration",
    title: "Workload Orchestration",
    description: "Mastering pods, services, and networking. The protocol for scaling distributed applications.",
    icon: Activity,
    difficulty: "Advanced" as const,
    tags: ["Pods", "Services", "Orchestration"],
  },
  {
    category: "Frontend",
    phase: "Architecture",
    title: "Performance Architecture",
    description: "Optimizing critical rendering paths and asset delivery. The H5BP standard for high-speed delivery.",
    icon: Zap,
    difficulty: "Advanced" as const,
    tags: ["Critical Path", "Optimization", "Speed"],
  },
  {
    category: "Frontend",
    phase: "Resilience",
    title: "Cross-Browser Resilience",
    description: "Ensuring visual and functional stability across all modern and legacy browsers. Building for the real web.",
    icon: ShieldCheck,
    difficulty: "Advanced" as const,
    tags: ["Accessibility", "Fallback", "Standards"],
  },
  {
    category: "Imaging",
    phase: "Rendering",
    title: "DOM Snapshot Protocol",
    description: "Capturing the exact state of the DOM and rendering it to a high-fidelity canvas. The standard for web visual persistence.",
    icon: Camera,
    difficulty: "Advanced" as const,
    tags: ["Snapshot", "DOM-to-Canvas", "Persistence"],
  },
  {
    category: "Imaging",
    phase: "Engine",
    title: "Visual Rendering Engine",
    description: "Deep dive into the rendering logic that mimics browser painting. Building a virtual viewport.",
    icon: Zap,
    difficulty: "Advanced" as const,
    tags: ["Painting", "Virtual Viewport", "Logic"],
  },
  {
    category: "Web Standards",
    phase: "Architecture",
    title: "Living Standard Philosophy",
    description: "Mastering the shift from versioned snapshots to a continuously evolving, interoperable web platform.",
    icon: ShieldCheck,
    difficulty: "Advanced" as const,
    tags: ["Standardization", "Living Spec", "Runtime"],
  },
  {
    category: "Web Standards",
    phase: "Structure",
    title: "Semantic Structure Protocol",
    description: "Establishing structural integrity using native HTML sectioning and semantic categorization.",
    icon: Target,
    difficulty: "Intermediate" as const,
    tags: ["Semantics", "Accessibility", "AEO"],
  },
  {
    category: "Cinematic",
    phase: "Sequencing",
    title: "Cinematic Sequencing Protocol",
    description: "Structuring information in non-linear, high-impact 2D grids for professional slide delivery.",
    icon: Play,
    difficulty: "Intermediate" as const,
    tags: ["2D Navigation", "Fragments", "Attention"],
  },
  {
    category: "Cinematic",
    phase: "Animation",
    title: "Auto-Animate Blueprint",
    description: "State-transition logic for high-fidelity element morphing and property interpolation.",
    icon: Zap,
    difficulty: "Advanced" as const,
    tags: ["Transitions", "Morphing", "Performance"],
  },
];

const categories = ["All", "Physical", "Mental", "Biohacking", "Writing", "DevOps", "Frontend", "Imaging", "Web Standards", "Cinematic"];

export function ProtocolBazaar() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProtocols = protocols.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "relative px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300",
              activeCategory === category
                ? "text-[#0a0a0a]"
                : "text-[#0a0a0a]/40 hover:text-[#0a0a0a]"
            )}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-[#0a0a0a]/5 border border-[#0369a1]/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Protocol Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProtocols.map((protocol) => (
            <motion.div
              layout
              key={protocol.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <SkillCard {...protocol} aria-label={protocol.title} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
