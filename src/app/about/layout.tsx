import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Max is a Franco-American short-form video editor based in the Netherlands, editing for creators and brands. Long-form too.",
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about", siteName: "max.dt88", title: "About Max | max.dt88", description: "Max is a Franco-American short-form video editor based in the Netherlands, editing for creators and brands. Long-form too.", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "About Max | max.dt88", description: "Max is a Franco-American short-form video editor based in the Netherlands, editing for creators and brands. Long-form too." },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
