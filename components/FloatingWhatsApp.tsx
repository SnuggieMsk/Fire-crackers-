"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { ui } from "@/lib/content";
import { waLink, waMessages } from "@/lib/whatsapp";

/** Floating sticky WhatsApp button — visible on every page, all screens. */
export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  // Reveal after a small scroll so it doesn't fight the hero CTA at the top.
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 350);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(ui.orderWhatsApp)}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">{t(ui.orderWhatsApp)}</span>
    </a>
  );
}
