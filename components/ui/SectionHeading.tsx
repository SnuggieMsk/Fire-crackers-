"use client";

import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

/** Consistent section heading with eyebrow, gradient title and optional subtitle. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold/90">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-slate-300 sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
