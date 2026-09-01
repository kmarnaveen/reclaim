import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/json-ld";
import { siteUrl, contact, whatsappUrl, yearsInTrade } from "../../lib/site";
import { materialCategories } from "../../lib/materials";
import { industrialAreas, marketNames, type Market } from "../../lib/locations";

const baseUrl = siteUrl;
const markets: Market[] = ["india", "europe", "middle-east"];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Diyar e Taiba is a scrap materials trading business based in Hyderabad, buying and supplying metal, rubber, textile and paper across India, Europe and the Middle East.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Diyar e Taiba | Scrap Materials Trading",
    description:
      "A trading partner for recovered metal, rubber, textile and paper — one accountable counterparty for grade, quantity, documentation and movement.",
    url: `${baseUrl}/about`,
  },
};

const principles = [
  ["01", "One counterparty", "The same team answers for grade, quantity, documents and movement. Nothing is handed off to a party you have not dealt with."],
  ["02", "Inspection before commitment", "Material is described, checked and agreed against acceptance criteria before anything is loaded."],
  ["03", "Records that match the lane", "Weight, invoice, transport and shipment paperwork are prepared for the actual route, not a generic template."],
  ["04", "Both sides of the trade", "We buy from yards and factories and supply mills and processors, so we understand what each side needs to see."],
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}/about#webpage`,
    url: `${baseUrl}/about`,
    name: "About Diyar e Taiba",
    description:
      "A scrap materials trading business based in Hyderabad, dealing in recovered metal, rubber, textile and paper across India, Europe and the Middle East.",
    isPartOf: { "@id": `${baseUrl}/#website` },
    mainEntity: { "@id": `${baseUrl}/#organization` },
    inLanguage: "en",
  };

  return (
    <main>
      <JsonLd data={aboutSchema} />

      <section className="page-hero">
        <p className="eyebrow"><span /> About us</p>
        <h1>The team behind<br /><em>the material.</em></h1>
        <div className="page-hero-bottom">
          <p>
            We buy recovered metal, rubber, textile and paper, and supply it to the
            mills, recyclers and processors that can actually use it.
          </p>
          <Link className="text-link" href="/contact">Talk to our team <span>→</span></Link>
        </div>
      </section>

      <section className="about-page-intro">
        <div className="split-heading compact">
          <div>
            <p className="kicker">Who we are</p>
            <h2>A trading partner,<br /><em>not a marketplace.</em></h2>
          </div>
          <div>
            <p>
              Diyar e Taiba is a scrap materials trading business based in Golconda,
              Hyderabad. We have been active in the trade for {yearsInTrade}, working
              across four recovered material streams — metal, rubber, textile and
              paper — in India, Europe and the Middle East.
            </p>
            <p>
              We are not a listing platform. Every lot passes through one team that
              stays accountable from the first enquiry to the final document, which
              is the difference between knowing what is arriving and hoping.
            </p>
          </div>
        </div>

        <dl className="about-facts">
          <div>
            <dt>Based</dt>
            <dd>{contact.address.street}<br />{contact.address.locality}, {contact.address.region}</dd>
          </div>
          <div>
            <dt>Categories</dt>
            <dd>{materialCategories.map((category) => category.name.replace(" Scrap", "")).join(" · ")}</dd>
          </div>
          <div>
            <dt>Markets</dt>
            <dd>{markets.map((market) => marketNames[market]).join(" · ")}</dd>
          </div>
          <div>
            <dt>Direct line</dt>
            <dd>
              {contact.whatsapp.map((line) => (
                <a href={whatsappUrl(line.number)} key={line.number} rel="noopener noreferrer" target="_blank">
                  {line.display}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="quality-steps">
        {principles.map(([number, title, copy]) => (
          <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>
        ))}
      </section>

      <section className="about-trade">
        <div className="section-title-line">
          <h2>What we trade</h2>
          <Link href="/materials">All materials <span>→</span></Link>
        </div>
        <div className="area-material-grid">
          {materialCategories.map((category) => (
            <Link className="area-material-card" href={`/materials/${category.slug}`} key={category.slug}>
              <span aria-hidden="true">{category.symbol}</span>
              <strong>{category.name}</strong>
              <small>{category.label}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-reach">
        <div className="section-title-line">
          <h2>Where we trade</h2>
          <Link href="/locations">All locations <span>→</span></Link>
        </div>
        <div className="about-reach-grid">
          {markets.map((market) => (
            <Link href={`/locations#${market}`} key={market}>
              <strong>{marketNames[market]}</strong>
              <small>
                {industrialAreas
                  .filter((area) => area.market === market)
                  .slice(0, 4)
                  .map((area) => area.name)
                  .join(" · ")}
                {" and more"}
              </small>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <p>Have material to move, or a requirement to fill?</p>
        <h2>Start with the lot.</h2>
        <Link className="button button-cream" href="/contact#trade-enquiry">Send an enquiry <span>↗</span></Link>
      </section>
    </main>
  );
}
