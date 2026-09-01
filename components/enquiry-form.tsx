"use client";

import { type FormEvent, useEffect, useState } from "react";
import { createReference, submitEnquiry } from "../lib/submit-enquiry";
import {
  alternateNumber,
  buildEnquiryMessage,
  openWhatsapp,
  primaryNumber,
  whatsappHandoffUrl,
} from "../lib/whatsapp";

const materialOptions = [
  ["metal", "Metal scrap"],
  ["rubber", "Rubber scrap"],
  ["textile", "Textile scrap"],
  ["paper", "Paper scrap"],
  ["mixed", "Mixed / multiple categories"],
  ["other", "Other or unsure"],
];

const allowedMaterials = materialOptions.map(([value]) => value);

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string; message: string; autoOpened: boolean }
  | { status: "error"; message: string };

const DEFAULT_TRADE_TYPE = "Sell scrap";

const materialLabel = (value: string) =>
  materialOptions.find(([option]) => option === value)?.[1] ?? value;

export function EnquiryForm() {
  const [tradeType, setTradeType] = useState(DEFAULT_TRADE_TYPE);
  const [material, setMaterial] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  // Read the `?material=` / `?intent=` hints from the material and hero links
  // after mount. Doing it here rather than with `useSearchParams` keeps the
  // whole form in the statically exported HTML instead of behind a Suspense
  // fallback, so it is present before hydration.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMaterial = params.get("material") ?? "";
    if (allowedMaterials.includes(requestedMaterial)) setMaterial(requestedMaterial);
    if (params.get("intent") === "source") setTradeType("Source scrap");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!email && !phone) {
      setSubmitState({ status: "error", message: "Add an email address or phone / WhatsApp number so we can respond." });
      return;
    }

    setSubmitState({ status: "submitting" });
    const reference = createReference();

    try {
      await submitEnquiry("trade-enquiry", {
        reference,
        tradeType,
        material,
        market: String(data.get("market") || ""),
        description: String(data.get("description") || ""),
        volume: String(data.get("volume") || ""),
        location: String(data.get("location") || ""),
        name: String(data.get("name") || ""),
        company: String(data.get("company") || ""),
        email,
        phone,
        notes: String(data.get("notes") || ""),
        website: String(data.get("website") || ""),
        consent: data.get("consent") === "yes",
        sourcePage: window.location.pathname + window.location.search,
        referrer: document.referrer,
      });

      const message = buildEnquiryMessage("Diyar e Taiba — trade enquiry", reference, [
        { label: "I want to", value: tradeType },
        { label: "Material", value: materialLabel(material) },
        { label: "Target market", value: String(data.get("market") || "") },
        { label: "Grade / description", value: String(data.get("description") || "") },
        { label: "Volume", value: String(data.get("volume") || "") },
        { label: "Location / destination", value: String(data.get("location") || "") },
        { label: "Name", value: String(data.get("name") || "") },
        { label: "Company", value: String(data.get("company") || "") },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Notes", value: String(data.get("notes") || "") },
      ]);

      form.reset();
      setTradeType(DEFAULT_TRADE_TYPE);
      setMaterial("");
      setSubmitState({
        status: "success",
        reference,
        message,
        autoOpened: openWhatsapp(whatsappHandoffUrl(primaryNumber.number, message)),
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "We could not submit the enquiry. Please try again.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <div className="lead-success" role="status">
        <span>Enquiry received</span>
        <h3>Your requirement is now with the Diyar e Taiba team.</h3>
        <p>
          Reference <strong>{submitState.reference}</strong>.{" "}
          {submitState.autoOpened
            ? "WhatsApp is opening with your enquiry ready — press send to deliver it to our team."
            : "Send it straight to our team on WhatsApp, or keep the reference ready for follow-up."}
        </p>
        <div className="lead-success-actions">
          <a
            className="button button-cargo"
            href={whatsappHandoffUrl(primaryNumber.number, submitState.message)}
            rel="noopener noreferrer"
            target="_blank"
          >
            Send on WhatsApp <span>↗</span>
          </a>
          <a
            className="text-button"
            href={whatsappHandoffUrl(alternateNumber.number, submitState.message)}
            rel="noopener noreferrer"
            target="_blank"
          >
            Use {alternateNumber.display} instead
          </a>
          <button className="text-button" type="button" onClick={() => setSubmitState({ status: "idle" })}>Submit another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="enquiry-form"
      name="trade-enquiry"
      data-netlify="true"
      onSubmit={handleSubmit}
      aria-busy={submitState.status === "submitting"}
    >
      <input type="hidden" name="form-name" value="trade-enquiry" />
      <div className="form-progress" aria-hidden="true">
        <span><b>01</b> Requirement</span><i /><span><b>02</b> Contact</span>
      </div>

      <fieldset>
        <legend>I want to</legend>
        <div className="trade-type-options">
          {["Sell scrap", "Source scrap", "Discuss both"].map((option) => (
            <label key={option}>
              <input type="radio" name="tradeType" value={option} checked={tradeType === option} onChange={() => setTradeType(option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="enquiry-form-grid">
        <label>
          <span>Material category *</span>
          <select name="material" required value={material} onChange={(event) => setMaterial(event.target.value)}>
            <option value="" disabled>Select category</option>
            {materialOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>
          <span>Target market *</span>
          <select name="market" required defaultValue="">
            <option value="" disabled>Select market</option>
            <option>India</option>
            <option>Europe</option>
            <option>Middle East</option>
            <option>Cross-border / multiple</option>
          </select>
        </label>
      </div>

      <label>
        <span>Grade or material description *</span>
        <textarea name="description" rows={3} required placeholder="e.g. OCC 11 bales, HMS 1 & 2 or whole truck tyres" />
      </label>

      <div className="enquiry-form-grid">
        <label><span>Approximate volume *</span><input name="volume" required placeholder="e.g. 40 MT monthly" /></label>
        <label><span>Material location / destination *</span><input name="location" required placeholder="City, country or port" /></label>
        <label><span>Your name *</span><input name="name" required autoComplete="name" placeholder="Full name" /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" /></label>
        <label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" /></label>
      </div>

      <details className="optional-fields">
        <summary>Add packing, frequency or specification details <span>+</span></summary>
        <label>
          <span>Additional notes</span>
          <textarea name="notes" rows={3} placeholder="Packing, contamination limits, frequency, delivery terms or buyer specification" />
        </label>
      </details>

      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>

      <label className="consent-check">
        <input name="consent" value="yes" type="checkbox" required />
        <span>I agree to be contacted about this trade enquiry.</span>
      </label>

      {submitState.status === "error" && <p className="form-error" role="alert">{submitState.message}</p>}

      <div className="enquiry-submit-row">
        <p>Your enquiry is recorded, then handed to WhatsApp pre-filled so you can send it to our team in one tap.</p>
        <button className="button button-cargo" type="submit" disabled={submitState.status === "submitting"}>
          {submitState.status === "submitting" ? "Submitting…" : "Submit trade enquiry"} <span>↗</span>
        </button>
      </div>
    </form>
  );
}
