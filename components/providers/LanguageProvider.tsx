"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LangString } from "@/lib/content";

export type Lang = "en" | "ta";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Resolve a bilingual string (or any {en,ta}) to the active language. */
  t: (s: LangString) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "hf-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English on first load (per spec).
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the saved choice after mount (localStorage isn't available on the
  // server). Works on the deployed site; not inside a sandboxed chat preview.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "ta") setLangState(saved);
    } catch {
      /* localStorage may be unavailable; ignore */
    }
  }, []);

  // Keep the <html lang> attribute in sync for accessibility/SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ta" : "en");
  }, [lang, setLang]);

  const t = useCallback((s: LangString) => (s ? s[lang] : ""), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
