import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../../components/json-ld";
import { siteUrl, contact, whatsappUrl } from "../../../lib/site";
import { materialCategories } from "../../../lib/materials";
import {
  getIndustrialArea,
  industrialAreas,
  marketNames,
  relatedAreas,
  roleCopy,
} from "../../../lib/locations";

const baseUrl = siteUrl;

type AreaPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industrialAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getIndustrialArea(slug);
  if (!area) return {};

  const streams = area.materials.map((material) => material).join(", ");
  const description = `${roleCopy[area.role]}: ${streams} scrap in ${area.name}, ${area.region}. ${area.character}`.slice(0, 300);

  return {
    title: `Scrap Buyers & Suppliers in ${area.name}`,
    description,
    alternates: { canonical: `/locations/${area.slug}` },
    openGraph: {
      title: `Scrap Trading in ${area.name}, ${area.region} | Diyar e Taiba`,
      description,
      url: `${baseUrl}/locations/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getIndustrialArea(slug);
  if (!area) notFound();

  const areaUrl = `${baseUrl}/locations/${area.slug}`;
  const categories = materialCategories.filter((category) => area.materials.includes(category.slug));
  const related = relatedAreas(area);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${areaUrl}#service`,
      name: `Scrap buying and supply in ${area.name}`,
      description: area.character,
      serviceType: "Scrap material trading",
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: {
        "@type": "Place",
        name: `${area.name}, ${area.region}, ${area.country}`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Scrap grades traded in ${area.name}`,
        itemListElement: area.grades.map((grade) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: grade },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${baseUrl}/locations` },
        { "@type": "ListItem", position: 3, name: area.name, item: areaUrl },
      ],
    },
  ];

  return (
    <main>
      <JsonLd data={schema} />

      <section className="page-hero area-hero">
        <p className="eyebrow"><span /> {marketNames[area.market]} · {area.country}</p>
        <h1>{area.name}</h1>
        <div className="page-hero-bottom">
          <p>{area.character}</p>
          <span className="area-role">{roleCopy[area.role]}</span>
        </div>
      </section>

      <section className="area-facts">
        <div>
          <span>Region</span>
          <strong>{area.region}</strong>
        </div>
        <div>
          <span>Streams</span>
          <strong>{categories.map((category) => category.name).join(" · ")}</strong>
        </div>
        <div>
          <span>Clears through</span>
          <strong>{area.logistics}</strong>
        </div>
      </section>

      <section className="area-grades">
        <div className="section-title-line">
          <h2>Grades that move<br /><em>through {area.name}.</em></h2>
        </div>
        <ul>
          {area.grades.map((grade) => <li key={grade}>{grade}<span>↗</span></li>)}
        </ul>
      </section>

      <section className="area-materials">
        <div className="section-title-line">
          <h2>Categories we trade here</h2>
          <Link href="/materials">All materials <span>→</span></Link>
        </div>
        <div className="area-material-grid">
          {categories.map((category) => (
            <Link className="area-material-card" href={`/materials/${category.slug}`} key={category.slug}>
              <span aria-hidden="true">{category.symbol}</span>
              <strong>{category.name}</strong>
              <small>{category.label}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="area-cta">
        <div>
          <p className="kicker">Trade enquiry</p>
          <h2>Have a lot in {area.name}?</h2>
          <p>
            Send the material, grade, approximate volume and where it sits. We will
            confirm commercial fit before asking for photos or inspection access.
          </p>
        </div>
        <div className="area-cta-actions">
          <Link className="button button-cargo" href={`/contact?material=${area.materials[0]}#trade-enquiry`}>
            Send an enquiry <span>↗</span>
          </Link>
          <a
            className="button button-outline"
            href={whatsappUrl(contact.whatsapp[0].number)}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp {contact.whatsapp[0].display} <span>↗</span>
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="area-related">
          <div className="section-title-line">
            <h2>Nearby trading areas</h2>
            <Link href="/locations">All locations <span>→</span></Link>
          </div>
          <div className="area-related-grid">
            {related.map((item) => (
              <Link href={`/locations/${item.slug}`} key={item.slug}>
                <strong>{item.name}</strong>
                <small>{item.region}, {item.country}</small>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
