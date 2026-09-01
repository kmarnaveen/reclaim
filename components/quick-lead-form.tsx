"use client";

import { type FormEvent, useState } from "react";
import { createReference, submitEnquiry } from "../lib/submit-enquiry";
import {
  alternateNumber,
  buildEnquiryMessage,
  openWhatsapp,
  primaryNumber,
  whatsappHandoffUrl,
} from "../lib/whatsapp";

const materialLabels: Record<string, string> = {
  metal: "Metal scrap",
  rubber: "Rubber scrap",
  textile: "Textile scrap",
  paper: "Paper scrap",
  mixed: "Mixed / other",
};

type QuickState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string; message: string; autoOpened: boolean }
  | { status: "error"; message: string };

export function QuickLeadForm() {
  const [state, setState] = useState<QuickState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState({ status: "submitting" });
    const reference = createReference();
    const tradeType = String(data.get("tradeType") || "");
    const material = String(data.get("material") || "");
    const contactDetail = String(data.get("contact") || "").trim();

    try {
      await submitEnquiry("quick-lead", {
        reference,
        tradeType,
        material,
        contact: contactDetail,
        consent: data.get("consent") === "yes",
        website: String(data.get("website") || ""),
        sourcePage: window.location.pathname,
        referrer: document.referrer,
      });
      const message = buildEnquiryMessage("Diyar e Taiba — quick enquiry", reference, [
        { label: "Requirement", value: tradeType },
        { label: "Material", value: materialLabels[material] ?? material },
        { label: "Reach me on", value: contactDetail },
      ]);

      form.reset();
      setState({
        status: "success",
        reference,
        message,
        autoOpened: openWhatsapp(whatsappHandoffUrl(primaryNumber.number, message)),
      });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Unable to send request." });
    }
  }

  if (state.status === "success") {
    return (
      <div className="quick-lead-success" role="status">
        <span>Request received</span>
        <strong>{state.reference}</strong>
        <p>
          {state.autoOpened
            ? "WhatsApp is opening with your request ready — press send."
            : "Send it to our team on WhatsApp."}
        </p>
        <a
          className="quick-lead-whatsapp"
          href={whatsappHandoffUrl(primaryNumber.number, state.message)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Send on WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <a
          className="quick-lead-alt"
          href={whatsappHandoffUrl(alternateNumber.number, state.message)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Use {alternateNumber.display} instead
        </a>
      </div>
    );
  }

  return (
    <form
      className="quick-lead-form"
      name="quick-lead"
      data-netlify="true"
      onSubmit={handleSubmit}
      aria-busy={state.status === "submitting"}
    >
      <input type="hidden" name="form-name" value="quick-lead" />
      <label><span>Requirement</span><select name="tradeType" defaultValue="Sell scrap"><option>Sell scrap</option><option>Source scrap</option></select></label>
      <label><span>Material</span><select name="material" required defaultValue=""><option value="" disabled>Select material</option><option value="metal">Metal</option><option value="rubber">Rubber</option><option value="textile">Textile</option><option value="paper">Paper</option><option value="mixed">Mixed / other</option></select></label>
      <label className="quick-contact"><span>Email or WhatsApp</span><input name="contact" required placeholder="you@company.com or +country code" /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="quick-consent"><input name="consent" value="yes" type="checkbox" required /><span>Contact me about this enquiry</span></label>
      <button type="submit" disabled={state.status === "submitting"}>{state.status === "submitting" ? "Sending…" : "Request a response"}<span>↗</span></button>
      {state.status === "error" && <p className="quick-lead-error" role="alert">{state.message}</p>}
    </form>
  );
}
