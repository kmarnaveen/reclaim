import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/json-ld";
import { siteUrl } from "../../lib/site";
import {
  areasByMarket,
  groupAreas,
  industrialAreas,
  marketNames,
  materialShortNames,
  type Market,
} from "../../lib/locations";

const baseUrl = siteUrl;
const markets: Market[] = ["india", "europe", "middle-east"];

export const metadata: Metadata = {
  title: "Industrial Areas We Trade In",
  description:
    "Scrap buying and supply across major industrial areas in India, Europe and the Middle East — the grades that move in each and the ports they clear through.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Scrap Trading Locations | Diyar e Taiba",
    description:
      "Major industrial areas across India, Europe and the Middle East where we buy and supply metal, rubber, textile and paper scrap.",
    url: `${baseUrl}/locations`,
  },
};

export default function LocationsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/locations#collection`,
    url: `${baseUrl}/locations`,
    name: "Industrial areas we trade in",
    isPartOf: { "@id": `${baseUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: industrialAreas.length,
      itemListElement: industrialAreas.map((area, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${area.name}, ${area.region}`,
        url: `${baseUrl}/locations/${area.slug}`,
      })),
    },
  };

  return (
    <main>
      <JsonLd data={schema} />

      <section className="page-hero locations-hero">
        <p className="eyebrow"><span /> Industrial areas</p>
        <h1>Where the<br /><em>material moves.</em></h1>
        <div className="page-hero-bottom">
          <p>
            The industrial areas we actively buy from and supply into, with the grades
            that move in each and the port or corridor they clear through.
          </p>
        </div>
      </section>

      <nav className="locations-jump" aria-label="Jump to market">
        {markets.map((market) => (
          <a href={`#${market}`} key={market}>
            <strong>{marketNames[market]}</strong>
          </a>
        ))}
      </nav>

      {markets.map((market) => {
        const areas = areasByMarket(market);
        return (
          <section className="locations-block" id={market} key={market}>
            <div className="locations-block-head">
              <h2>{marketNames[market]}</h2>
            </div>
            {groupAreas(areas).map((group) => (
              <div className="locations-group" key={group.key}>
                <h3>{group.key}</h3>
                <div className="locations-grid">
                  {group.areas.map((area) => (
                    <Link href={`/locations/${area.slug}`} key={area.slug}>
                      <strong>{area.name}</strong>
                      <em>
                        {area.materials.map((material) => (
                          <b key={material}>{materialShortNames[material]}</b>
                        ))}
                      </em>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </main>
  );
}
