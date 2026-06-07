/**
 * generate-pricelist.tsx
 * ----------------------------------------------------------------------------
 * Builds a branded, A4 PDF price list from the SAME product data the website
 * uses (lib/content.ts), so the PDF and site never drift apart.
 *
 * Output:  public/pricelist.pdf   (downloaded instantly by the site button)
 * Run:     npm run pdf            (also runs automatically inside `npm run build`)
 *
 * TO EDIT PRICES:  open lib/content.ts → `categories` → change each `price`,
 * then run `npm run pdf` (or just `npm run build`) to regenerate this PDF.
 * ----------------------------------------------------------------------------
 */
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToFile,
} from "@react-pdf/renderer";
import { business, categories, DIWALI_DATE_ISO } from "../lib/content";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const fonts = join(root, "public", "fonts");

// Register bundled fonts (Latin + Tamil) so both languages render in the PDF.
function tryRegister(family: string, regular: string, bold: string) {
  const r = join(fonts, regular);
  const b = join(fonts, bold);
  if (existsSync(r) && existsSync(b)) {
    Font.register({ family, fonts: [{ src: r }, { src: b, fontWeight: "bold" }] });
    return true;
  }
  return false;
}
const hasLatin = tryRegister("Noto", "NotoSans-Regular.ttf", "NotoSans-Bold.ttf");
const hasTamil = tryRegister(
  "NotoTamil",
  "NotoSansTamil-Regular.ttf",
  "NotoSansTamil-Bold.ttf"
);
const LATIN = hasLatin ? "Noto" : "Helvetica";
const TAMIL = hasTamil ? "NotoTamil" : LATIN;

const COLORS = {
  night: "#0a0a1f",
  night2: "#191845",
  gold: "#ffce5c",
  magenta: "#ff4f9a",
  text: "#1a1a2e",
  muted: "#6b7280",
  rowAlt: "#fbf4e6",
  border: "#e7d9b8",
};

const styles = StyleSheet.create({
  page: { fontFamily: LATIN, fontSize: 10, color: COLORS.text, paddingBottom: 64 },
  header: { backgroundColor: COLORS.night, paddingVertical: 26, paddingHorizontal: 36 },
  brandRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { fontSize: 22, fontWeight: "bold", color: COLORS.gold },
  brandTa: { fontFamily: TAMIL, fontSize: 11, color: "#cbd0ea", marginTop: 2 },
  headerRight: { textAlign: "right" },
  headerLabel: { fontSize: 8, color: "#9aa0c0", textTransform: "uppercase", letterSpacing: 1 },
  headerValue: { fontSize: 12, color: "#ffffff", fontWeight: "bold", marginTop: 2 },
  ribbon: {
    backgroundColor: COLORS.magenta,
    color: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 36,
    fontSize: 10,
    fontWeight: "bold",
  },
  body: { paddingHorizontal: 36, paddingTop: 22 },
  title: { fontSize: 16, fontWeight: "bold", color: COLORS.text, marginBottom: 2 },
  subtitle: { fontSize: 9, color: COLORS.muted, marginBottom: 16 },
  tHead: {
    flexDirection: "row",
    backgroundColor: COLORS.night2,
    color: "#ffffff",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cNo: { width: "8%", fontWeight: "bold" },
  cEn: { width: "40%" },
  cTa: { width: "32%", fontFamily: TAMIL },
  cPrice: { width: "20%", textAlign: "right", fontWeight: "bold" },
  thText: { fontWeight: "bold", fontSize: 9, color: "#ffffff" },
  taCell: { fontFamily: TAMIL, fontSize: 10 },
  note: { marginTop: 16, fontSize: 8, color: COLORS.muted, lineHeight: 1.5 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.night,
    paddingVertical: 12,
    paddingHorizontal: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: { color: "#cbd0ea", fontSize: 9 },
  footerCta: { color: COLORS.gold, fontSize: 10, fontWeight: "bold" },
});

const diwaliYear = new Date(DIWALI_DATE_ISO).getFullYear();

function PriceList() {
  return (
    <Document
      title={`${business.name} — Price List`}
      author={business.name}
      subject={`Diwali ${diwaliYear} cracker price list`}
    >
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header} fixed>
          <View style={styles.brandRow}>
            <View>
              <Text style={styles.brand}>{business.name}</Text>
              <Text style={styles.brandTa}>{business.nameTa}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>WhatsApp Orders</Text>
              <Text style={styles.headerValue}>{business.phoneDisplay}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.ribbon} fixed>
          Prices valid for Diwali {diwaliYear} • Chennai • Retail &amp; Wholesale
        </Text>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.title}>Diwali {diwaliYear} Price List</Text>
          <Text style={styles.subtitle}>
            Premium firecrackers, sparklers, gift boxes &amp; combos. Message us on
            WhatsApp for the latest rates, bulk discounts and availability.
          </Text>

          {/* Table */}
          <View style={styles.tHead} fixed>
            <Text style={[styles.cNo, styles.thText]}>#</Text>
            <Text style={[styles.cEn, styles.thText]}>Product</Text>
            <Text style={[styles.cTa, styles.thText]}>தயாரிப்பு</Text>
            <Text style={[styles.cPrice, styles.thText]}>Price</Text>
          </View>

          {categories.map((c, i) => (
            <View
              key={c.id}
              style={[styles.tRow, i % 2 === 1 ? { backgroundColor: COLORS.rowAlt } : {}]}
              wrap={false}
            >
              <Text style={styles.cNo}>{i + 1}</Text>
              <Text style={styles.cEn}>{c.name.en}</Text>
              <Text style={[styles.cTa, styles.taCell]}>{c.name.ta}</Text>
              <Text style={styles.cPrice}>{c.price}</Text>
            </View>
          ))}

          <Text style={styles.note}>
            Note: Prices shown are placeholders / indicative and subject to change with
            stock and season. This is not an offer for online sale — all orders are
            confirmed via WhatsApp. Please burst crackers responsibly and follow local
            laws, timings and Supreme Court guidelines.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {business.name} • Chennai, Tamil Nadu
          </Text>
          <Text style={styles.footerCta}>Order on WhatsApp: {business.phoneDisplay}</Text>
        </View>
      </Page>
    </Document>
  );
}

async function main() {
  const out = join(root, "public", "pricelist.pdf");
  await renderToFile(<PriceList />, out);
  console.log(`✔ price list PDF written to ${out}`);
  console.log(`  fonts → Latin: ${LATIN}, Tamil: ${TAMIL}`);
}

main().catch((err) => {
  console.error("Failed to generate price list PDF:", err);
  process.exit(1);
});
