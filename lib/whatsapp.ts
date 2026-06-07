import { business } from "./content";

/**
 * Build a WhatsApp click-to-chat link with a URL-encoded pre-filled message.
 * Always points at the business's primary ordering number.
 *
 * @param message - plain-text message to pre-fill (will be URL-encoded)
 */
export function waLink(message: string): string {
  const base = `https://wa.me/${business.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Context-aware pre-filled messages used across the site (English default — */
/* WhatsApp messages are kept in English so the shop reads them consistently). */
export const waMessages = {
  general: `Hi ${business.name}, I'd like to know more about your Diwali crackers — please share rates and availability.`,
  hero: `Hi ${business.name}, I'm interested in ordering Diwali crackers. Please share your price list and offers.`,
  bulk: `Hi ${business.name}, I'm interested in BULK / WHOLESALE crackers for distribution/an event. Please share bulk rates and availability.`,
  header: `Hi ${business.name}, I'd like to place an order for Diwali crackers.`,
  /** Per-product enquiry message. */
  product: (productEn: string) =>
    `Hi ${business.name}, I'm interested in your ${productEn} — please share rates and availability.`,
  /** Lead-form "continue on WhatsApp" with captured details. */
  lead: (d: {
    name: string;
    phone: string;
    city: string;
    type: string;
    products: string;
    message: string;
  }) =>
    `Hi ${business.name}, I'd like to enquire.\n` +
    `Name: ${d.name}\n` +
    `Phone: ${d.phone}\n` +
    (d.city ? `City/Area: ${d.city}\n` : "") +
    `Customer type: ${d.type}\n` +
    (d.products ? `Products: ${d.products}\n` : "") +
    (d.message ? `Message: ${d.message}` : ""),
};
