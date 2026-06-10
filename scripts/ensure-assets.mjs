/**
 * ensure-assets.mjs
 * ----------------------------------------------------------------------------
 * Downloads and bundles all imagery + fonts into /public so the live site is
 * never dependent on remote URLs. It is IDEMPOTENT: files that already exist
 * are skipped, so it is safe to run on every `dev`/`build`.
 *
 * If a download fails (e.g. offline CI), it writes a tasteful festive SVG
 * placeholder instead, so the build NEVER breaks. The owner can drop their own
 * photos into /public/images using the same filenames to replace any image.
 *
 * Run manually any time with:  npm run assets
 * ----------------------------------------------------------------------------
 */
import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");
const fontsDir = join(root, "public", "fonts");

for (const dir of [imagesDir, fontsDir]) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// Curated, vivid firework / Diwali imagery — a mix of Unsplash and Wikimedia
// Commons photos, all bundled locally. Each entry maps to one image slot the
// site uses (see lib/content.ts).
const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const wm = (path) => `https://upload.wikimedia.org/wikipedia/commons/${path}`;

const images = [
  { file: "hero.jpg", url: u("1498931299472-f7a63a5a1cfa", 1920), label: "Fireworks" },
  { file: "sparklers.jpg", url: u("1467810563316-b5476525c0f9"), label: "Sparklers" },
  { file: "flower-pots.jpg", url: wm("thumb/6/6a/Diwali_crackers_at_Vizag_beach_1.jpg/1280px-Diwali_crackers_at_Vizag_beach_1.jpg"), label: "Flower Pots" },
  { file: "ground-chakkars.jpg", url: wm("thumb/d/d6/Three_colors_flashing_wheel.jpg/1280px-Three_colors_flashing_wheel.jpg"), label: "Ground Chakkars" },
  { file: "rockets.jpg", url: wm("thumb/a/a1/Fireworks_Launch.jpeg/1280px-Fireworks_Launch.jpeg"), label: "Rockets" },
  { file: "aerial.jpg", url: u("1533230408708-8f9f91d1235a"), label: "Aerial Sky Shots" },
  { file: "fountains.jpg", url: wm("thumb/6/6d/Beeston_MMB_29_Fireworks.jpg/1280px-Beeston_MMB_29_Fireworks.jpg"), label: "Fountains" },
  { file: "gift-boxes.jpg", url: u("1513885535751-8b9238bd345a"), label: "Gift Boxes" },
  { file: "kids.jpg", url: wm("thumb/3/38/Woman_holding_sparkler_%28Unsplash%29.jpg/1280px-Woman_holding_sparkler_%28Unsplash%29.jpg"), label: "Kids' Crackers" },
  { file: "sound.jpg", url: wm("thumb/d/d8/Crackers_at_Diwali_in_Guntur.jpg/1280px-Crackers_at_Diwali_in_Guntur.jpg"), label: "Sound Crackers" },
  { file: "combo.jpg", url: u("1607344645866-009c320b63e0"), label: "Combo Boxes" },
  { file: "diwali-lamps.jpg", url: wm("thumb/1/18/Diwali_Oil_lamps_Darjeeling.jpg/1280px-Diwali_Oil_lamps_Darjeeling.jpg"), label: "Diwali" },
  { file: "og-image.jpg", url: u("1498931299472-f7a63a5a1cfa", 1200), label: "Harsha Firecracker" },
];

// Fonts for the PDF (Tamil-capable). Bundled so PDF builds offline too.
const fonts = [
  {
    file: "NotoSans-Regular.ttf",
    url: "https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
  },
  {
    file: "NotoSans-Bold.ttf",
    url: "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Bold.ttf",
  },
  {
    file: "NotoSansTamil-Regular.ttf",
    url: "https://github.com/googlefonts/noto-fonts/raw/main/unhinted/ttf/NotoSansTamil/NotoSansTamil-Regular.ttf",
  },
  {
    file: "NotoSansTamil-Bold.ttf",
    url: "https://github.com/googlefonts/noto-fonts/raw/main/unhinted/ttf/NotoSansTamil/NotoSansTamil-Bold.ttf",
  },
];

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    // Descriptive UA — Wikimedia rejects blank/generic user agents.
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 HarshaFirecrackerSite/1.0 (asset bundler)" } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 6) {
        res.resume();
        return resolve(download(res.headers.location, dest, redirects + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const out = createWriteStream(dest);
      res.pipe(out);
      out.on("finish", () => out.close(() => resolve(true)));
      out.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error("timeout")));
  });
}

function placeholderSvg(label) {
  const palette = ["#ffce5c", "#ff9d3c", "#ff4f9a", "#39e0d0", "#a779ff"];
  const bursts = palette
    .map((c, i) => {
      const cx = 150 + i * 220 + (i % 2) * 60;
      const cy = 220 + (i % 3) * 160;
      const rays = Array.from({ length: 12 }, (_, k) => {
        const a = (k / 12) * Math.PI * 2;
        return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * 70}" y2="${
          cy + Math.sin(a) * 70
        }" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>`;
      }).join("");
      return `${rays}<circle cx="${cx}" cy="${cy}" r="6" fill="${c}"/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs><radialGradient id="bg" cx="50%" cy="20%" r="90%">
    <stop offset="0%" stop-color="#191845"/><stop offset="55%" stop-color="#0a0a1f"/><stop offset="100%" stop-color="#06060f"/>
  </radialGradient></defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  ${bursts}
  <text x="600" y="730" font-family="sans-serif" font-size="34" fill="#ffce5c" text-anchor="middle" font-weight="bold">${label}</text>
  <text x="600" y="770" font-family="sans-serif" font-size="18" fill="#9aa0c0" text-anchor="middle">Harsha Firecracker — replace with your photo</text>
</svg>`;
}

async function ensureImages() {
  for (const img of images) {
    const dest = join(imagesDir, img.file);
    if (existsSync(dest)) {
      console.log(`✓ image exists: ${img.file}`);
      continue;
    }
    try {
      await download(img.url, dest);
      console.log(`↓ downloaded image: ${img.file}`);
    } catch (e) {
      // Offline fallback: write a festive SVG placeholder next to the expected
      // filename so the build never breaks. Replace it (or drop a real .jpg of
      // the same name) whenever you have a connection or your own photo.
      const svgDest = dest.replace(/\.jpg$/, ".svg");
      await writeFile(svgDest, placeholderSvg(img.label), "utf8");
      console.warn(`⚠ could not download ${img.file} (${e.message}); wrote SVG fallback ${img.file.replace(/\.jpg$/, ".svg")}`);
    }
  }
}

async function ensureFonts() {
  for (const f of fonts) {
    const dest = join(fontsDir, f.file);
    if (existsSync(dest)) {
      console.log(`✓ font exists: ${f.file}`);
      continue;
    }
    try {
      await download(f.url, dest);
      console.log(`↓ downloaded font: ${f.file}`);
    } catch (e) {
      console.warn(`⚠ could not download font ${f.file} (${e.message}). PDF will fall back to a default font.`);
    }
  }
}

await ensureImages();
await ensureFonts();
console.log("✔ assets ready");
