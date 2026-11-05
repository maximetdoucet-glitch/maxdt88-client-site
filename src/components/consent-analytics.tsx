"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Public measurement ID.
// Max 2026-11-05: GA4 property G-CF9GEG390R (replaces G-RZ2ZTTT6B4). Fixed in code so a stale env var cannot override it.
const GA_ID = "G-CF9GEG390R";
// Vercel serves /_vercel/* only on its own hosting; locally those scripts 404.
const ON_VERCEL = !!process.env.NEXT_PUBLIC_VERCEL_ENV;

// Vercel Analytics is cookieless; events are still dropped for visitors who decline.
// GA4 sets cookies, so it loads only after "accepted" (stored or fired by the banner).
function read() {
  try {
    return localStorage.getItem("cookie-consent");
  } catch {
    return null;
  }
}

export function ConsentAnalytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(read() === "accepted");
    const on = (e: Event) => setAccepted((e as CustomEvent<string>).detail === "accepted");
    window.addEventListener("cookie-consent", on);
    return () => window.removeEventListener("cookie-consent", on);
  }, []);

  return (
    <>
      {ON_VERCEL && <Analytics beforeSend={(event) => (read() === "declined" ? null : event)} />}
      {ON_VERCEL && <SpeedInsights beforeSend={(event) => (read() === "declined" ? null : event)} />}
      {accepted && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
