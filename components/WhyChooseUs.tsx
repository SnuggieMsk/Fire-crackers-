"use client";

import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { useLanguage } from "./providers/LanguageProvider";
import { whyChooseUs } from "@/lib/content";

const icons: Record<string, JSX.Element> = {
  shield: (
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
  ),
  sparkles: (
    <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3zM18 14l.9 2.3L21 17l-2.1.7L18 20l-.9-2.3L15 17l2.1-.7L18 14z" />
  ),
  tag: (
    <path d="M3 12l8-8 9 9-8 8-9-9zm5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  ),
  truck: (
    <path d="M3 6h11v9H3V6zm11 3h4l3 3v3h-7V9zM7 18.5A1.5 1.5 0 117 15.5a1.5 1.5 0 010 3zm10 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
  ),
};

export function WhyChooseUs() {
  const { t } = useLanguage();
  return (
    <section className="section-pad">
      <SectionHeading
        eyebrow={t({ en: "Our Promise", ta: "எங்கள் வாக்குறுதி" })}
        title={t(whyChooseUs.heading)}
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.items.map((item, i) => (
          <Reveal key={item.icon} delay={(i % 4) * 0.08}>
            <div className="glass flex h-full flex-col items-center rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1.5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-magenta text-night-950 shadow-glow">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                  {icons[item.icon]}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">
                {t(item.title)}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{t(item.desc)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
