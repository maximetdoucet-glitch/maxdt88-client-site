import { ImageResponse } from "next/og";

export const alt = "max.dt88, short-form video editor for creators and brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#000000", color: "#ffffff" }}>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 600, marginBottom: 36 }}>
          max<span style={{ color: "#2196f3" }}>.dt88</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Short-form video editor for creators and brands.
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,0.65)", marginTop: 32 }}>
          Long-form too. Send a reference, I match the style.
        </div>
      </div>
    ),
    size
  );
}
