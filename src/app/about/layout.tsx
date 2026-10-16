import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Max is a Franco-American short-form video editor based in the Netherlands, editing for creators and brands. Long-form too.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
