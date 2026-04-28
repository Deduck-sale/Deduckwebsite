import LiquidBackground from "@/components/LiquidBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Reels from "@/components/Reels";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { getPackages, getPortfolio, getReels } from "@/lib/data";
import {
  fallbackMarketingPackages,
  fallbackProductionPackages,
  fallbackPortfolio,
  fallbackReels,
} from "@/lib/fallback-data";

// Re-generate static page every 60s, or on-demand via revalidatePath after admin edits
export const revalidate = 60;

export default async function HomePage() {
  const [marketingDb, productionDb, portfolioDb, reelsDb] = await Promise.all([
    getPackages("marketing"),
    getPackages("production"),
    getPortfolio(),
    getReels(),
  ]);

  const marketing = marketingDb.length > 0 ? marketingDb : fallbackMarketingPackages;
  const production = productionDb.length > 0 ? productionDb : fallbackProductionPackages;
  const portfolio = portfolioDb.length > 0 ? portfolioDb : fallbackPortfolio;
  const reels = reelsDb.length > 0 ? reelsDb : fallbackReels;

  return (
    <>
      <LiquidBackground />
      <Navbar />
      <Hero />
      <Reels reels={reels} />
      <Services />
      <Portfolio items={portfolio} />
      <Pricing marketing={marketing} production={production} />
      <Footer />
    </>
  );
}
