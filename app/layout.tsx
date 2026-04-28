import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deduck.th";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "De Duck Agency | Digital Marketing Agency",
    template: "%s | De Duck Agency",
  },
  description:
    "เดอ-ดัค-เอ-เจน-ซี่ — ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ. รับวางแผนการตลาดออนไลน์ Social Media, Production, Branding ครบวงจร",
  keywords: [
    "Digital Marketing Agency",
    "Deduck",
    "เดอดัค",
    "เอเจนซี่การตลาด",
    "รับทำการตลาดออนไลน์",
    "Social Media Marketing",
    "Production",
    "Branding",
    "ถ่ายภาพสินค้า",
    "ตัดต่อวิดีโอ",
    "Marketing Agency Thailand",
  ],
  authors: [{ name: "De Duck Agency" }],
  creator: "De Duck Agency",
  publisher: "Deduck Agency Co.,Ltd.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "De Duck Agency | Digital Marketing Agency",
    description: "ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ",
    url: SITE_URL,
    siteName: "De Duck Agency",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Duck Agency | Digital Marketing Agency",
    description: "ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`scroll-smooth ${prompt.variable}`}>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
