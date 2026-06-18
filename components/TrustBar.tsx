"use client";

import { Reveal } from "./ui/Reveal";
import { useLanguage } from "./providers/LanguageProvider";
import { trustStats } from "@/lib/content";

export function TrustBar() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto -mt-6 w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div className="glass-strong grid grid-cols-2 gap-3 rounded-3xl p-5 sm:gap-6 sm:p-7 md:grid-cols-4">
          {trustStats.map((s) => (
            <div key={s.value} className="text-center">
              <p className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">{t(s.label)}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
