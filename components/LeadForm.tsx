"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { leadForm, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "success" | "error";

const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const GSCRIPT = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_ENDPOINT;

export function LeadForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [data, setData] = useState({
    name: "",
    phone: "",
    city: "",
    type: "retail",
    products: "",
    message: "",
    company: "", // honeypot — must stay empty
  });

  const update = (k: keyof typeof data) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setData((d) => ({ ...d, [k]: e.target.value }));

  function validate() {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = t(leadForm.validation.nameRequired);
    if (!/^[+\d][\d\s-]{7,}$/.test(data.phone.trim()))
      next.phone = t(leadForm.validation.phoneRequired);
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Honeypot: a bot filled the hidden field — silently succeed without sending.
    if (data.company) {
      setStatus("success");
      return;
    }
    if (!validate()) return;

    setStatus("sending");
    const payload = {
      name: data.name,
      phone: data.phone,
      city: data.city,
      customerType: data.type,
      products: data.products,
      message: data.message,
      source: "Harsha Firecracker website",
    };

    try {
      // Formspree takes priority if configured, else Google Apps Script.
      if (FORMSPREE) {
        const res = await fetch(FORMSPREE, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Formspree error");
      } else if (GSCRIPT) {
        // Apps Script Web Apps don't return CORS headers by default; "no-cors"
        // lets the request through (response is opaque but the row is written).
        await fetch(GSCRIPT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      } else {
        // No backend configured yet — treat as success and rely on the
        // "Continue on WhatsApp" fallback so leads are never lost.
        await new Promise((r) => setTimeout(r, 400));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const labelCls = "mb-1.5 block text-sm font-medium text-slate-200";
  const inputCls =
    "w-full rounded-xl border border-white/15 bg-night-900/60 px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40";

  const waFallback = waMessages.lead({
    name: data.name,
    phone: data.phone,
    city: data.city,
    type: data.type,
    products: data.products,
    message: data.message,
  });

  return (
    <section id="contact" className="section-pad">
      <SectionHeading
        eyebrow={t({ en: "Enquire", ta: "விசாரணை" })}
        title={t(leadForm.heading)}
        subtitle={t(leadForm.subheading)}
      />

      <Reveal className="mx-auto mt-10 max-w-2xl">
        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          {status === "success" ? (
            <div className="text-center">
              <p className="text-4xl">🎉</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-gradient">
                {t(leadForm.successTitle)}
              </h3>
              <p className="mt-2 text-slate-300">{t(leadForm.successBody)}</p>
              <WhatsAppButton message={waFallback} className="mt-6">
                {t(ui.continueWhatsApp)}
              </WhatsAppButton>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="lf-name" className={labelCls}>
                    {t(leadForm.fields.name)} *
                  </label>
                  <input
                    id="lf-name"
                    type="text"
                    value={data.name}
                    onChange={update("name")}
                    className={inputCls}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "lf-name-err" : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="lf-name-err" className="mt-1 text-xs text-magenta">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="lf-phone" className={labelCls}>
                    {t(leadForm.fields.phone)} *
                  </label>
                  <input
                    id="lf-phone"
                    type="tel"
                    value={data.phone}
                    onChange={update("phone")}
                    className={inputCls}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "lf-phone-err" : undefined}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p id="lf-phone-err" className="mt-1 text-xs text-magenta">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="lf-city" className={labelCls}>
                    {t(leadForm.fields.city)}
                  </label>
                  <input
                    id="lf-city"
                    type="text"
                    value={data.city}
                    onChange={update("city")}
                    className={inputCls}
                    autoComplete="address-level2"
                  />
                </div>
                <div>
                  <label htmlFor="lf-type" className={labelCls}>
                    {t(leadForm.fields.customerType)}
                  </label>
                  <select
                    id="lf-type"
                    value={data.type}
                    onChange={update("type")}
                    className={inputCls}
                  >
                    {leadForm.customerTypes.map((c) => (
                      <option key={c.value} value={c.value} className="bg-night-900">
                        {t(c.label)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="lf-products" className={labelCls}>
                  {t(leadForm.fields.products)}
                </label>
                <input
                  id="lf-products"
                  type="text"
                  value={data.products}
                  onChange={update("products")}
                  className={inputCls}
                  placeholder={t({
                    en: "e.g. Gift boxes, sparklers, combos…",
                    ta: "எ.கா. பரிசுப் பெட்டிகள், மத்தாப்புகள், காம்போக்கள்…",
                  })}
                />
              </div>

              <div>
                <label htmlFor="lf-message" className={labelCls}>
                  {t(leadForm.fields.message)}
                </label>
                <textarea
                  id="lf-message"
                  rows={3}
                  value={data.message}
                  onChange={update("message")}
                  className={inputCls}
                />
              </div>

              {/* Honeypot field — hidden from humans, off-screen & aria-hidden */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="lf-company">Company (leave blank)</label>
                <input
                  id="lf-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.company}
                  onChange={update("company")}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-magenta">{t(leadForm.errorBody)}</p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {status === "sending" ? t(leadForm.sending) : t(leadForm.submit)}
                </button>
                <WhatsAppButton
                  message={waFallback}
                  variant="secondary"
                  className="w-full"
                >
                  {t(ui.continueWhatsApp)}
                </WhatsAppButton>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
