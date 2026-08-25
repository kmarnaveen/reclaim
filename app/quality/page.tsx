import type { Metadata } from "next";
import { siteUrl } from "../../lib/site";
import Link from "next/link";
import { JsonLd } from "../../components/json-ld";

const baseUrl = siteUrl;

export const metadata: Metadata = {
  title: "Quality & Documentation",
  description: "A clear scrap inspection and documentation process for domestic and cross-border material movements.",
  alternates: { canonical: "/quality" },
  openGraph: {
    title: "Scrap Quality & Documentation | Diyar e Taiba",
    description: "How scrap grades, contamination, weights and shipment records are aligned before movement.",
    url: `${baseUrl}/quality`,
  },
};

const steps = [
  ["01", "Describe", "Material, source, grade, form, quantity and known contamination are declared."],
  ["02", "Inspect", "Representative visual checks, measurements and supporting records are aligned."],
  ["03", "Approve", "Commercial terms and acceptance criteria are agreed before loading."],
  ["04", "Document", "Weight, invoice, transport and shipment records follow the agreed trade lane."],
];

export default function QualityPage() {
  const qualitySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/quality#webpage`,
    url: `${baseUrl}/quality`,
    name: "Scrap Quality and Documentation",
    description: "A four-stage process covering material description, inspection, approval and transaction documentation.",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: ["Scrap inspection", "Material grading", "Contamination checks", "Shipment documentation"].map((name) => ({
      "@type": "Thing",
      name,
    })),
    inLanguage: "en",
  };

  return (
    <main>
      <JsonLd data={qualitySchema} />
      <section className="page-hero">
        <p className="eyebrow"><span /> Quality & documentation</p>
        <h1>Clarity before<br /><em>every movement.</em></h1>
        <div className="page-hero-bottom"><p>Every lot is handled against its agreed grade, condition, weight, origin and destination requirements.</p><Link className="text-link" href="/contact">Submit a lot for review <span>→</span></Link></div>
      </section>
      <section className="quality-steps">
        {steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section className="inspection-grid">
        <div className="inspection-heading">
          <p className="kicker">What gets aligned</p>
          <h2>Different scrap.<br /><em>Different checks.</em></h2>
          <p>The exact inspection plan changes with the material and buyer specification.</p>
        </div>
        <div className="inspection-cards">
          <article><span>Material identity</span><h3>Grade & composition</h3><p>Declared grade, source, alloy or fibre type, construction and expected recovery route.</p></article>
          <article><span>Material condition</span><h3>Contamination & moisture</h3><p>Attachments, coatings, dirt, oil, mixed content, odour, moisture and prohibited material.</p></article>
          <article><span>Physical lot</span><h3>Form & quantity</h3><p>Bale, bundle, chip or loose form; unit weight, total weight, loading pattern and packaging.</p></article>
          <article><span>Transaction</span><h3>Documents & evidence</h3><p>Photos, weighment, invoices, transport records and shipment documents as agreed.</p></article>
        </div>
      </section>
      <section className="document-regions">
        <div className="document-regions-heading"><p className="kicker">Documents follow the lane</p><h2>Domestic and cross-border records</h2></div>
        <div className="document-region-grid">
          <article><span>01</span><h3>India</h3><ul><li>Commercial invoice</li><li>Weight record</li><li>Transport and e-way documentation where applicable</li><li>Material declaration</li></ul></article>
          <article><span>02</span><h3>Europe</h3><ul><li>Contract and packing details</li><li>Loading and weight evidence</li><li>Origin and shipment documents</li><li>Agreed inspection records</li></ul></article>
          <article><span>03</span><h3>Middle East</h3><ul><li>Commercial and packing documents</li><li>Weight and loading records</li><li>Customs and trade-lane paperwork</li><li>Buyer-specific declarations</li></ul></article>
        </div>
        <p className="document-note">Final requirements are confirmed for the actual material, origin, destination and transaction before movement.</p>
      </section>
      <section className="page-cta"><p>Need a buyer-specific inspection plan?</p><h2>Share the specification.</h2><Link className="button button-cream" href="/contact?intent=source#trade-enquiry">Send acceptance criteria <span>↗</span></Link></section>
    </main>
  );
}
