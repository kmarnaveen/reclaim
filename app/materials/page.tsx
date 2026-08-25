import type { Metadata } from "next";
import { siteUrl } from "../../lib/site";
import Link from "next/link";
import { JsonLd } from "../../components/json-ld";
import { MaterialFinder } from "../../components/material-finder";
import { materialCategories } from "../../lib/materials";

const baseUrl = siteUrl;

export const metadata: Metadata = {
  title: "All Scrap Materials",
  description: "Explore all metal, rubber, textile and paper scrap types accepted and supplied across India, Europe and the Middle East.",
  alternates: { canonical: "/materials" },
  openGraph: {
    title: "All Scrap Materials | Diyar e Taiba",
    description: "Search every accepted metal, rubber, textile and paper scrap type.",
    url: `${baseUrl}/materials`,
  },
};

export default function MaterialsPage() {
  const collectionSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${baseUrl}/materials#collection`,
      url: `${baseUrl}/materials`,
      name: "All Scrap Materials",
      description: "A searchable directory of metal, rubber, textile and paper scrap accepted and supplied by Diyar e Taiba.",
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: ["Metal scrap", "Rubber scrap", "Textile scrap", "Paper scrap"].map((name) => ({
        "@type": "Thing",
        name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Scrap material categories",
      numberOfItems: materialCategories.length,
      itemListElement: materialCategories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${baseUrl}/materials/${category.slug}`,
      })),
    },
  ];

  return (
    <main>
      <JsonLd data={collectionSchema} />
      <section className="page-hero materials-page-hero">
        <p className="eyebrow"><span /> Complete materials directory</p>
        <h1>All scrap types.<br /><em>One starting point.</em></h1>
        <div className="page-hero-bottom">
          <p>
            We consider all commercially recoverable grades within metal, rubber,
            textile and paper—standard or non-standard, recurring or one-off.
          </p>
          <Link className="text-link" href="/contact?intent=sell#trade-enquiry">Offer a material not listed <span>→</span></Link>
        </div>
      </section>

      <MaterialFinder />

      <section className="materials-index">
        {materialCategories.map((category, index) => (
          <article className="materials-index-row" key={category.slug}>
            <div className={`index-symbol ${category.heroClass}`}>
              <img src={category.image} alt={category.imageAlt} width={1536} height={1024} loading="lazy" />
              <span className="index-image-shade" aria-hidden="true" />
              <span>{category.symbol}</span>
              <small>DET-{(index + 1).toString().padStart(2, "0")}</small>
            </div>
            <div className="index-copy">
              <p>{category.label}</p>
              <h2>{category.name}</h2>
              <p className="index-description">{category.description}</p>
              <div className="index-samples">
                {category.accepted.flatMap((group) => group.items).slice(0, 8).map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <Link className="index-link" href={`/materials/${category.slug}`} aria-label={`View all ${category.name} types`}>
              <span>View all grades</span><b>↗</b>
            </Link>
          </article>
        ))}
      </section>

      <section className="acceptance-note">
        <div>
          <p className="kicker">Our acceptance principle</p>
          <h2>If it has a recovery route,<br /><em>we will evaluate it.</em></h2>
        </div>
        <div>
          <p>
            The lists on this website cover common grades, but they are not exclusion
            lists. Mixed, obsolete, unusual and production-specific scrap can be reviewed
            against composition, contamination, volume, economics and destination requirements.
          </p>
          <Link className="button button-dark" href="/contact?intent=sell#trade-enquiry">Submit an unlisted material <span>↗</span></Link>
        </div>
      </section>
    </main>
  );
}
