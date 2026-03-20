"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  RefreshCw, 
  AlignLeft, 
  Maximize2, 
  Check,
  Zap,
  PenTool
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const SKILLS = [
  {
    id: "refine",
    name: "Refine Protocol",
    description: "Polishes terminology and enhances technical clarity.",
    icon: Sparkles,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: "summarize",
    name: "Summarize",
    description: "Extracts core objectives and key metrics.",
    icon: AlignLeft,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    id: "expand",
    name: "Deep Expand",
    description: "Broadens the scope with evidence-based details.",
    icon: Maximize2,
    color: "text-[#1d4ed8]",
    bg: "bg-[#1d4ed8]/10"
  }
];

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [activeTab, setActiveTab] = useState<string>("refine");
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleAction = () => {
    if (!inputValue) return;
    setIsProcessing(true);
    setResult(null);
    
    // Simulate AI processing inspired by Refly's flow
    setTimeout(() => {
      setIsProcessing(false);
      setResult(`Optimized ${activeTab} content for: "${inputValue.substring(0, 20)}..."`);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm z-[200]"
          />

          {/* Assistant Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#f4ebd0] shadow-2xl z-[201] border-l border-[#0a0a0a]/5 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#0a0a0a]/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-[#1d4ed8]" />
                </div>
                <div>
                  <h3 className="font-black text-[#0a0a0a] tracking-tight">Writing Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] animate-pulse" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[#0a0a0a]/40">Refly Engine v1.0</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#0a0a0a]/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#0a0a0a]/40" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Skill Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {SKILLS.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setActiveTab(skill.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 border",
                      activeTab === skill.id 
                        ? "bg-white border-[#1d4ed8]/20 shadow-sm" 
                        : "bg-transparent border-transparent hover:bg-[#0a0a0a]/5"
                    )}
                  >
                    <div className={cn("p-2 rounded-xl", skill.bg, skill.color)}>
                      <skill.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#0a0a0a]/60">
                      {skill.id}
                    </span>
                  </button>
                ))}
              </div>

              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-[#0a0a0a]/40">
                    Source Protocol
                  </label>
                  {inputValue && (
                     <button 
                      onClick={() => setInputValue("")}
                      className="text-[0.6rem] font-bold text-[#1d4ed8] uppercase tracking-widest"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Paste your protocol thoughts here..."
                  className="w-full h-32 bg-white/50 border border-[#0a0a0a]/5 rounded-2xl p-4 text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/20 focus:outline-none focus:border-[#1d4ed8]/30 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Action Button */}
              <button
                disabled={!inputValue || isProcessing}
                onClick={handleAction}
                className={cn(
                  "w-full py-4 rounded-full flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-all duration-300",
                  !inputValue 
                    ? "bg-[#0a0a0a]/5 text-[#0a0a0a]/20 cursor-not-allowed"
                    : isProcessing
                    ? "bg-[#0a0a0a] text-[#f4ebd0] opacity-80"
                    : "bg-[#0a0a0a] text-[#f4ebd0] hover:bg-[#1d4ed8] shadow-lg shadow-[#1d4ed8]/10"
                )}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Execute {activeTab}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Results Section */}
              {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-[#1d4ed8]/5 border border-[#1d4ed8]/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-[#1d4ed8] rounded-lg flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#f4ebd0]" />
                      </div>
                      <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#1d4ed8]">Optimization Complete</span>
                    </div>
                    <p className="text-sm text-[#0a0a0a]/80 leading-relaxed font-medium">
                      {result}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-[#0a0a0a]/5">
              <div className="flex items-center gap-4 text-[#0a0a0a]/30">
                <Zap className="w-4 h-4" />
                <p className="text-[0.65rem] font-medium leading-tight">
                  Powered by the Refly writing engine. Technical protocols are evidence-based and architecture-verified.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
