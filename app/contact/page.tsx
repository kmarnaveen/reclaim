import type { Metadata } from "next";
import { siteUrl, contact, whatsappUrl } from "../../lib/site";
import Link from "next/link";
import { EnquiryForm } from "../../components/enquiry-form";
import { JsonLd } from "../../components/json-ld";

const baseUrl = siteUrl;

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a scrap purchase, sale or sourcing requirement to Diyar e Taiba.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Send a Scrap Trade Enquiry | Diyar e Taiba",
    description: "Submit a structured metal, rubber, textile or paper scrap buy/sell requirement.",
    url: `${baseUrl}/contact`,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/contact#webpage`,
    url: `${baseUrl}/contact`,
    name: "Send a Scrap Trade Enquiry",
    description: "A structured enquiry route for buying, selling or sourcing scrap materials.",
    isPartOf: { "@id": `${baseUrl}/#website` },
  };

  return (
    <main>
      <JsonLd data={contactSchema} />
      <section className="contact-hero">
        <p className="eyebrow"><span /> Buy · Sell · Source</p>
        <h1>Start with<br /><em>the material.</em></h1>
        <p>
          Tell us what you have or need, where it is, the approximate volume
          and the target market. We will start by checking commercial fit.
        </p>
        <div className="contact-options">
          <a href="#trade-enquiry"><span>Sell</span><strong>Offer a scrap lot</strong><b>↓</b></a>
          <a href="?intent=source#trade-enquiry"><span>Source</span><strong>Send a buying requirement</strong><b>↓</b></a>
        </div>
      </section>

      <section className="enquiry-section" id="trade-enquiry">
        <div className="enquiry-heading">
          <p className="kicker">Trade enquiry</p>
          <h2>Describe the lot<br /><em>or requirement.</em></h2>
          <p>
            This form records the enquiry directly so your first message contains
            the details needed for a useful commercial review.
          </p>
          <div className="enquiry-markets">
            <span>India</span><span>Europe</span><span>Middle East</span>
          </div>
        </div>
        <EnquiryForm />
      </section>

      <section className="contact-details">
        <div className="contact-detail-block">
          <span>Registered office</span>
          <address>
            {contact.address.street}<br />
            {contact.address.locality}, {contact.address.region} {contact.address.postalCode}<br />
            {contact.address.country}
          </address>
        </div>
        <div className="contact-detail-block">
          <span>WhatsApp</span>
          <ul className="contact-whatsapp">
            {contact.whatsapp.map((line) => (
              <li key={line.number}>
                <a href={whatsappUrl(line.number)} rel="noopener noreferrer" target="_blank">
                  {line.display}<b aria-hidden="true">↗</b>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact-detail-block">
          <span>Hours</span>
          <p>Enquiries are reviewed on working days. Send the material, quantity and destination in the first message for a faster reply.</p>
        </div>
      </section>

      <section className="contact-directions">
        <p>For the fastest review, include:</p>
        <div><span>01</span><strong>Material and grade</strong></div>
        <div><span>02</span><strong>Quantity and frequency</strong></div>
        <div><span>03</span><strong>Location and market</strong></div>
        <div><span>04</span><strong>Photos or specification</strong></div>
        <Link className="button button-dark" href="/materials">Browse material categories <span>↗</span></Link>
      </section>
    </main>
  );
}
