import type { Metadata } from "next";
import { siteUrl } from "../../../lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../../components/json-ld";
import { getMaterialCategory, materialCategories } from "../../../lib/materials";

const baseUrl = siteUrl;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return materialCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getMaterialCategory(slug);
  if (!category) return {};

  const description = `All types of ${category.name.toLowerCase()} accepted and supplied across India, Europe and the Middle East.`;
  const imageUrl = `${baseUrl}${category.image}`;

  return {
    title: category.name,
    description,
    alternates: {
      canonical: `/materials/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Diyar e Taiba`,
      description,
      url: `${baseUrl}/materials/${category.slug}`,
      images: [{ url: imageUrl, width: 1536, height: 1024, alt: category.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Diyar e Taiba`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getMaterialCategory(slug);
  if (!category) notFound();

  const related = materialCategories.filter((item) => item.slug !== category.slug);
  const categoryUrl = `${baseUrl}/materials/${category.slug}`;
  const categorySchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${categoryUrl}#collection`,
      url: categoryUrl,
      name: category.name,
      description: category.description,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: category.accepted.flatMap((group) =>
        group.items.map((item) => ({ "@type": "DefinedTerm", name: item })),
      ),
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Materials", item: `${baseUrl}/materials` },
        { "@type": "ListItem", position: 3, name: category.name, item: categoryUrl },
      ],
    },
  ];

  return (
    <main>
      <JsonLd data={categorySchema} />
      <section className={`category-hero ${category.heroClass}`}>
        <img
          className="category-hero-image"
          src={category.image}
          alt={category.imageAlt}
          width={1536}
          height={1024}
          loading="eager"
          fetchPriority="high"
        />
        <span className="category-hero-shade" aria-hidden="true" />
        <div className="category-hero-meta">
          <Link href="/materials">Materials</Link><span>/</span><span>{category.name}</span>
        </div>
        <span className="category-hero-symbol" aria-hidden="true">{category.symbol}</span>
        <div className="category-hero-copy">
          <p>{category.label}</p>
          <h1>{category.name}</h1>
          <strong>{category.statement}</strong>
        </div>
      </section>

      <section className="category-intro">
        <p className="kicker">What we accept & supply</p>
        <p>{category.description}</p>
        <div className="form-chips" aria-label="Material forms">
          {category.forms.map((form) => <span key={form}>{form}</span>)}
        </div>
      </section>

      <section className="accepted-types">
        <div className="accepted-heading">
          <p className="kicker">Complete category coverage</p>
          <h2>Common grades,<br /><em>plus everything between.</em></h2>
        </div>
        <div className="accepted-groups">
          {category.accepted.map((group, groupIndex) => (
            <article key={group.group}>
              <div className="accepted-group-title">
                <span>{(groupIndex + 1).toString().padStart(2, "0")}</span>
                <h3>{group.group}</h3>
              </div>
              <ul>
                {group.items.map((item) => <li key={item}>{item}<span>↗</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="category-operations">
        <div>
          <p className="kicker">Lot checks</p>
          <h2>Material aligned<br /><em>before movement.</em></h2>
          <ul>
            {category.checks.map((check, index) => <li key={check}><span>{(index + 1).toString().padStart(2, "0")}</span>{check}</li>)}
          </ul>
        </div>
        <div>
          <p className="kicker">Typical destinations</p>
          <h2>Matched to the<br /><em>right recovery route.</em></h2>
          <div className="destination-cloud">
            {category.destinations.map((destination) => <span key={destination}>{destination}</span>)}
          </div>
        </div>
      </section>

      <section className="related-materials">
        <div className="section-title-line">
          <div><p className="kicker">Other categories</p><h2>Keep exploring</h2></div>
          <Link href="/materials">All materials <span>→</span></Link>
        </div>
        <div className="related-grid">
          {related.map((item) => (
            <Link className={`related-card ${item.heroClass}`} href={`/materials/${item.slug}`} key={item.slug}>
              <img src={item.image} alt="" width={1536} height={1024} loading="lazy" aria-hidden="true" />
              <span className="related-card-shade" aria-hidden="true" />
              <span>{item.symbol}</span><strong>{item.name}</strong><b>↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <p>Have {category.name.toLowerCase()} to sell or source?</p>
        <h2>Send the grade, form and volume.</h2>
        <Link className="button button-cream" href={`/contact?material=${category.slug}#trade-enquiry`}>Request a trade review <span>↗</span></Link>
      </section>
    </main>
  );
}
