"use client";

import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { useLanguage } from "./providers/LanguageProvider";
import { business, contact, ui } from "@/lib/content";
import { waMessages } from "@/lib/whatsapp";

export function Contact() {
  const { t } = useLanguage();
  return (
    <section className="section-pad !pt-4">
      <SectionHeading
        eyebrow={t({ en: "Find Us", ta: "எங்களை கண்டறியுங்கள்" })}
        title={t(contact.heading)}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="glass-strong flex h-full flex-col gap-5 rounded-3xl p-6 sm:p-8">
            <InfoRow label={t(contact.addressLabel)} value={t(business.address)} icon="📍" />
            <InfoRow label={t(contact.hoursLabel)} value={t(business.hours)} icon="🕒" />
            <InfoRow label={t(contact.phoneLabel)} value={business.phoneDisplay} icon="📞" href={`tel:${business.phoneDisplay.replace(/\s/g, "")}`} />
            <WhatsAppButton message={waMessages.general} className="mt-1 w-full">
              {t(ui.orderWhatsApp)}
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong h-full min-h-[20rem] overflow-hidden rounded-3xl">
            <iframe
              title="Harsha Firecracker location map"
              src={business.mapEmbedSrc}
              className="h-full min-h-[20rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: string;
  icon: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-lg">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wider text-slate-400">{label}</span>
        <span className="block text-slate-100">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-start gap-3 transition-colors hover:text-gold">
      {content}
    </a>
  ) : (
    <div className="flex items-start gap-3">{content}</div>
  );
}
