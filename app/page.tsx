import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduckwebsite.vercel.app";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "th-TH": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "th_TH",
    url: SITE_URL,
  },
};

export default function Page() {
  return <HomePage />;
}
