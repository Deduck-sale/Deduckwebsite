"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { messages, type Locale, type Messages } from "./messages";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "deduck-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server + first-render: always "th" (matches HTML lang attr from layout)
  const [locale, setLocaleState] = useState<Locale>("th");

  // After hydration, read the user's stored preference and apply it
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "th") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage blocked — keep default
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: messages[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback so the app doesn't crash if a component is rendered outside
    // the provider (e.g. in storybook or a test) — default to Thai.
    return { locale: "th", setLocale: () => {}, t: messages.th };
  }
  return ctx;
}
