"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./providers/LanguageProvider";
import { DIWALI_DATE_ISO } from "@/lib/content";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

const labels = {
  days: { en: "Days", ta: "நாட்கள்" },
  hours: { en: "Hours", ta: "மணி" },
  minutes: { en: "Minutes", ta: "நிமிடம்" },
  seconds: { en: "Seconds", ta: "வினாடி" },
};

export function CountdownTimer() {
  const { t, lang } = useLanguage();
  const target = new Date(DIWALI_DATE_ISO).getTime();

  // Avoid hydration mismatch: render zeros on the server, real values after mount.
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const heading =
    lang === "en" ? "Countdown to Diwali 2026" : "தீபாவளி 2026 கவுண்ட்டவுன்";

  if (time?.done) {
    return (
      <section className="section-pad !py-14 text-center">
        <div className="glass-strong mx-auto max-w-2xl rounded-3xl px-8 py-12 shadow-glow">
          <p className="text-5xl">🪔🎆🪔</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-gradient sm:text-5xl">
            {lang === "en" ? "Happy Diwali!" : "இனிய தீபாவளி நல்வாழ்த்துக்கள்!"}
          </h2>
          <p className="mt-3 text-slate-300">
            {lang === "en"
              ? "Wishing you and your family a safe, sparkling celebration."
              : "உங்களுக்கும் உங்கள் குடும்பத்திற்கும் பாதுகாப்பான, ஒளிமயமான கொண்டாட்டம் வாழ்த்துக்கள்."}
          </p>
        </div>
      </section>
    );
  }

  const units: { key: keyof typeof labels; value: number }[] = [
    { key: "days", value: time?.days ?? 0 },
    { key: "hours", value: time?.hours ?? 0 },
    { key: "minutes", value: time?.minutes ?? 0 },
    { key: "seconds", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="section-pad !py-14 text-center" aria-label={heading}>
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold/90">
        {heading}
      </p>
      <div className="mx-auto flex max-w-2xl items-stretch justify-center gap-2.5 sm:gap-4">
        {units.map(({ key, value }) => (
          <div
            key={key}
            className="glass-strong relative flex w-full flex-col items-center rounded-2xl px-2 py-4 sm:px-4 sm:py-6"
          >
            <span
              key={value /* re-mount on change for a subtle pulse */}
              className="animate-pulse-soft font-display text-3xl font-extrabold tabular-nums text-white sm:text-5xl"
            >
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1.5 text-[10px] uppercase tracking-wider text-slate-300 sm:text-xs">
              {t(labels[key])}
            </span>
            <span className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-inset ring-gold/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
