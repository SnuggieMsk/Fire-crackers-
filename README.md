# Harsha Firecracker — Website

A premium, festive, mobile-first marketing & lead-generation website for
**Harsha Firecracker**, a firecracker distributor in **Chennai, Tamil Nadu**
serving both retail Diwali shoppers and bulk / wholesale / event buyers.

There is **no online payment** — every call-to-action drives a **WhatsApp
enquiry** (`+91 86680 50712`) or a lead-form submission.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

- 🎆 Original, lightweight **canvas fireworks** hero animation (pauses off-screen, respects reduced-motion)
- 🪔 Live **Diwali countdown** timer
- 🌐 Instant **English / தமிழ் (Tamil)** language toggle (persisted in `localStorage`)
- 🛍️ Catalogue grid with per-product **WhatsApp enquiry** buttons
- 📄 Auto-generated, branded **A4 price-list PDF** (bilingual, built from the same data as the site)
- 📥 Lead form with validation, honeypot, **Formspree** or **Google Sheet** backend, and a WhatsApp fallback
- 🔎 Full **SEO**: per-page metadata, Open Graph/Twitter, LocalBusiness JSON-LD, `sitemap.xml`, `robots.txt`, favicons + PWA manifest

---

## 1. Run locally

```bash
npm install
cp .env.example .env.local   # then edit values (optional for local dev)
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command          | What it does                                                        |
| ---------------- | ------------------------------------------------------------------- |
| `npm run dev`    | Start the dev server (auto-downloads images/fonts first).           |
| `npm run build`  | Download assets → regenerate the PDF → build for production.        |
| `npm run start`  | Serve the production build.                                         |
| `npm run pdf`    | Regenerate **only** the price-list PDF (`public/pricelist.pdf`).    |
| `npm run assets` | (Re)download bundled images & fonts into `/public` (idempotent).    |

> **One file to rule them all:** almost everything you'll ever want to change
> lives in **`lib/content.ts`** — phone number, address, hours, products,
> prices, offers, testimonials, stats, the countdown date, and **all
> English/Tamil copy**. Search that file for `TODO` to find every placeholder.

---

## 2. Connect the lead form

The form works out of the box (it falls back to “Continue on WhatsApp”), but to
actually **collect leads**, connect one backend. Set the value in `.env.local`
(and in Vercel → Project → Settings → Environment Variables for production).

### Option A — Formspree (easiest, recommended)

1. Create a free account at <https://formspree.io> and add a new form.
2. Copy the form endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Put it in `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
4. Restart the dev server / redeploy. Submissions now arrive in your Formspree
   inbox (and email).

### Option B — Google Apps Script → Google Sheet (free, self-hosted)

1. Create a Google Sheet. Add a header row:
   `Timestamp | Name | Phone | City | Customer Type | Products | Message`
