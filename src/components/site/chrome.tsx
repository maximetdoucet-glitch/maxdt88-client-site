"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconBrandDiscord } from "@tabler/icons-react";
import { trackEvent } from "./track";

export const EMAIL = "maxime.t.doucet@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;
const DISCORD = "MaximeDoucet0536";

const link = "transition-colors duration-500 hover:text-of-dark";

export function SiteNav({ current }: { current?: "work" | "services" | "about" }) {
  const item = (key: string) => (current === key ? "text-of-dark" : "text-of-grey");
  return (
    <header className="px-5 md:px-[5vw] pt-5 pb-5 md:pt-10">
      <nav aria-label="Main" className="mx-auto max-w-[1296px] flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 text-[16px] md:text-[18px] leading-[22px]">
        <Link href="/" className="text-of-dark font-medium">max.dt88</Link>
        <ul className="flex gap-5 md:gap-8">
          <li><Link href="/#work" className={`${item("work")} ${link}`}>Work</Link></li>
          <li><Link href="/services" className={`${item("services")} ${link}`}>Services</Link></li>
          <li><Link href="/about" className={`${item("about")} ${link}`}>About Me</Link></li>
          <li>
            <a href={MAILTO} onClick={() => trackEvent("contact_mailto", { source: "nav" })} className={`text-of-dark ${link}`}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const [shown, setShown] = useState(false);
  const discord = async () => {
    setShown(true);
    try {
      await navigator.clipboard.writeText(DISCORD);
    } catch {}
    trackEvent("discord_copy");
  };
  const icon = "h-7 w-7 text-of-dark transition-colors duration-500 hover:text-of-grey";
  return (
    <footer className="px-5 md:px-[5vw] pt-[50px] md:pt-[150px] pb-[50px] text-[16px] md:text-[18px] leading-[25px]">
      <div className="mx-auto max-w-[1296px]">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-5">
              <a href="https://www.youtube.com/@Max.DT88" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><IconBrandYoutube className={icon} stroke={1.5} /></a>
              <a href="https://www.instagram.com/max.dt88" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconBrandInstagram className={icon} stroke={1.5} /></a>
              <a href="https://www.tiktok.com/@max.dt88" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><IconBrandTiktok className={icon} stroke={1.5} /></a>
              <button type="button" onClick={discord} aria-label={`Discord username ${DISCORD}, click to copy`}>
                <IconBrandDiscord className={icon} stroke={1.5} />
              </button>
            </div>
            <p className="mt-3 text-of-grey min-h-[25px]" aria-live="polite">
              {shown ? `Discord: ${DISCORD} (copied)` : ""}
            </p>
          </div>
          <div>
            <a href={MAILTO} onClick={() => trackEvent("contact_mailto", { source: "footer" })} className="text-of-dark underline underline-offset-4 decoration-of-grey">
              {EMAIL}
            </a>
            <p className="mt-2">
              <Link href="/privacy" className={`text-of-grey ${link}`}>Privacy and cookies</Link>
            </p>
          </div>
        </div>
        <p className="mt-[50px] text-of-dark font-medium text-[13vw] md:text-[6vw] leading-[1.4]">
          © 2026
          <br />
          max.dt88
        </p>
      </div>
    </footer>
  );
}
