/**
 * Canonical origin for metadata, sitemap, robots and JSON-LD.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the Netlify site settings once the production
 * domain is attached; the fallback keeps local builds and previews coherent.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://diyar-e-taiba.netlify.app"
).replace(/\/+$/, "");

/**
 * Registered trading address and WhatsApp contact points.
 *
 * Single source of truth: the visible contact block, the footer and the
 * Organization JSON-LD all read from here, so a correction lands in one place.
 */
export const contact = {
  address: {
    street: "9-11-4/5/a, Moti Darwaza, Golconda",
    locality: "Hyderabad",
    region: "Telangana",
    postalCode: "500008",
    country: "India",
    countryCode: "IN",
  },
  /** `number` is E.164 without the leading `+`; `display` is what users read. */
  whatsapp: [
    { number: "918500006457", display: "+91 85000 06457" },
    { number: "917729006457", display: "+91 77290 06457" },
  ],
} as const;

/**
 * How long the business has been trading, as a relative phrase rather than a
 * founding date. Relative wording goes stale on its own — bump this one
 * constant and every place that states it follows.
 */
export const yearsInTrade = "over two years";

export const contactAddressLine = [
  contact.address.street,
  contact.address.locality,
  contact.address.region,
  contact.address.postalCode,
  contact.address.country,
].join(", ");

export const whatsappUrl = (number: string) => `https://wa.me/${number}`;
