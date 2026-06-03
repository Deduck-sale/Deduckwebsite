"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function LanguageToggle({
  variant = "default",
}: {
  variant?: "default" | "mobile";
}) {
  const { locale, setLocale, t } = useTranslation();

  const base =
    "rounded-full border border-white/15 backdrop-blur-md flex overflow-hidden text-xs font-semibold";
  const sizing =
    variant === "mobile" ? "h-8 mx-auto inline-flex" : "h-8 inline-flex";

  return (
    <div
      className={`${base} ${sizing}`}
      role="group"
      aria-label={t.nav.toggle_label}
    >
      <button
        type="button"
        onClick={() => setLocale("th")}
        className={`px-3 transition ${
          locale === "th"
            ? "bg-deduck-yellow text-deduck-dark"
            : "text-gray-300 hover:text-deduck-yellow"
        }`}
        aria-pressed={locale === "th"}
      >
        TH
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 transition ${
          locale === "en"
            ? "bg-deduck-yellow text-deduck-dark"
            : "text-gray-300 hover:text-deduck-yellow"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
