"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo } from "react";
import { messages, type Locale, type Messages } from "./messages";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
  /** Build the equivalent URL for the opposite locale (used by canonical/alternate). */
  pathFor: (l: Locale) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * URL is the source of truth for locale:
 *   /            → th
 *   /en          → en
 *   /services/x  → th
 *   /en/services/x → en
 *
 * /admin/* is treated as Thai regardless of prefix because the admin UI
 * itself is Thai-only — switching language there would just confuse the
 * router with no payoff.
 */
function detectLocale(pathname: string | null): Locale {
  if (!pathname) return "th";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "th";
}

function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3); // "/en/foo" → "/foo"
  return pathname;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = detectLocale(pathname);

  // Keep the <html lang> attribute in sync after every client navigation.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "en" ? "en" : "th";
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const basePath = pathname ? stripLocale(pathname) : "/";
    const pathFor = (l: Locale) => {
      // Don't ever prefix /admin
      if (basePath.startsWith("/admin")) return basePath;
      return l === "en" ? (basePath === "/" ? "/en" : `/en${basePath}`) : basePath;
    };
    return {
      locale,
      setLocale: (l: Locale) => {
        if (l === locale) return;
        router.push(pathFor(l));
      },
      t: messages[locale],
      pathFor,
    };
  }, [locale, pathname, router]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: "th",
      setLocale: () => {},
      t: messages.th,
      pathFor: () => "/",
    };
  }
  return ctx;
}
