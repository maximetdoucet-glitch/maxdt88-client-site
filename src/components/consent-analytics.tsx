"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Vercel Analytics is cookieless; events are still dropped for visitors who decline.
function declined() {
  try {
    return localStorage.getItem("cookie-consent") === "declined";
  } catch {
    return false;
  }
}

export function ConsentAnalytics() {
  return (
    <>
      <Analytics beforeSend={(event) => (declined() ? null : event)} />
      <SpeedInsights beforeSend={(event) => (declined() ? null : event)} />
    </>
  );
}
