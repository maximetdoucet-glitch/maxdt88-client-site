"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const FALLBACK_EMAIL = "max.doucet@icloud.com";
// Web3Forms keys are public by design (client-submitted, server-side spam filtering).
// Env var overrides hardcoded default for environment-specific keys if needed.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "dab44c9c-1e28-4c87-83e9-070871cd0306";

type Status = "idle" | "submitting" | "success" | "error";

interface LeadFormProps {
  variant?: "dark" | "light";
}

export function LeadForm({ variant = "dark" }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const inputBase =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#2196f3]/60 focus:bg-white/[0.06] transition-all duration-200";

  const buildMailto = () => {
    const subject = encodeURIComponent(
      `New inquiry — ${name || "(no name)"} • ${type || "creator"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nType: ${type}\n\nGoal:\n${goal}`
    );
    return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!goal.trim()) {
      setError("Tell me one line about what you want to build.");
      return;
    }

    setStatus("submitting");

    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New inquiry — ${name || "(no name)"} • ${type || "creator"}`,
            from_name: name || "max.dt88 site",
            email,
            name,
            type,
            goal,
            botcheck: "",
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          return;
        }
        throw new Error(data.message || "Submission failed");
      } catch {
        // Fall through to mailto fallback
      }
    }

    // Fallback: open mail client with prefilled message
    if (typeof window !== "undefined") {
      window.location.href = buildMailto();
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#2196f3]/30 bg-[#2196f3]/[0.06] p-8 text-center space-y-4"
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-[#2196f3]/20 flex items-center justify-center">
          <Check className="w-7 h-7 text-[#2196f3]" />
        </div>
        <h3 className="text-2xl font-semibold text-white">Got it.</h3>
        <p className="text-base text-white/70 max-w-md mx-auto">
          I&apos;ll get back to you within 24 hours with next steps. If your project is
          a fit, your first edit is on me.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          inputMode="text"
          placeholder="Name or @handle"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
          autoComplete="name"
        />
        <input
          type="email"
          inputMode="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
          required
          autoComplete="email"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Creator", "Athlete", "Brand"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setType(opt)}
            className={`py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
              type === opt
                ? "bg-[#2196f3] border-[#2196f3] text-white"
                : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <textarea
        placeholder="What are you building? (one line is enough)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        rows={3}
        className={`${inputBase} resize-none`}
        required
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-400 px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full mt-2"
      >
        <ShimmerButton
          background="#2196f3"
          className="w-full px-6 py-4 rounded-xl text-white text-base font-semibold tracking-tight glow-button disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Claim my free edit <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </ShimmerButton>
      </button>

      <p className="text-xs text-white/45 text-center pt-1">
        No spam. Reply within 24 hours.
      </p>
    </form>
  );
}
