"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

/**
 * FAQ accordion + FAQPage JSON-LD. The structured data is the SEO/AIEO
 * payoff: Google can show a rich-snippet drop-down in search results, and
 * LLM assistants (ChatGPT/Claude/Perplexity) often quote Q&A blocks
 * verbatim when answering pricing or scope questions about an agency.
 */
export default function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="glass-panel text-deduck-yellow px-6 py-2 text-sm font-medium tracking-widest uppercase">
            {t.faq.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4 drop-shadow-md">
            {t.faq.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="glass-card overflow-hidden !rounded-2xl transition"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-medium text-base md:text-lg group-hover:text-deduck-yellow transition">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full bg-deduck-yellow/20 border border-deduck-yellow/40 flex items-center justify-center text-deduck-yellow transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-300 leading-relaxed font-light text-sm md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
