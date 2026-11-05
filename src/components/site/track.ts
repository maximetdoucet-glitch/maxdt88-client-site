import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends to Vercel (cookieless) and to GA4 when the visitor accepted cookies (gtag only exists then).
// Never pass form contents here.
export function trackEvent(name: string, params: Record<string, string> = {}) {
  try {
    track(name, params);
  } catch {}
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params);
}
