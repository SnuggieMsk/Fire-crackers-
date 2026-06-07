"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "./providers/LanguageProvider";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { business, nav, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label={business.name}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-magenta text-lg shadow-glow">
            ✦
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
              {business.name}
            </span>
            <span className="font-tamil text-[11px] text-gold/80">{business.nameTa}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-gold"
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle lang={lang} setLang={setLang} aria={t(ui.langToggleAria)} />
          <WhatsAppButton
            message={waMessages.header}
            className="hidden !px-4 !py-2 text-sm sm:inline-flex"
            ariaLabel={t(ui.orderWhatsApp)}
          >
            <span className="hidden md:inline">{t(ui.orderWhatsApp)}</span>
            <span className="md:hidden">WhatsApp</span>
          </WhatsAppButton>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t(ui.menu)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            <span className="sr-only">{t(ui.menu)}</span>
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="glass-strong mx-4 mt-2 rounded-2xl p-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-100 hover:bg-white/10"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsAppButton
            message={waMessages.header}
            className="mt-3 w-full"
            ariaLabel={t(ui.orderWhatsApp)}
          >
            {t(ui.orderWhatsApp)}
          </WhatsAppButton>
        </div>
      )}
    </header>
  );
}

function LangToggle({
  lang,
  setLang,
  aria,
}: {
  lang: "en" | "ta";
  setLang: (l: "en" | "ta") => void;
  aria: string;
}) {
  return (
    <div
      role="group"
      aria-label={aria}
      className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-sm"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-3 py-1 font-semibold transition-colors ${
          lang === "en" ? "bg-gold-magenta text-night-950" : "text-slate-200"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ta")}
        aria-pressed={lang === "ta"}
        className={`rounded-full px-3 py-1 font-tamil font-semibold transition-colors ${
          lang === "ta" ? "bg-gold-magenta text-night-950" : "text-slate-200"
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
