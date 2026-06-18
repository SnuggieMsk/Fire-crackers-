"use client";

import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { bulk, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

export function Bulk() {
  const { t } = useLanguage();
  return (
    <section id="bulk" className="section-pad">
      <div className="glass-strong overflow-hidden rounded-[2rem]">
        <div className="grid items-center gap-0 md:grid-cols-2">
          <div className="relative hidden min-h-[22rem] md:block">
            <Image
              src="/images/aerial.jpg"
              alt="Bulk fireworks display"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-night-900/80" />
          </div>

          <div className="p-7 sm:p-10">
            <SectionHeading
              eyebrow={t({ en: "B2B & Wholesale", ta: "B2B & மொத்தம்" })}
              title={t(bulk.heading)}
              subtitle={t(bulk.subheading)}
              align="left"
            />
            <ul className="mt-6 space-y-3">
              {bulk.points.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <li className="flex items-start gap-3 text-slate-200">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/20 text-teal">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base">{t(p)}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <WhatsAppButton message={waMessages.bulk} className="mt-7">
              {t({ en: "Enquire for Bulk Orders", ta: "மொத்த ஆர்டருக்கு கேளுங்கள்" })}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
