import type { Metadata, Viewport } from "next";
import { Sora, Inter, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { business, seo } from "@/lib/content";

const display = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "700"],
  variable: "--font-tamil",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.defaultTitle,
    template: `%s | ${business.name}`,
  },
  description: seo.defaultDescription,
  keywords: seo.keywords,
  applicationName: business.name,
  authors: [{ name: business.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: business.name,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // Google Search Console verification (set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a0a1f",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness / Store structured data for local SEO. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: business.name,
    description: seo.defaultDescription,
    url: siteUrl,
    telephone: `+${business.whatsappNumber}`,
    image: `${siteUrl}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.en.replace(/^TODO:\s*/, ""),
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHours: "Mo-Su 09:00-21:00",
    priceRange: "₹₹",
    sameAs: Object.values(business.social).filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${tamil.variable}`}>
      <body className="grain min-h-screen">
        <StructuredData />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
