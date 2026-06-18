"use client";

import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { useLanguage } from "./providers/LanguageProvider";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const { t } = useLanguage();
  return (
    <section className="section-pad">
      <SectionHeading
        eyebrow={t({ en: "Reviews", ta: "விமர்சனங்கள்" })}
        title={t({ en: "Loved Across Chennai", ta: "சென்னை முழுவதும் விரும்பப்படுகிறது" })}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <figure className="glass flex h-full flex-col rounded-3xl p-6">
              <div className="text-gold" aria-hidden="true">
                ★★★★★
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-200">
                “{t(item.quote)}”
              </blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{t(item.role)}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
