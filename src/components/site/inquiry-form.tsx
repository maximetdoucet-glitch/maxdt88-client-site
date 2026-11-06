"use client";

import React, { useState } from "react";
import { EMAIL } from "./chrome";
import { trackEvent } from "./track";

// Web3Forms keys are public by design (client-submitted, server-side spam filtering).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "dab44c9c-1e28-4c87-83e9-070871cd0306";

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("botcheck")) return;
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const details = String(f.get("details") || "").trim();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        // Plain form data avoids a CORS preflight (Web3Forms documents FormData submits).
        body: (() => { f.set("access_key", WEB3FORMS_KEY); f.set("subject", `New inquiry from ${name}`); f.set("from_name", name); f.set("email", email); f.set("details", details); return f; })(),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      trackEvent("lead_submit", { source: "form" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="text-[18px] md:text-[24px] leading-[1.4] text-of-dark" role="status">
        Thanks, your message is in. I reply within 24 hours.
      </p>
    );
  }

  const field =
    "w-full rounded-none border-0 border-b border-of-grey bg-transparent px-0 py-3 text-[16px] md:text-[18px] text-of-dark placeholder:text-of-grey focus:border-of-dark focus:outline-none";

  return (
    <form action="https://api.web3forms.com/submit" method="POST" onSubmit={submit} className="space-y-6">
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} aria-label="Form key" />
      <input type="checkbox" name="botcheck" aria-label="Leave empty" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="block">
        <span className="sr-only">Name</span>
        <input name="name" required autoComplete="name" placeholder="Name" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
      </label>
      <label className="block">
        <span className="sr-only">Project details (optional)</span>
        <textarea name="details" rows={3} placeholder="Project details (optional)" className={`${field} resize-none`} />
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-of-dark px-7 py-3.5 text-[16px] md:text-[18px] text-of-bg transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-of-dark disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        {status === "error" && (
          <p className="text-[16px] text-of-dark" role="alert">
            That did not go through. Email me at{" "}
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
