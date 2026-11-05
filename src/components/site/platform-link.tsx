"use client";

import { trackEvent } from "./track";

type Platform = "youtube" | "instagram" | "tiktok";
const names: Record<Platform, string> = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok" };

export function PlatformLink({ platform, href, title, context = "Watch on" }: { platform: Platform; href: string; title: string; context?: string }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-[14px] text-of-grey">
      <span>{context}</span>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${context} ${names[platform]}: ${title}`} title={`${context} ${names[platform]}: ${title}`} onClick={() => trackEvent("portfolio_post_click", { clip: title, platform })} className="platform-link">
        {/* Existing official platform SVG artwork. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/hero/icons/${platform}.svg`} width={23} height={23} alt="" />
      </a>
    </div>
  );
}
