import Link from "next/link";
import LiquidBackground from "@/components/LiquidBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { getPackages, getPortfolio } from "@/lib/data";
import {
  fallbackMarketingPackages,
  fallbackProductionPackages,
  fallbackPortfolio,
} from "@/lib/fallback-data";
import type { PortfolioCategory } from "@/lib/supabase/types";
import ServiceDetailContent from "@/components/ServiceDetailContent";

export type ServiceSlug = "social-media" | "production" | "branding";

const RELATED_CATEGORIES: Record<ServiceSlug, PortfolioCategory[]> = {
  "social-media": ["graphic", "beverage", "food"],
  production: ["food", "beverage", "product"],
  branding: ["graphic", "product"],
};

const RELATED_PACKAGE_SECTION: Record<
  ServiceSlug,
  "marketing" | "production"
> = {
  "social-media": "marketing",
  production: "production",
  branding: "production",
};

interface Props {
  slug: ServiceSlug;
}

export default async function ServiceDetail({ slug }: Props) {
  const [marketingDb, productionDb, portfolioDb] = await Promise.all([
    getPackages("marketing"),
    getPackages("production"),
    getPortfolio(),
  ]);
  const marketing = marketingDb.length > 0 ? marketingDb : fallbackMarketingPackages;
  const production = productionDb.length > 0 ? productionDb : fallbackProductionPackages;
  const portfolio = portfolioDb.length > 0 ? portfolioDb : fallbackPortfolio;

  const relatedPackages =
    RELATED_PACKAGE_SECTION[slug] === "marketing" ? marketing : production;
  const relatedWorks = portfolio
    .filter((p) => RELATED_CATEGORIES[slug].includes(p.category))
    .slice(0, 8);

  return (
    <>
      <LiquidBackground />
      <Navbar />
      <ServiceDetailContent
        slug={slug}
        relatedPackages={relatedPackages}
        relatedWorks={relatedWorks}
      />
      <Footer />
      <FloatingContact />
    </>
  );
}
