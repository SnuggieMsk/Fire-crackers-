"use client";

import Link from "next/link";
import { useLanguage } from "./providers/LanguageProvider";
import { WhatsAppIcon } from "./ui/WhatsAppButton";
import { business, footer, nav } from "@/lib/content";
import { waLink, waMessages } from "@/lib/whatsapp";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const socials = Object.entries(business.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-white/10 bg-night-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-magenta text-night-950">
              ✦
            </span>
            <span className="font-display text-lg font-bold text-white">{business.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-slate-400">{t(footer.tagline)}</p>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-gold hover:text-gold"
                  aria-label={key}
                >
                  {key[0].toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold">
            {t(footer.quickLinks)}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/catalogue" className="text-sm text-slate-300 transition-colors hover:text-white">
                {t({ en: "Full Catalogue", ta: "முழு தயாரிப்புகள்" })}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold">
            {t(footer.contactHeading)}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
            <li>{t(business.address)}</li>
            <li>
              <a href={`tel:${business.phoneDisplay.replace(/\s/g, "")}`} className="hover:text-white">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center text-xs text-slate-500 sm:px-8 md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {business.name}. {t(footer.rights)}
          </p>
          <p className="max-w-xl text-slate-500">{t(footer.disclaimer)}</p>
        </div>
      </div>
    </footer>
  );
}
