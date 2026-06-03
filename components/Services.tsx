"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";

const ICON_PATHS = {
  social: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  ),
  production: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  ),
  branding: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  ),
} as const;

export default function Services() {
  const { t } = useTranslation();

  const services: { key: keyof typeof ICON_PATHS; title: string; desc: string }[] = [
    {
      key: "social",
      title: t.services.items.social.title,
      desc: t.services.items.social.desc,
    },
    {
      key: "production",
      title: t.services.items.production.title,
      desc: t.services.items.production.desc,
    },
    {
      key: "branding",
      title: t.services.items.branding.title,
      desc: t.services.items.branding.desc,
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
            {t.services.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4 drop-shadow-md">
            {t.services.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.key}
              className="glass-card p-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 glass-panel flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-deduck-yellow/50 transition duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <svg
                  className="w-10 h-10 text-deduck-yellow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {ICON_PATHS[s.key]}
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-deduck-yellow transition duration-300">
                {s.title}
              </h3>
              <p className="text-gray-300 leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
