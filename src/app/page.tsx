import { SiteNav, SiteFooter } from "@/components/site/chrome";
import { PortfolioV1 } from "@/components/sections/portfolio-v1";

export default function Home() {
  return (
    <main className="of-page min-h-screen bg-of-bg text-of-dark overflow-x-hidden">
      <SiteNav current="work" />
      <PortfolioV1 />
      <SiteFooter />
    </main>
  );
}
