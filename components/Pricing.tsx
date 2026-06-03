"use client";

import type { Package } from "@/lib/supabase/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { Messages } from "@/lib/i18n/messages";

interface Props {
  marketing: Package[];
  production: Package[];
}

function PackageCard({ pkg, t }: { pkg: Package; t: Messages }) {
  const isRecommended = pkg.is_recommended;
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
          isRecommended ? "bg-white/15 border-white/20" : "bg-white/10 border-white/10"
        } border-b py-5 text-center backdrop-blur-md`}
      >
        <h3 className="text-white font-bold text-2xl tracking-wide whitespace-pre-line">
          {pkg.name}
        </h3>
      </div>
      <div className="p-8 flex-grow">
        <div className="inline-block glass-panel text-white font-medium px-4 py-1 text-sm mb-6">
          {t.pricing.details}
        </div>
        <ul className="space-y-3 text-gray-300 mb-8 font-light">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start">
              <span className="text-deduck-yellow mr-3 font-bold">✓</span>
              {f}
            </li>
          ))}
        </ul>
        {pkg.channels.length > 0 && (
          <>
            <div className="inline-block glass-panel text-deduck-yellow font-medium px-4 py-1 text-sm mb-6 border-deduck-yellow/30">
              {t.pricing.channels}
            </div>
            <ul className="space-y-3 text-gray-300 font-light">
              {pkg.channels.map((c, i) => (
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

export default function Pricing({ marketing, production }: Props) {
  const { t } = useTranslation();
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
            {t.pricing.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6">
            {t.pricing.title}
          </h2>
          <p className="text-gray-400 mt-4 text-lg">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {marketing.map((p) => (
            <PackageCard key={p.id} pkg={p} t={t} />
          ))}
        </div>

        {production.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-16">
              <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
                {t.pricing.production_eyebrow}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-6">
                {t.pricing.production_title}
              </h2>
              <p className="text-gray-400 mt-4 text-lg">
                {t.pricing.production_subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {production.map((p) => (
                <PackageCard key={p.id} pkg={p} t={t} />
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
