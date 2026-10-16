import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await readFile(join(process.cwd(), "src/assets/InterTight-SemiBold.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000000", color: "#ffffff", fontFamily: "Inter Tight", fontSize: 134, fontWeight: 600, letterSpacing: "-0.03em" }}>
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Inter Tight", data: font, weight: 600, style: "normal" }] }
  );
}
