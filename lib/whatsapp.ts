import { contact } from "./site";

/**
 * WhatsApp hand-off for the enquiry forms.
 *
 * The site is a static export, so it cannot send a message itself — that needs
 * the WhatsApp Business Cloud API and a server to hold the access token. What
 * we can do is compose the enquiry into a `wa.me` deep link addressed to the
 * team, so the sender's own WhatsApp opens with the full enquiry ready
 * and delivery costs them a single tap. The Netlify Forms record is written
 * first and independently, so an enquiry survives even if they never send.
 */

/** Deep-link target for the team. The first number is the primary line. */
export const primaryNumber = contact.whatsapp[0];
export const alternateNumber = contact.whatsapp[1];

/** `wa.me` caps out well below this; the guard keeps a pathological paste sane. */
const MAX_MESSAGE_LENGTH = 1800;

export type MessageField = {
  label: string;
  value: string | boolean | null | undefined;
};

export function buildEnquiryMessage(heading: string, reference: string, fields: MessageField[]) {
  const body = fields
    .map(({ label, value }) => {
      if (value === null || value === undefined || value === false) return null;
      const text = typeof value === "boolean" ? "Yes" : value.trim();
      return text ? `${label}: ${text}` : null;
    })
    .filter((line): line is string => line !== null)
    .join("\n");

  const message = `${heading}\nReference ${reference}\n\n${body}`;
  return message.length > MAX_MESSAGE_LENGTH
    ? `${message.slice(0, MAX_MESSAGE_LENGTH - 1)}…`
    : message;
}

export function whatsappHandoffUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens the hand-off link. Returns false when the browser blocked it — the
 * submit is `await`ed before we get here, so the user-gesture context is gone
 * and Safari/Firefox may refuse. Callers must render a real link as fallback.
 */
export function openWhatsapp(url: string) {
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  return Boolean(opened);
}
