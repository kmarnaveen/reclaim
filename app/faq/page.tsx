import type { Metadata } from "next";
import { siteUrl } from "../../lib/site";
import Link from "next/link";
import { frequentlyAskedQuestions } from "../../lib/faqs";

const baseUrl = siteUrl;

export const metadata: Metadata = {
  title: "Scrap Trading Questions & Answers",
  description: "Direct answers about scrap types, accepted grades, quality checks, minimum quantities and trade coverage across India, Europe and the Middle East.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Scrap Trading Questions & Answers | Diyar e Taiba",
    description: "Direct answers about buying, selling and sourcing metal, rubber, textile and paper scrap.",
    url: `${baseUrl}/faq`,
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/faq#faq`,
    url: `${baseUrl}/faq`,
    name: "Scrap Trading Questions & Answers",
    mainEntity: frequentlyAskedQuestions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <section className="page-hero faq-hero">
        <p className="eyebrow"><span /> Scrap trading knowledge base</p>
        <h1>Questions answered.<br /><em>Clearly.</em></h1>
        <div className="page-hero-bottom">
          <p>Concise answers for suppliers and buyers evaluating a scrap transaction across our four material categories and three market regions.</p>
          <Link className="text-link" href="/contact">Ask about a specific lot <span>→</span></Link>
        </div>
      </section>
      <section className="faq-index">
        <aside>
          <p className="kicker">On this page</p>
          <span>Materials</span><span>Markets</span><span>Quality</span><span>Logistics</span><span>Enquiries</span>
        </aside>
        <div className="faq-list">
          {frequentlyAskedQuestions.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>{(index + 1).toString().padStart(2, "0")}</span><h2>{item.question}</h2><b aria-hidden="true">+</b></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="answer-cta">
        <div><p className="kicker">Need a precise answer?</p><h2>Send the actual material.</h2></div>
        <p>Grade, volume, location and photos turn a general answer into a useful commercial review.</p>
        <Link className="button button-cream" href="/contact#trade-enquiry">Start an enquiry <span>↗</span></Link>
      </section>
    </main>
  );
}
