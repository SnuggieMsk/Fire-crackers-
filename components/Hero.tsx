"use client";

import Image from "next/image";
import { FireworksCanvas } from "./FireworksCanvas";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { hero, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

/**
 * HERO TREATMENT TOGGLE
 * ---------------------
 * false (default) → original live canvas fireworks animation.
 * true            → looping muted fireworks video background.
 *
 * To use the video option:
 *   1. Download a fireworks clip and save it to /public/video/fireworks.mp4
 *   2. Set USE_VIDEO_BG = true below.
 */
const USE_VIDEO_BG = false;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Static premium image base (always present, instant LCP backdrop) */}
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/40 via-night-950/55 to-night-950" />

        {USE_VIDEO_BG ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-50"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero.jpg"
          >
            <source src="/video/fireworks.mp4" type="video/mp4" />
          </video>
        ) : (
          <FireworksCanvas className="absolute inset-0 h-full w-full opacity-90" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-24 text-center sm:px-8">
        <p className="animate-pulse-soft mb-5 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold sm:text-sm">
          {t(hero.eyebrow)}
        </p>

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl">
          <span className="text-glow-gold">{t(hero.title)}</span>{" "}
          <span className="text-gradient">{t(hero.titleAccent)}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-200 sm:text-lg md:text-xl">
          {t(hero.subtitle)}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton message={waMessages.hero} className="w-full sm:w-auto">
            {t(ui.orderWhatsApp)}
          </WhatsAppButton>
          <a href="/#catalogue" className="btn-secondary w-full sm:w-auto">
            {t(ui.viewCatalogue)}
          </a>
        </div>
      </div>

      {/* Bottom fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night-950 to-transparent" />
    </section>
  );
}
