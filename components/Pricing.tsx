"use client";

import type { Package } from "@/lib/supabase/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { Locale, Messages } from "@/lib/i18n/messages";

interface Props {
  marketing: Package[];
  production: Package[];
}

function localizeStr(
  locale: Locale,
  th: string,
  en: string | null | undefined
): string {
  if (locale === "en" && en && en.trim().length > 0) return en;
  return th;
}

function localizeArr(
  locale: Locale,
  th: string[],
  en: string[] | null | undefined
): string[] {
  if (locale === "en" && en && en.length > 0) return en;
  return th;
}

function PackageCard({
  pkg,
  t,
  locale,
}: {
  pkg: Package;
  t: Messages;
  locale: Locale;
}) {
  const isRecommended = pkg.is_recommended;
  const name = localizeStr(locale, pkg.name, pkg.name_en);
  const features = localizeArr(locale, pkg.features, pkg.features_en);
  const channels = localizeArr(locale, pkg.channels, pkg.channels_en);
  const bestFit =
    pkg.best_fit || pkg.best_fit_en
      ? localizeStr(
          locale,
          pkg.best_fit ?? "",
          pkg.best_fit_en ?? pkg.best_fit ?? ""
        )
      : null;

  return (
    <div
      className={`glass-card flex flex-col overflow-hidden relative ${
        isRecommended
          ? "transform md:-translate-y-4 !border-deduck-yellow/50 shadow-[0_8px_32px_rgba(255,208,0,0.1)]"
          : ""
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-deduck-yellow to-yellow-500 text-deduck-dark text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10 shadow-lg">
          {t.pricing.recommended}
        </div>
      )}
      <div
        className={`${
          isRecommended
            ? "bg-white/15 border-white/20"
            : "bg-white/10 border-white/10"
        } border-b py-5 px-5 text-center backdrop-blur-md`}
      >
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-wide whitespace-pre-line leading-tight">
          {name}
        </h3>
      </div>
      <div className="p-8 flex-grow">
        {bestFit && (
          <div className="mb-6 p-3 rounded-xl bg-deduck-yellow/8 border border-deduck-yellow/25">
            <p className="text-[10px] uppercase tracking-widest text-deduck-yellow font-bold mb-1">
              👤 {t.pricing.best_fit}
            </p>
            <p className="text-gray-200 text-sm leading-relaxed font-light">
              {bestFit}
            </p>
          </div>
        )}
        <div className="inline-block glass-panel text-white font-medium px-4 py-1 text-sm mb-6">
          {t.pricing.details}
        </div>
        <ul className="space-y-3 text-gray-300 mb-8 font-light text-sm md:text-base">
          {features.map((f, i) => (
            <li key={i} className="flex items-start">
              <span className="text-deduck-yellow mr-3 font-bold shrink-0">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
        {channels.length > 0 && (
          <>
            <div className="inline-block glass-panel text-deduck-yellow font-medium px-4 py-1 text-sm mb-6 border-deduck-yellow/30">
              {t.pricing.channels}
            </div>
            <ul className="space-y-3 text-gray-300 font-light text-sm">
              {channels.map((c, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-white/50 mr-3">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="p-8 pt-0 text-center">
        <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">
          {t.pricing.currency_label}
        </p>
        <div className="text-deduck-yellow text-4xl font-bold py-4 drop-shadow-md">
          {pkg.price.toLocaleString("en-US")} {t.pricing.currency_unit}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
        {eyebrow}
      </span>
      <h3 className="text-2xl md:text-4xl font-bold text-white mt-5 mb-3">
        {title}
      </h3>
      <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

export default function Pricing({ marketing, production }: Props) {
  const { t, locale } = useTranslation();

  // 4 marketing cards across is too dense on desktop; use 4-col grid only
  // when there are ≥4 packages, otherwise the existing 3-col layout.
  const marketingGrid =
    marketing.length >= 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      : "grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto";
  const productionGrid =
    production.length >= 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      : "grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto";

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-20">
          <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
            {t.pricing.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6">
            {t.pricing.title}
          </h2>
          <p className="text-gray-400 mt-4 text-lg">{t.pricing.subtitle}</p>
        </div>

        {/* Marketing Retainer */}
        {marketing.length > 0 && (
          <>
            <SectionHeader
              eyebrow={t.pricing.marketing_eyebrow}
              title={t.pricing.marketing_title}
              subtitle={t.pricing.marketing_subtitle}
            />
            <div className={`grid ${marketingGrid}`}>
              {marketing.map((p) => (
                <PackageCard key={p.id} pkg={p} t={t} locale={locale} />
              ))}
            </div>
          </>
        )}

        {/* Production Project */}
        {production.length > 0 && (
          <div className="mt-32">
            <SectionHeader
              eyebrow={t.pricing.production_eyebrow}
              title={t.pricing.production_title}
              subtitle={t.pricing.production_subtitle}
            />
            <div className={`grid ${productionGrid}`}>
              {production.map((p) => (
                <PackageCard key={p.id} pkg={p} t={t} locale={locale} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-24 text-gray-500 text-sm">
          {t.pricing.footer}
        </div>
      </div>
    </section>
  );
}
