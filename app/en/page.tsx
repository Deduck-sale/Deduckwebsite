import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "De Duck Agency | Digital Marketing Agency in Thailand",
  description:
    "Full-service digital marketing agency in Thailand — Social Media Marketing, Production, and Branding for SME clients. Transparent monthly packages.",
  alternates: {
    canonical: "/en",
    languages: {
      "th-TH": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "De Duck Agency | Digital Marketing Agency in Thailand",
    description:
      "Full-service marketing — social media, production, branding for SME clients in Thailand.",
    locale: "en_US",
    url: `${SITE_URL}/en`,
  },
};

export default function Page() {
  return <HomePage />;
}
