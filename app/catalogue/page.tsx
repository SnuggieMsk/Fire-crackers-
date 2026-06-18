import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Catalogue } from "@/components/Catalogue";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { seo } from "@/lib/content";

export const metadata: Metadata = {
  title: seo.catalogueTitle,
  description: seo.catalogueDescription,
  alternates: { canonical: "/catalogue" },
  openGraph: {
    title: seo.catalogueTitle,
    description: seo.catalogueDescription,
    url: "/catalogue",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function CataloguePage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href="/" className="text-sm text-slate-400 transition-colors hover:text-gold">
            ← Home
          </Link>
        </div>
        {/* `asSection={false}` because the page itself is the section context */}
        <Catalogue asSection={false} />
        <LeadForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
