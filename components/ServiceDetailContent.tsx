"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { Package, PortfolioItem } from "@/lib/supabase/types";
import type { Locale } from "@/lib/i18n/messages";
import type { ServiceSlug } from "./ServiceDetail";

interface Props {
  slug: ServiceSlug;
  relatedPackages: Package[];
  relatedWorks: PortfolioItem[];
}

function localizeStr(locale: Locale, th: string, en: string | null | undefined): string {
  if (locale === "en" && en && en.trim().length > 0) return en;
  return th;
}

export default function ServiceDetailContent({
  slug,
  relatedPackages,
  relatedWorks,
}: Props) {
  const { t, locale, pathFor } = useTranslation();
  const service = t.services_page.items[slug];
  const homePath = pathFor(locale);

  // JSON-LD: declare this page as a specific Service offered by the agency.
  const SITE_URL =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://deduckwebsite.vercel.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@type": "Organization", name: "De Duck Agency", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Thailand" },
    serviceType: service.name,
    offers: relatedPackages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "THB",
    })),
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <a
            href={homePath}
            className="inline-block text-sm text-gray-400 hover:text-deduck-yellow transition mb-6"
          >
            {t.services_page.back}
          </a>
          <div className="glass-card p-8 md:p-14">
            <span className="glass-panel text-deduck-yellow px-5 py-1.5 text-xs font-medium tracking-widest uppercase">
              {t.services.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-3 drop-shadow">
              {service.name}
            </h1>
            <p className="text-deduck-yellow text-xl md:text-2xl font-medium mb-6">
              {service.tagline}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-deduck-yellow to-transparent rounded-full mb-6" />
            <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light max-w-3xl">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`${homePath === "/" ? "" : homePath}#contact`}
                className="px-6 py-3 bg-deduck-yellow text-deduck-dark font-bold rounded-full hover:bg-yellow-400 transition shadow-[0_0_20px_rgba(255,208,0,0.3)]"
              >
                {t.services_page.contact_cta}
              </a>
              <a
                href={`${homePath === "/" ? "" : homePath}#pricing`}
                className="px-6 py-3 rounded-full border border-deduck-yellow/50 text-deduck-yellow font-medium hover:bg-deduck-yellow hover:text-deduck-dark transition backdrop-blur-md bg-black/20"
              >
                {t.pricing.title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.sub_services.map((item, i) => (
              <div
                key={i}
                className="glass-card p-5 flex items-start gap-4"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-deduck-yellow/20 border border-deduck-yellow/40 text-deduck-yellow flex items-center justify-center font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-gray-200 leading-relaxed font-light flex-1 pt-1">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related packages */}
      {relatedPackages.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {t.services_page.related_packages}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.slice(0, 3).map((p) => {
                const name = localizeStr(locale, p.name, p.name_en);
                return (
                  <div
                    key={p.id}
                    className={`glass-card p-6 flex flex-col ${
                      p.is_recommended
                        ? "!border-deduck-yellow/50 shadow-[0_8px_32px_rgba(255,208,0,0.1)]"
                        : ""
                    }`}
                  >
                    {p.is_recommended && (
                      <span className="self-start text-[10px] bg-deduck-yellow text-deduck-dark px-3 py-1 rounded-full font-bold mb-3">
                        {t.pricing.recommended}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white mb-2 whitespace-pre-line">
                      {name}
                    </h3>
                    <div className="text-deduck-yellow text-2xl font-bold mb-4">
                      {p.price.toLocaleString("en-US")} {t.pricing.currency_unit}
                    </div>
                    <a
                      href={`${homePath === "/" ? "" : homePath}#pricing`}
                      className="mt-auto text-sm text-deduck-yellow border-t border-white/10 pt-3 hover:text-white transition"
                    >
                      {t.pricing.details} →
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related works */}
      {relatedWorks.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {t.services_page.related_works}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedWorks.map((w) => (
                <div
                  key={w.id}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image_url}
                    alt={w.title ?? service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href={`${homePath === "/" ? "" : homePath}#portfolio`}
                className="text-deduck-yellow hover:text-white transition text-sm"
              >
                {t.portfolio.title} →
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
