import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ConsentAnalytics } from "@/components/consent-analytics";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, GOOGLE_SITE_VERIFICATION } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | max.dt88" },
  description: SITE_DESCRIPTION,
  keywords: ["short-form video editor", "YouTube video editor", "video editor for hire", "Shorts editor", "Reels editor", "TikTok editor", "long-form video editor"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "max.dt88",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "max.dt88" },
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#max`,
      name: "Max Doucet",
      alternateName: "max.dt88",
      jobTitle: "Video Editor",
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      email: "max.doucet@icloud.com",
      address: { "@type": "PostalAddress", addressCountry: "NL" },
      sameAs: [
        "https://www.tiktok.com/@max.dt88",
        "https://www.instagram.com/max.dt88",
        "https://www.youtube.com/@Max.DT88",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "max.dt88",
      publisher: { "@id": `${SITE_URL}/#max` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={cn(
        inter.className,
        inter.variable,
        interTight.variable,
        "antialiased min-h-screen"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          {children}
          <CookieConsent />
          <ConsentAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
