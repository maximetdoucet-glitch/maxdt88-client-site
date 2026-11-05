import type { Metadata } from "next";

const description =
  "Max is a Franco-American video editor in the Netherlands. Viewer-first short-form editing for creators and brands, built on 45M+ views of his own content.";

export const metadata: Metadata = {
  title: "About Max, Video Editor",
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about", siteName: "max.dt88", images: ["/opengraph-image"], title: "About Max, Video Editor | max.dt88", description, locale: "en_US" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], title: "About Max, Video Editor | max.dt88", description },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
