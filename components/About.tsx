"use client";

import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { useLanguage } from "./providers/LanguageProvider";
import { about } from "@/lib/content";

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section-pad">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-glow-magenta">
            <Image
              src="/images/diwali-lamps.jpg"
              alt="Diwali celebration with lamps and fireworks"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 to-transparent" />
          </div>
        </Reveal>

        <div>
          <SectionHeading title={t(about.heading)} align="left" />
          <div className="mt-5 space-y-4">
            {about.body.map((para, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                  {t(para)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
