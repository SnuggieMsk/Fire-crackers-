/**
 * ============================================================================
 *  HARSHA FIRECRACKER — CENTRAL CONTENT & CONFIG FILE
 * ============================================================================
 *  This is the ONE place the owner edits to update the whole website.
 *  Everything here is plain data (no React), so it is also imported by the
 *  build-time price-list PDF generator (scripts/generate-pricelist.tsx) — which
 *  keeps the website and the PDF perfectly in sync.
 *
 *  Each piece of copy is a { en, ta } pair so the EN | தமிழ் toggle can switch
 *  the entire site instantly. Edit BOTH languages when you change text.
 *
 *  Search for "TODO" to find every placeholder you should replace with real
 *  business details (address, hours, stats, reviews, prices).
 * ============================================================================
 */

/** A bilingual string. `en` = English, `ta` = Tamil (natural translation). */
export type LangString = { en: string; ta: string };

// ─────────────────────────────────────────────────────────────────────────────
// 1. BUSINESS DETAILS  (edit your contact info here)
// ─────────────────────────────────────────────────────────────────────────────
export const business = {
  name: "Harsha Firecracker",
  /** Bilingual brand tagline used near the logo. */
  nameTa: "ஹர்ஷா ஃபயர்கிராக்கர்",
  // Primary WhatsApp ordering number. Digits only, with country code (91 = India).
  whatsappNumber: "918668050712",
  // Human-readable phone for display / tel: links.
  phoneDisplay: "+91 86680 50712",
  // TODO: replace with the real shop address.
  address: {
    en: "TODO: 123 Main Bazaar Road, Chennai, Tamil Nadu 600001",
    ta: "TODO: 123 மெயின் பஜார் சாலை, சென்னை, தமிழ்நாடு 600001",
  } as LangString,
  // TODO: replace with real business hours.
  hours: {
    en: "TODO: Mon–Sun, 9:00 AM – 9:00 PM (extended hours during Diwali)",
    ta: "TODO: திங்கள்–ஞாயிறு, காலை 9:00 – இரவு 9:00 (தீபாவளியில் கூடுதல் நேரம்)",
  } as LangString,
  email: "msanthoshkumar2499@gmail.com", // TODO: replace with business email if different
  // Geo coordinates for SEO JSON-LD (Chennai city centre placeholder).
  // TODO: replace with your shop's exact latitude/longitude.
  geo: { latitude: 13.0827, longitude: 80.2707 },
  // Google Maps embed src — TODO: replace with your shop's embed URL.
  // (Google Maps → your shop → Share → Embed a map → copy the src URL.)
  mapEmbedSrc:
    "https://www.google.com/maps?q=Chennai,Tamil+Nadu,India&output=embed",
  // Social links — TODO: paste real profile URLs (used for footer + SEO sameAs).
  social: {
    instagram: "", // e.g. https://instagram.com/harshafirecracker
    facebook: "",
    youtube: "",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. DIWALI COUNTDOWN DATE  (bump this once a year)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Target date for the live countdown. ISO format, India time (UTC+5:30).
 * Upcoming Diwali (Lakshmi Puja) dates for easy yearly updates:
 *   • 2026 → 8  November 2026   ← current target
 *   • 2027 → 29 October 2027
 *   • 2028 → 17 November 2028
 *   • 2029 → 5  November 2029
 *   • 2030 → 26 October 2030
 */
export const DIWALI_DATE_ISO = "2026-11-08T00:00:00+05:30";

// ─────────────────────────────────────────────────────────────────────────────
// 3. NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
export const nav: { id: string; label: LangString }[] = [
  { id: "about", label: { en: "About", ta: "எங்களைப் பற்றி" } },
  { id: "catalogue", label: { en: "Catalogue", ta: "தயாரிப்புகள்" } },
  { id: "offers", label: { en: "Offers", ta: "சலுகைகள்" } },
  { id: "bulk", label: { en: "Bulk Orders", ta: "மொத்த ஆர்டர்" } },
  { id: "contact", label: { en: "Contact", ta: "தொடர்பு" } },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. UI STRINGS  (buttons & shared labels)
// ─────────────────────────────────────────────────────────────────────────────
export const ui = {
  orderWhatsApp: { en: "Order on WhatsApp", ta: "WhatsApp-ல் ஆர்டர்" },
  viewCatalogue: { en: "View Catalogue", ta: "தயாரிப்புகளைப் பார்க்க" },
  enquireWhatsApp: { en: "Enquire on WhatsApp", ta: "WhatsApp-ல் கேளுங்கள்" },
  downloadPriceList: { en: "Download Price List (PDF)", ta: "விலைப்பட்டியல் (PDF)" },
  continueWhatsApp: { en: "Continue on WhatsApp", ta: "WhatsApp-ல் தொடரவும்" },
  langToggleAria: { en: "Switch language", ta: "மொழியை மாற்று" },
  menu: { en: "Menu", ta: "மெனு" },
  backToHome: { en: "Back to Home", ta: "முகப்புக்குத் திரும்பு" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. HERO
// ─────────────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: {
    en: "Chennai's Trusted Firecracker Distributor",
    ta: "சென்னையின் நம்பிக்கைக்குரிய பட்டாசு விநியோகஸ்தர்",
  } as LangString,
  title: {
    en: "Light Up Your Diwali",
    ta: "உங்கள் தீபாவளியை ஒளிரச் செய்யுங்கள்",
  } as LangString,
  titleAccent: {
    en: "with a Sky Full of Colour",
    ta: "வண்ணமயமான வானத்துடன்",
  } as LangString,
  subtitle: {
    en: "Premium crackers, sparklers, gift boxes & combos — at the best wholesale and retail prices in Chennai. Order in seconds on WhatsApp.",
    ta: "உயர்தர பட்டாசுகள், மத்தாப்புகள், பரிசுப் பெட்டிகள் மற்றும் காம்போக்கள் — சென்னையில் சிறந்த மொத்த மற்றும் சில்லறை விலையில். WhatsApp-ல் நொடிகளில் ஆர்டர் செய்யுங்கள்.",
  } as LangString,
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. TRUST BAR  (TODO: replace placeholder numbers with real figures)
// ─────────────────────────────────────────────────────────────────────────────
export const trustStats: { value: string; label: LangString }[] = [
  { value: "TODO 15+", label: { en: "Years in Business", ta: "ஆண்டுகள் அனுபவம்" } },
  { value: "TODO 50,000+", label: { en: "Happy Customers", ta: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" } },
  { value: "100%", label: { en: "Certified & Safe", ta: "சான்றளிக்கப்பட்ட & பாதுகாப்பான" } },
  { value: "TODO 24 hr", label: { en: "Fast Chennai Delivery", ta: "வேகமான சென்னை டெலிவரி" } },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. ABOUT
// ─────────────────────────────────────────────────────────────────────────────
export const about = {
  heading: { en: "About Harsha Firecracker", ta: "ஹர்ஷா ஃபயர்கிராக்கர் பற்றி" } as LangString,
  body: [
    {
      en: "For families across Chennai, Diwali means light, laughter and the joy of bursting crackers together. At Harsha Firecracker, we have been bringing that joy home for years — sourcing the finest Sivakasi crackers and delivering them with a smile.",
      ta: "சென்னை குடும்பங்களுக்கு தீபாவளி என்பது ஒளி, சிரிப்பு மற்றும் ஒன்றாக பட்டாசு வெடிக்கும் மகிழ்ச்சி. ஹர்ஷா ஃபயர்கிராக்கரில், சிறந்த சிவகாசி பட்டாசுகளை தேர்ந்தெடுத்து, புன்னகையுடன் வழங்கி, அந்த மகிழ்ச்சியை பல ஆண்டுகளாக உங்கள் வீட்டிற்கு கொண்டு வருகிறோம்.",
    },
    {
      en: "From a single sparkler for the little ones to truck-loads for retailers and big community celebrations, we serve everyone with the same promise: genuine quality, honest prices, and on-time delivery.",
      ta: "சிறியவர்களுக்கான ஒரு மத்தாப்பு முதல் சில்லறை விற்பனையாளர்கள் மற்றும் பெரிய சமூக கொண்டாட்டங்களுக்கான லாரி நிறைய பட்டாசுகள் வரை, ஒரே வாக்குறுதியுடன் அனைவருக்கும் சேவை செய்கிறோம்: உண்மையான தரம், நேர்மையான விலை, மற்றும் சரியான நேரத்தில் டெலிவரி.",
    },
  ] as LangString[],
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. PRODUCT CATEGORIES  (drives the catalogue grid AND the price-list PDF)
//    • image: file inside /public/images — swap with the owner's real photos.
//    • price: PLACEHOLDER — owner edits here; PDF regenerates from these values.
// ─────────────────────────────────────────────────────────────────────────────
export type Category = {
  id: string;
  name: LangString;
  blurb: LangString;
  image: string;
  /** Placeholder price string for the catalogue + PDF. TODO: set real prices. */
  price: string;
};

export const categories: Category[] = [
  {
    id: "sparklers",
    name: { en: "Sparklers", ta: "மத்தாப்புகள்" },
    blurb: {
      en: "Golden, colour & electric sparklers that light up little hands and big smiles.",
      ta: "தங்க, வண்ண மற்றும் எலக்ட்ரிக் மத்தாப்புகள் — சிறுவர்களின் கைகளையும் பெரிய புன்னகைகளையும் ஒளிரச் செய்கின்றன.",
    },
    image: "/images/sparklers.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "flower-pots",
    name: { en: "Flower Pots", ta: "பூச்சட்டிகள்" },
    blurb: {
      en: "Classic fountains that bloom into glittering showers of gold and colour.",
      ta: "தங்கம் மற்றும் வண்ண பொறிகளாக மலரும் பாரம்பரிய பூச்சட்டிகள்.",
    },
    image: "/images/flower-pots.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "ground-chakkars",
    name: { en: "Ground Chakkars", ta: "நிலச் சக்கரம்" },
    blurb: {
      en: "Spinning wheels of fire that dance across the ground in dazzling circles.",
      ta: "தரையில் கண்கவர் வட்டங்களாக சுழலும் நெருப்பு சக்கரங்கள்.",
    },
    image: "/images/ground-chakkars.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "rockets",
    name: { en: "Rockets", ta: "ராக்கெட்டுகள்" },
    blurb: {
      en: "Whistling rockets that shoot high and burst into brilliant night-sky stars.",
      ta: "உயரே பறந்து இரவு வானில் ஒளிரும் நட்சத்திரங்களாக வெடிக்கும் ராக்கெட்டுகள்.",
    },
    image: "/images/rockets.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "aerial-sky-shots",
    name: { en: "Aerial / Sky Shots", ta: "வான வேடிக்கைகள்" },
    blurb: {
      en: "Multi-shot aerials that paint the sky with layered bursts of colour.",
      ta: "வானத்தை அடுக்கடுக்கான வண்ண வெடிப்புகளால் வரையும் மல்டி-ஷாட் வான வேடிக்கைகள்.",
    },
    image: "/images/aerial.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "fountains",
    name: { en: "Fountains", ta: "நீரூற்றுகள்" },
    blurb: {
      en: "Long-lasting fountains throwing soft, sparkling columns of light.",
      ta: "மென்மையான, பளபளக்கும் ஒளி நெடுவரிசைகளை வீசும் நீடித்து நிற்கும் நீரூற்றுகள்.",
    },
    image: "/images/fountains.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "gift-boxes",
    name: { en: "Gift Boxes", ta: "பரிசுப் பெட்டிகள்" },
    blurb: {
      en: "Beautifully assorted gift boxes — the perfect Diwali present for loved ones.",
      ta: "அழகாக தொகுக்கப்பட்ட பரிசுப் பெட்டிகள் — அன்பானவர்களுக்கு சரியான தீபாவளி பரிசு.",
    },
    image: "/images/gift-boxes.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "kids-crackers",
    name: { en: "Kids' Crackers", ta: "குழந்தைகள் பட்டாசு" },
    blurb: {
      en: "Safe, low-noise fun — pop-pops, ground spinners and colourful novelties.",
      ta: "பாதுகாப்பான, குறைந்த சத்த வேடிக்கை — பாப்-பாப்ஸ், ஸ்பின்னர்கள் மற்றும் வண்ணப் புதுமைகள்.",
    },
    image: "/images/kids.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "sound-crackers",
    name: { en: "Sound Crackers", ta: "சத்த பட்டாசு" },
    blurb: {
      en: "Powerful garlands and bijili for those who love a proper Diwali bang.",
      ta: "சரியான தீபாவளி சத்தத்தை விரும்புபவர்களுக்கான சக்திவாய்ந்த சரவெடி மற்றும் பிஜிலி.",
    },
    image: "/images/sound.jpg",
    price: "TODO ₹—/box",
  },
  {
    id: "combo-boxes",
    name: { en: "Diwali Combo Boxes", ta: "தீபாவளி காம்போ பெட்டிகள்" },
    blurb: {
      en: "Value-packed family combos with a little of everything — best value of the season.",
      ta: "எல்லாவற்றிலும் கொஞ்சம் கொண்ட மதிப்புமிக்க குடும்ப காம்போக்கள் — சீசனின் சிறந்த மதிப்பு.",
    },
    image: "/images/combo.jpg",
    price: "TODO ₹—/box",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. DIWALI OFFERS  (TODO: edit seasonal deals here)
// ─────────────────────────────────────────────────────────────────────────────
export const offers = {
  heading: { en: "Diwali 2026 Special Offers", ta: "தீபாவளி 2026 சிறப்பு சலுகைகள்" } as LangString,
  subheading: {
    en: "Festive deals while stocks last — message us to grab them before they're gone.",
    ta: "இருப்பு இருக்கும் வரை பண்டிகை சலுகைகள் — தீர்வதற்கு முன் பெற எங்களுக்கு செய்தி அனுப்புங்கள்.",
  } as LangString,
  deals: [
    {
      tag: { en: "Combo Deal", ta: "காம்போ சலுகை" },
      title: { en: "Family Mega Combo", ta: "குடும்ப மெகா காம்போ" },
      desc: {
        en: "TODO: 50+ assorted items for the whole family at one special price.",
        ta: "TODO: முழு குடும்பத்திற்கும் 50+ பல்வேறு பொருட்கள் ஒரு சிறப்பு விலையில்.",
      },
      highlight: { en: "TODO Save 30%", ta: "TODO 30% சேமியுங்கள்" },
    },
    {
      tag: { en: "Bulk Offer", ta: "மொத்த சலுகை" },
      title: { en: "Wholesale Bumper Pack", ta: "மொத்த பம்பர் பேக்" },
      desc: {
        en: "TODO: Special distributor pricing on orders above a set quantity.",
        ta: "TODO: குறிப்பிட்ட அளவுக்கு மேல் ஆர்டர்களுக்கு சிறப்பு விநியோகஸ்தர் விலை.",
      },
      highlight: { en: "TODO Best Rate", ta: "TODO சிறந்த விலை" },
    },
    {
      tag: { en: "Early Bird", ta: "முன்பதிவு" },
      title: { en: "Book Early & Save", ta: "முன்கூட்டியே பதிவு செய்து சேமியுங்கள்" },
      desc: {
        en: "TODO: Pre-book before the rush for guaranteed stock and extra discount.",
        ta: "TODO: உறுதியான இருப்பு மற்றும் கூடுதல் தள்ளுபடிக்கு கூட்டத்திற்கு முன் முன்பதிவு செய்யுங்கள்.",
      },
      highlight: { en: "TODO Extra 10% Off", ta: "TODO கூடுதல் 10% தள்ளுபடி" },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. BULK / B2B
// ─────────────────────────────────────────────────────────────────────────────
export const bulk = {
  heading: { en: "Bulk & Distribution Orders", ta: "மொத்த & விநியோக ஆர்டர்கள்" } as LangString,
  subheading: {
    en: "For retailers, resellers, event organisers & community celebrations.",
    ta: "சில்லறை விற்பனையாளர்கள், மறுவிற்பனையாளர்கள், நிகழ்ச்சி அமைப்பாளர்கள் & சமூக கொண்டாட்டங்களுக்கு.",
  } as LangString,
  points: [
    {
      en: "Wholesale distributor pricing with the best margins in Chennai.",
      ta: "சென்னையில் சிறந்த லாபத்துடன் மொத்த விநியோகஸ்தர் விலை.",
    },
    {
      en: "Bulk supply for shops, apartments, RWAs, schools & corporate events.",
      ta: "கடைகள், அபார்ட்மென்ட்கள், சங்கங்கள், பள்ளிகள் & நிறுவன நிகழ்ச்சிகளுக்கு மொத்த விநியோகம்.",
    },
    {
      en: "Reliable stock, timely delivery and dedicated support throughout the season.",
      ta: "நம்பகமான இருப்பு, சரியான நேர டெலிவரி மற்றும் சீசன் முழுவதும் சிறப்பு ஆதரவு.",
    },
  ] as LangString[],
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. WHY CHOOSE US
// ─────────────────────────────────────────────────────────────────────────────
export const whyChooseUs = {
  heading: { en: "Why Choose Harsha Firecracker", ta: "ஏன் ஹர்ஷா ஃபயர்கிராக்கர்?" } as LangString,
  items: [
    {
      icon: "shield",
      title: { en: "Certified Quality", ta: "சான்றளிக்கப்பட்ட தரம்" },
      desc: {
        en: "Genuine, safety-tested crackers sourced from trusted Sivakasi makers.",
        ta: "நம்பகமான சிவகாசி தயாரிப்பாளர்களிடமிருந்து உண்மையான, பாதுகாப்பு-சோதிக்கப்பட்ட பட்டாசுகள்.",
      },
    },
    {
      icon: "sparkles",
      title: { en: "Huge Variety", ta: "ஏராளமான வகைகள்" },
      desc: {
        en: "Hundreds of items — from kids' novelties to grand aerial sky shots.",
        ta: "நூற்றுக்கணக்கான பொருட்கள் — குழந்தைகள் புதுமைகள் முதல் பிரம்மாண்ட வான வேடிக்கைகள் வரை.",
      },
    },
    {
      icon: "tag",
      title: { en: "Best Prices", ta: "சிறந்த விலைகள்" },
      desc: {
        en: "Direct distributor rates mean honest, unbeatable prices for you.",
        ta: "நேரடி விநியோகஸ்தர் விலை என்பதால் உங்களுக்கு நேர்மையான, ஈடு இணையற்ற விலைகள்.",
      },
    },
    {
      icon: "truck",
      title: { en: "On-Time Delivery", ta: "சரியான நேர டெலிவரி" },
      desc: {
        en: "Fast, safe delivery across Chennai so your celebration is never delayed.",
        ta: "சென்னை முழுவதும் வேகமான, பாதுகாப்பான டெலிவரி — உங்கள் கொண்டாட்டம் தாமதமாகாது.",
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. SAFETY
// ─────────────────────────────────────────────────────────────────────────────
export const safety = {
  heading: { en: "Celebrate Safely & Responsibly", ta: "பாதுகாப்பாக & பொறுப்புடன் கொண்டாடுங்கள்" } as LangString,
  body: {
    en: "We supply only certified, quality-checked crackers. Please burst responsibly — light in open spaces, keep water nearby, supervise children, and follow all local guidelines and timings. A safe Diwali is a happy Diwali.",
    ta: "சான்றளிக்கப்பட்ட, தரம் சரிபார்க்கப்பட்ட பட்டாசுகளை மட்டுமே நாங்கள் வழங்குகிறோம். தயவுசெய்து பொறுப்புடன் வெடியுங்கள் — திறந்தவெளியில் வெடியுங்கள், அருகில் தண்ணீர் வைத்திருங்கள், குழந்தைகளை கவனியுங்கள், மற்றும் அனைத்து உள்ளூர் வழிகாட்டுதல்களையும் நேரங்களையும் பின்பற்றுங்கள். பாதுகாப்பான தீபாவளியே மகிழ்ச்சியான தீபாவளி.",
  } as LangString,
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. TESTIMONIALS  (TODO: replace with real customer reviews)
// ─────────────────────────────────────────────────────────────────────────────
export const testimonials: { quote: LangString; name: string; role: LangString }[] = [
  {
    quote: {
      en: "TODO: Best prices in Chennai and the gift boxes were a big hit with my family. Will order every Diwali!",
      ta: "TODO: சென்னையில் சிறந்த விலை, பரிசுப் பெட்டிகள் என் குடும்பத்திற்கு மிகவும் பிடித்திருந்தது. ஒவ்வொரு தீபாவளிக்கும் ஆர்டர் செய்வேன்!",
    },
    name: "TODO Priya R.",
    role: { en: "Retail Customer, Adyar", ta: "சில்லறை வாடிக்கையாளர், அடையாறு" },
  },
  {
    quote: {
      en: "TODO: Ordered in bulk for our apartment Diwali event. Smooth delivery and great wholesale rates.",
      ta: "TODO: எங்கள் அபார்ட்மென்ட் தீபாவளி நிகழ்ச்சிக்கு மொத்தமாக ஆர்டர் செய்தோம். சுலபமான டெலிவரி, சிறந்த மொத்த விலை.",
    },
    name: "TODO Karthik S.",
    role: { en: "Apartment Association, Velachery", ta: "அபார்ட்மென்ட் சங்கம், வேளச்சேரி" },
  },
  {
    quote: {
      en: "TODO: As a shop owner I get reliable stock and the best margins. My go-to distributor every season.",
      ta: "TODO: ஒரு கடை உரிமையாளராக நம்பகமான இருப்பும் சிறந்த லாபமும் கிடைக்கிறது. ஒவ்வொரு சீசனிலும் என் முதல் தேர்வு.",
    },
    name: "TODO Anand M.",
    role: { en: "Retailer, T. Nagar", ta: "சில்லறை விற்பனையாளர், டி. நகர்" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 14. LEAD FORM LABELS
// ─────────────────────────────────────────────────────────────────────────────
export const leadForm = {
  heading: { en: "Get a Quote / Enquire", ta: "விலை விவரம் / விசாரணை" } as LangString,
  subheading: {
    en: "Tell us what you need and we'll get back to you fast. (Required: Name & Phone)",
    ta: "உங்களுக்கு என்ன தேவை என்று சொல்லுங்கள், விரைவில் தொடர்பு கொள்கிறோம். (அவசியம்: பெயர் & தொலைபேசி)",
  } as LangString,
  fields: {
    name: { en: "Your Name", ta: "உங்கள் பெயர்" },
    phone: { en: "Phone Number", ta: "தொலைபேசி எண்" },
    city: { en: "City / Area", ta: "நகரம் / பகுதி" },
    customerType: { en: "Customer Type", ta: "வாடிக்கையாளர் வகை" },
    products: { en: "Products Interested In", ta: "ஆர்வமுள்ள தயாரிப்புகள்" },
    message: { en: "Message", ta: "செய்தி" },
  },
  customerTypes: [
    { value: "retail", label: { en: "Retail", ta: "சில்லறை" } },
    { value: "bulk", label: { en: "Bulk / Wholesale", ta: "மொத்த / விநியோகம்" } },
    { value: "event", label: { en: "Event", ta: "நிகழ்ச்சி" } },
  ],
  submit: { en: "Send Enquiry", ta: "விசாரணையை அனுப்பு" },
  sending: { en: "Sending…", ta: "அனுப்புகிறது…" },
  successTitle: { en: "Thank you!", ta: "நன்றி!" },
  successBody: {
    en: "Your enquiry has been sent. We'll contact you shortly. Prefer instant? Continue on WhatsApp below.",
    ta: "உங்கள் விசாரணை அனுப்பப்பட்டது. விரைவில் தொடர்பு கொள்கிறோம். உடனடியாக வேண்டுமா? கீழே WhatsApp-ல் தொடரவும்.",
  },
  errorBody: {
    en: "Something went wrong. Please try again, or reach us directly on WhatsApp.",
    ta: "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும், அல்லது நேரடியாக WhatsApp-ல் தொடர்பு கொள்ளவும்.",
  },
  validation: {
    nameRequired: { en: "Please enter your name.", ta: "உங்கள் பெயரை உள்ளிடவும்." },
    phoneRequired: { en: "Please enter a valid phone number.", ta: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்." },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 15. CONTACT / FOOTER
// ─────────────────────────────────────────────────────────────────────────────
export const contact = {
  heading: { en: "Visit or Contact Us", ta: "எங்களைச் சந்திக்க / தொடர்பு கொள்ள" } as LangString,
  addressLabel: { en: "Address", ta: "முகவரி" } as LangString,
  hoursLabel: { en: "Business Hours", ta: "வணிக நேரம்" } as LangString,
  phoneLabel: { en: "Phone / WhatsApp", ta: "தொலைபேசி / WhatsApp" } as LangString,
};

export const footer = {
  tagline: {
    en: "Chennai's trusted destination for premium Diwali crackers — retail & wholesale.",
    ta: "உயர்தர தீபாவளி பட்டாசுகளுக்கான சென்னையின் நம்பிக்கைக்குரிய இடம் — சில்லறை & மொத்தம்.",
  } as LangString,
  quickLinks: { en: "Quick Links", ta: "விரைவு இணைப்புகள்" } as LangString,
  contactHeading: { en: "Contact", ta: "தொடர்பு" } as LangString,
  rights: { en: "All rights reserved.", ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை." } as LangString,
  disclaimer: {
    en: "Sold and burst as per local laws and Supreme Court guidelines. Keep children supervised.",
    ta: "உள்ளூர் சட்டங்கள் மற்றும் உச்சநீதிமன்ற வழிகாட்டுதல்களின்படி விற்பனை செய்யப்பட்டு வெடிக்கப்படுகிறது. குழந்தைகளை கண்காணியுங்கள்.",
  } as LangString,
};

// ─────────────────────────────────────────────────────────────────────────────
// 16. SEO  (per-page metadata building blocks)
// ─────────────────────────────────────────────────────────────────────────────
export const seo = {
  defaultTitle:
    "Harsha Firecracker — Diwali Crackers in Chennai | Retail & Wholesale",
  defaultDescription:
    "Buy premium Diwali firecrackers in Chennai at the best prices. Sparklers, gift boxes, combos & wholesale supply. Sivakasi crackers, fast delivery. Order on WhatsApp.",
  keywords: [
    "firecrackers in Chennai",
    "Diwali crackers Chennai",
    "buy crackers online Chennai",
    "Sivakasi crackers Chennai",
    "firecracker wholesale Chennai",
    "firecracker distributor Chennai",
    "Diwali gift boxes Chennai",
    "crackers shop Chennai",
  ],
  catalogueTitle:
    "Cracker Catalogue & Price List — Harsha Firecracker, Chennai",
  catalogueDescription:
    "Browse our full range of Diwali crackers in Chennai — sparklers, flower pots, rockets, aerial shots, gift boxes & combo deals. Download the price list and order on WhatsApp.",
};
