"use client";

import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { offers, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

export function Offers() {
  const { t } = useLanguage();
  return (
    <section id="offers" className="relative overflow-hidden">
      {/* festive glow accents */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-magenta/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />

      <div className="section-pad">
        <SectionHeading
          eyebrow={t({ en: "Limited Time", ta: "குறுகிய காலம்" })}
          title={t(offers.heading)}
          subtitle={t(offers.subheading)}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {offers.deals.map((deal, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass-strong flex h-full flex-col rounded-3xl p-6 ring-1 ring-gold/10">
                <span className="self-start rounded-full bg-gold-magenta px-3 py-1 text-xs font-bold text-night-950">
                  {t(deal.tag)}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  {t(deal.title)}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-300">{t(deal.desc)}</p>
                <p className="mt-4 text-2xl font-extrabold text-gradient">
                  {t(deal.highlight)}
                </p>
                <WhatsAppButton
                  message={`Hi, I'm interested in the "${deal.title.en}" Diwali offer. Please share details.`}
                  className="mt-5 w-full !py-2.5 text-sm"
                >
                  {t(ui.enquireWhatsApp)}
                </WhatsAppButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
