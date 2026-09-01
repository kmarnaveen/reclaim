import type { Metadata } from "next";
import { siteUrl } from "../../lib/site";
import Link from "next/link";
import { JsonLd } from "../../components/json-ld";

const baseUrl = siteUrl;

export const metadata: Metadata = {
  title: "Markets",
  description: "Scrap sourcing and supply coverage across India, Europe and the Middle East.",
  alternates: { canonical: "/markets" },
  openGraph: {
    title: "Scrap Trading Markets | Diyar e Taiba",
    description: "B2B scrap sourcing and supply coverage across India, Europe and the Middle East.",
    url: `${baseUrl}/markets`,
  },
};

const regions = [
  { id: "india", number: "01", name: "India", label: "Domestic sourcing & supply", copy: "Industrial scrap procurement, aggregation and delivery for mills, recyclers and processors across major Indian manufacturing regions.", routes: ["Factory and yard procurement", "Mill and processor supply", "Road and rail coordination", "Domestic tax documentation", "One-off and recurring lots", "Pan-India commercial matching"] },
  { id: "europe", number: "02", name: "Europe", label: "Recovered material trade", copy: "Container-ready ferrous, non-ferrous, paper, rubber and textile streams matched to buyer specifications and shipment requirements.", routes: ["EU and UK trade lanes", "Bale and container programmes", "Inspection-led acceptance", "Supplier and mill matching", "Shipment document alignment", "Grade-specific contracts"] },
  { id: "middle-east", number: "03", name: "Middle East", label: "GCC & regional corridors", copy: "Commercial scrap flows connected through major Gulf trading and industrial hubs for regional processing and onward supply.", routes: ["UAE and GCC corridors", "Port and inland movement", "Buyer-specific documentation", "Regional processor supply", "Re-export trade support", "Container and truck-lot matching"] },
];

export default function MarketsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/markets#service`,
    name: "B2B Scrap Sourcing and Supply",
    serviceType: "Scrap material sourcing, supply and trade coordination",
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Middle East" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Scrap Material Categories",
      itemListElement: ["Metal scrap", "Rubber scrap", "Textile scrap", "Paper scrap"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <section className="page-hero">
        <p className="eyebrow"><span /> Market coverage</p>
        <h1>Three regions.<br /><em>One trading partner.</em></h1>
        <div className="page-hero-bottom"><p>We connect scrap supply and industrial demand across India, Europe and the Middle East.</p><Link className="text-link" href="/contact">Discuss a trade lane <span>→</span></Link></div>
      </section>
      <section className="market-regions">
        {regions.map((region) => (
          <article id={region.id} key={region.id}>
            <div className="market-number">{region.number}</div>
            <div className="market-copy"><p>{region.label}</p><h2>{region.name}</h2><strong>{region.copy}</strong></div>
            <ul>{region.routes.map((route) => <li key={route}>{route}<span>↗</span></li>)}</ul>
          </article>
        ))}
      </section>
      <section className="market-flow">
        <div className="market-flow-heading">
          <p className="kicker">Cross-border operating model</p>
          <h2>One material.<br /><em>Five aligned decisions.</em></h2>
          <p>Every shipment is built around the actual grade, parties, origin, destination and route—not a generic export checklist.</p>
        </div>
        <div className="market-flow-steps">
          <article><span>01</span><h3>Commercial fit</h3><p>Material, volume, price basis and trade frequency.</p></article>
          <article><span>02</span><h3>Grade fit</h3><p>Buyer specification, condition and tolerance limits.</p></article>
          <article><span>03</span><h3>Route fit</h3><p>Inland movement, port pair, equipment and loading plan.</p></article>
          <article><span>04</span><h3>Document fit</h3><p>Transaction and shipment records for the agreed lane.</p></article>
          <article><span>05</span><h3>Delivery fit</h3><p>Arrival coordination and handling of agreed claims.</p></article>
        </div>
      </section>
      <section className="market-partners">
        <div>
          <p className="kicker">Supply side</p>
          <h2>We work with</h2>
          <div className="partner-list"><span>Factories</span><span>Scrap yards</span><span>Aggregators</span><span>Recovery plants</span><span>Converters</span><span>Demolition suppliers</span></div>
        </div>
        <div>
          <p className="kicker">Demand side</p>
          <h2>We supply to</h2>
          <div className="partner-list"><span>Mills</span><span>Foundries</span><span>Recyclers</span><span>Remelters</span><span>Fibre processors</span><span>Manufacturers</span></div>
        </div>
      </section>
      <section className="page-cta"><p>Buying or selling across these markets?</p><h2>Tell us the lane.</h2><Link className="button button-cream" href="/contact#trade-enquiry">Start a trade enquiry <span>↗</span></Link></section>
    </main>
  );
}
