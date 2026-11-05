import { SiteNav, SiteFooter } from "@/components/site/chrome";
import { HomeReel } from "@/components/sections/home-reel";

export default function Home() {
  return (
    <main className="of-page of-home min-h-screen bg-of-bg text-of-dark overflow-x-hidden">
      <SiteNav current="home" frame="reel" />
      <HomeReel />
      <SiteFooter frame="reel" />
    </main>
  );
}
