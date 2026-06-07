"use client";

import { Reveal } from "./ui/Reveal";
import { useLanguage } from "./providers/LanguageProvider";
import { safety } from "@/lib/content";

export function Safety() {
  const { t } = useLanguage();
  return (
    <section className="section-pad !py-14">
      <Reveal>
        <div className="glass mx-auto flex max-w-4xl items-start gap-4 rounded-3xl p-6 ring-1 ring-teal/15 sm:p-8">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/20 text-2xl">
            🪔
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              {t(safety.heading)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              {t(safety.body)}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
