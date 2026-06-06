import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetail, { type ServiceSlug } from "@/components/ServiceDetail";
import { messages } from "@/lib/i18n/messages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

const VALID_SLUGS: ServiceSlug[] = ["social-media", "production", "branding"];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as ServiceSlug)) return {};
  const en = messages.en.services_page.items[slug as ServiceSlug];
  return {
    title: `${en.name} | De Duck Agency`,
    description: en.description,
    alternates: {
      canonical: `/en/services/${slug}`,
      languages: {
        "th-TH": `/services/${slug}`,
        "en-US": `/en/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      title: `${en.name} — De Duck Agency`,
      description: en.tagline,
      locale: "en_US",
      url: `${SITE_URL}/en/services/${slug}`,
    },
  };
}

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as ServiceSlug)) notFound();
  return <ServiceDetail slug={slug as ServiceSlug} />;
}
