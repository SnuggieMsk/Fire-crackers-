"use client";

import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { categories, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

export function PriceListButton({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <a
      href="/pricelist.pdf"
      download
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-secondary ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {t(ui.downloadPriceList)}
    </a>
  );
}

export function Catalogue({ asSection = true }: { asSection?: boolean }) {
  const { t } = useLanguage();

  const heading =
    t({ en: "Our Cracker Catalogue", ta: "எங்கள் பட்டாசு வகைகள்" });
  const subtitle = t({
    en: "From sparklers to grand aerial shots — explore our range and enquire on WhatsApp for the latest rates.",
    ta: "மத்தாப்பு முதல் பிரம்மாண்ட வான வேடிக்கைகள் வரை — எங்கள் வகைகளை பாருங்கள், சமீபத்திய விலைக்கு WhatsApp-ல் கேளுங்கள்.",
  });

  const Wrapper = asSection ? "section" : "div";

  return (
    <Wrapper id="catalogue" className="section-pad">
      <SectionHeading
        eyebrow={t({ en: "Catalogue", ta: "தயாரிப்புகள்" })}
        title={heading}
        subtitle={subtitle}
      />

      <Reveal className="mt-7 flex justify-center">
        <PriceListButton />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 3) * 0.08}>
            <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1.5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={t(cat.name)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/10 to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-night-950/60 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                  {cat.price}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold text-white">
                  {t(cat.name)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                  {t(cat.blurb)}
                </p>
                <WhatsAppButton
                  message={waMessages.product(cat.name.en)}
                  variant="secondary"
                  className="mt-4 w-full !py-2.5 text-sm"
                  ariaLabel={`${t(ui.enquireWhatsApp)} — ${t(cat.name)}`}
                >
                  {t(ui.enquireWhatsApp)}
                </WhatsAppButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Wrapper>
  );
}