2. In the Sheet: **Extensions → Apps Script**, paste:
   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
     const d = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(), d.name, d.phone, d.city, d.customerType, d.products, d.message,
     ]);
     return ContentService.createTextOutput("ok");
   }
   ```
3. **Deploy → New deployment → Web app**. Set *Execute as: Me* and
   *Who has access: Anyone*. Copy the `/exec` Web-App URL.
4. Put it in `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```

> If **both** are set, Formspree is used. Leads are never lost: if neither is
> configured, the form still shows success and offers the WhatsApp fallback
> pre-filled with the visitor's details.

---

## 3. Edit prices & regenerate the price-list PDF

1. Open **`lib/content.ts`** and find the `categories` array.
2. Edit each product's **`price`** (e.g. change `"TODO ₹—/box"` to `"₹250/box"`).
   You can also edit the English/Tamil names and blurbs here.
3. Regenerate the PDF:
   ```bash
   npm run pdf
   ```
   This rewrites `public/pricelist.pdf` from the same data, so the website and
   the downloadable PDF always match. (`npm run build` does this automatically.)

The PDF is bilingual (English + Tamil product names), branded with the dark
festive header, the WhatsApp number, and a “Prices valid for Diwali 2026” line.
Its layout lives in `scripts/generate-pricelist.tsx`.

---

## 4. Swap in real product photos

All imagery is **bundled in `/public/images`** (never hot-linked), so the live
site never breaks. To use Harsha Firecracker's own photos:

- Replace the files in `public/images/` **keeping the same filenames**
  (e.g. overwrite `sparklers.jpg`, `gift-boxes.jpg`, `hero.jpg`, …).
- The filenames each product uses are listed in `lib/content.ts`
  (`categories[].image`). You can also point a product at a new filename there.
- Recommended: landscape JPGs ~1200px wide. `next/image` optimises & lazy-loads
  them automatically.

Key image slots: `hero.jpg` (hero background), `diwali-lamps.jpg` (About),
`aerial.jpg` (Bulk section), `og-image.jpg` (social-share preview), plus one
image per product category.

> Re-running `npm run assets` only downloads files that are **missing**, so it
> will never overwrite your own photos.

### Optional: fireworks video hero

To use a looping muted video instead of the canvas animation:

1. Save a clip to `public/video/fireworks.mp4`.
2. In `components/Hero.tsx`, set `USE_VIDEO_BG = true`.

---

## 5. Update the Diwali countdown date

Open **`lib/content.ts`** and edit `DIWALI_DATE_ISO`. The current target is
**8 November 2026**. The file lists the next several years' Diwali dates in a
comment so you can bump it each year, e.g.:

```ts
export const DIWALI_DATE_ISO = "2027-10-29T00:00:00+05:30"; // Diwali 2027
```

When the date passes, the timer automatically switches to a “Happy Diwali!”
celebration message.

---

## 6. Edit the English / Tamil copy

Every piece of text is stored as a `{ en, ta }` pair in **`lib/content.ts`**.
To change wording, edit **both** languages for that entry. The EN | தமிழ்
toggle in the header switches the entire site instantly and remembers the
visitor's choice. No i18n framework needed — it's a small React context
(`components/providers/LanguageProvider.tsx`).

---

## 7. Deploy to Vercel

1. Push this repo to GitHub (already connected).
2. Go to <https://vercel.com>, **Add New → Project**, import the repo.
3. Framework preset: **Next.js** (auto-detected). No build changes needed.
4. Add **Environment Variables** (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = your final domain, e.g. `https://harshafirecracker.com`
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` **or** `NEXT_PUBLIC_GOOGLE_SCRIPT_ENDPOINT`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (later — see below)
5. **Deploy.**

> The build runs `node scripts/ensure-assets.mjs && npm run pdf && next build`,
> which downloads imagery/fonts (if missing) and regenerates the PDF on every
> deploy. The downloaded assets are also committed, so deploys work even offline.

### Connect a custom domain

1. Vercel → Project → **Settings → Domains → Add** your domain.
2. At your domain registrar, add the DNS records Vercel shows (usually an `A`
   record to `76.76.21.21` and/or a `CNAME` to `cname.vercel-dns.com`).
3. Wait for DNS to propagate; Vercel issues HTTPS automatically.
4. Update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy so canonical
   URLs, the sitemap and Open Graph tags use the real domain.

### Google Search Console + Google Business Profile

- **Search Console:** add your domain at <https://search.google.com/search-console>,
  choose the *HTML tag* method, copy the `content` token, set
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel, redeploy, then click Verify.
  Submit `https://yourdomain.com/sitemap.xml`.
- **Google Business Profile:** create/claim your listing at
  <https://business.google.com> with the real shop name, address, hours, phone
  and photos. This is the single biggest boost for ranking in local
  “firecrackers in Chennai” searches. Keep the address/hours in `lib/content.ts`
  identical to your Business Profile.

---

## Project structure

```
app/
  layout.tsx          # fonts, SEO metadata, JSON-LD, providers
  page.tsx            # the single landing page (all sections)
  catalogue/page.tsx  # dedicated catalogue page
  sitemap.ts robots.ts manifest.ts globals.css
components/            # Header, Hero, CountdownTimer, Catalogue, LeadForm, …
  providers/LanguageProvider.tsx
  ui/                 # Reveal, SectionHeading, WhatsAppButton
lib/
  content.ts          # ★ ALL editable content + EN/TA copy + prices + countdown
  whatsapp.ts         # WhatsApp link + pre-filled message helpers
scripts/
  ensure-assets.mjs   # downloads & bundles images + fonts into /public
  generate-pricelist.tsx  # builds public/pricelist.pdf from content.ts
public/
  images/  fonts/  pricelist.pdf  favicons + icons
```

---

## Notes & TODOs for the owner

Search `lib/content.ts` for **`TODO`** and replace:

- Real shop **address**, **business hours**, **phone/email**
- Real **stats** (years in business, customers served, delivery time)
- Real **prices** for every product (then `npm run pdf`)
- Real **customer reviews** (testimonials)
- Real **social links** (used in the footer and SEO)
- The **Google Maps embed** URL (`business.mapEmbedSrc`)
- Replace placeholder **product photos** in `public/images/`

Everything is commented and lives in one place so updates don't require touching
component code.
