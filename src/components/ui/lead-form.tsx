"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { track } from "@vercel/analytics";

const FALLBACK_EMAIL = "max.doucet@icloud.com";
// Web3Forms keys are public by design (client-submitted, server-side spam filtering).
// Env var overrides hardcoded default for environment-specific keys if needed.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "dab44c9c-1e28-4c87-83e9-070871cd0306";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const inputBase =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#2196f3]/60 focus:bg-white/[0.06] transition-all duration-200";

  const buildMailto = () => {
    const subject = encodeURIComponent(`New inquiry · ${email}`);
    const body = encodeURIComponent(`Email: ${email}\n\nGoal:\n${goal}`);
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
      setError("One line about what you're building.");
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
            subject: `New inquiry · ${email}`,
            from_name: email,
            email,
            goal,
            botcheck: "",
          }),
        });
        const data = await res.json();
        if (data.success) {
          track("lead_submit", { source: "form_web3forms" });
          setStatus("success");
          return;
        }
        throw new Error(data.message || "Submission failed");
      } catch {
        // Fall through to mailto fallback
      }
    }

    track("lead_submit", { source: "form_mailto_fallback" });
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
          I&apos;ll get back to you within 24 hours. If your project&apos;s a fit,
          your first edit is on me.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <input
        type="email"
        inputMode="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputBase}
        required
        autoComplete="email"
      />

      <input
        type="text"
        placeholder="What are you building? (one line)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className={inputBase}
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
