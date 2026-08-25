import Link from "next/link";
import { frequentlyAskedQuestions } from "../lib/faqs";
import { materialCategories } from "../lib/materials";
import { QuickLeadForm } from "../components/quick-lead-form";

export default function Home() {
  return (
    <main>
      <section className="global-hero">
        <div className="hero-region-line">
          <span className="cargo-route-code">DET 04 · 22G1</span>
          <span>India</span><i /> <span>Europe</span><i /> <span>Middle East</span>
        </div>
        <div className="global-hero-copy">
          <p className="eyebrow"><span /> Cross-border scrap sourcing & supply</p>
          <h1>Every <span className="hero-mark">scrap</span> stream.<br /><em>Every <span className="hero-mark">trading</span> lane.</em></h1>
          <div className="hero-bottom">
            <p>
              We buy and supply all types of metal, rubber, textile and paper scrap—
              matched to buyer specifications across major markets.
            </p>
            <div className="hero-actions">
              <Link className="button button-cargo" href="/contact?intent=sell#trade-enquiry">Offer scrap <span>↗</span></Link>
              <Link className="button button-outline" href="/contact?intent=source#trade-enquiry">Source material <span>→</span></Link>
            </div>
          </div>
        </div>
        <div className="cargo-manifest" role="group" aria-label="Container shipment profile">
          <div className="cargo-manifest-code">
            <small>Cargo reference</small>
            <strong>DET 2026 004</strong>
          </div>
          <div><small>Load modes</small><b>FCL · LCL · Bulk</b></div>
          <div><small>Commodity</small><b>Recovered materials</b></div>
          <div><small>Trade lanes</small><b>IN · EU · GCC</b></div>
        </div>
        <div className="hero-market-index">
          <div><strong>04</strong><span>material categories</span></div>
          <div><strong>03</strong><span>market regions</span></div>
          <div><strong>All</strong><span>grades considered</span></div>
        </div>
      </section>

      <section className="intent-rail" aria-label="Start a trade enquiry">
        <div className="intent-rail-intro">
          <span>Choose your route</span>
          <p>Send the minimum details now. Add photos and specifications after submission.</p>
        </div>
        <Link href="/contact?intent=sell#trade-enquiry">
          <small>For suppliers</small><strong>I have scrap to sell</strong><span>Get a lot review ↗</span>
        </Link>
        <Link href="/contact?intent=source#trade-enquiry">
          <small>For buyers</small><strong>I need material sourced</strong><span>Send a buying brief ↗</span>
        </Link>
      </section>

      <section className="quick-enquiry">
        <div className="quick-enquiry-copy">
          <p className="kicker">30-second callback request</p>
          <h2>Not ready with every detail?</h2>
          <p>Share the material and one contact method. The trade desk can qualify the requirement with you.</p>
        </div>
        <QuickLeadForm />
      </section>

      <section className="home-materials">
        <div className="split-heading">
          <div>
            <p className="kicker">What we handle</p>
            <h2>Four categories.<br /><em>No narrow list.</em></h2>
          </div>
          <p>
            From regular mill grades to difficult mixed streams, we evaluate every
            commercially recoverable scrap type subject to inspection and destination rules.
          </p>
        </div>
        <div className="category-directory">
          {materialCategories.map((category, index) => (
            <Link className={`category-directory-card ${category.heroClass}`} href={`/materials/${category.slug}`} key={category.slug}>
              <img className="category-card-image" src={category.image} alt="" width={1536} height={1024} loading="lazy" aria-hidden="true" />
              <span className="category-card-shade" aria-hidden="true" />
              <div className="category-card-top">
                <span>DET-{(index + 1).toString().padStart(2, "0")}</span>
                <span>{category.label}</span>
              </div>
              <span className="category-symbol" aria-hidden="true">{category.symbol}</span>
              <div className="category-card-bottom">
                <h3>{category.name}</h3>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </div>
        <Link className="section-link" href="/materials">View the complete materials directory <span>→</span></Link>
      </section>

      <section className="trade-lanes">
        <div className="trade-lanes-copy">
          <p className="kicker">Three connected markets</p>
          <h2>Local knowledge.<br /><em>Global movement.</em></h2>
          <p>
            We coordinate suppliers, buyers, material checks and shipment documents
            across domestic and cross-border trade lanes.
          </p>
          <Link className="button button-acid" href="/markets">Explore market coverage <span>↗</span></Link>
        </div>
        <div className="region-list">
          <Link href="/markets#india"><span>01</span><strong>India</strong><small>Domestic procurement & delivery</small><b>↗</b></Link>
          <Link href="/markets#europe"><span>02</span><strong>Europe</strong><small>Containerised recovered materials</small><b>↗</b></Link>
          <Link href="/markets#middle-east"><span>03</span><strong>Middle East</strong><small>GCC & regional trading corridors</small><b>↗</b></Link>
        </div>
      </section>

      <section className="working-model">
        <div className="split-heading compact">
          <div>
            <p className="kicker">How we create value</p>
            <h2>One desk.<br /><em>Both sides of the trade.</em></h2>
          </div>
          <p>
            Have material to sell or a production requirement to fill? We organise
            the commercial and operational steps around the lot.
          </p>
        </div>
        <div className="model-grid">
          <article><span>01</span><h3>Buy</h3><p>We evaluate scrap offered by yards, factories, aggregators and recovery operators.</p></article>
          <article><span>02</span><h3>Sort</h3><p>We align grade, form, contamination tolerance, quantity and documentation.</p></article>
          <article><span>03</span><h3>Move</h3><p>We coordinate loading, inland transport, containers and trade documents.</p></article>
          <article><span>04</span><h3>Supply</h3><p>We match approved lots to mills, recyclers, processors and manufacturers.</p></article>
        </div>
      </section>

      <section className="home-proof">
        <div className="proof-image">
          <img
            src="/og.png"
            alt="Diyar e Taiba — global scrap sourcing and supply: metal, rubber, textile, paper"
            width={1200}
            height={630}
            loading="lazy"
          />
        </div>
        <div className="proof-copy">
          <p className="kicker">Trade with clarity</p>
          <h2>Know the lot<br /><em>before it moves.</em></h2>
          <p>
            Material declarations, representative photos, weight records and the
            right shipment paperwork—prepared around the agreed transaction.
          </p>
          <Link className="text-link" href="/quality">See our quality process <span>→</span></Link>
        </div>
      </section>

      <section className="home-answers">
        <div className="section-title-line">
          <div><p className="kicker">Direct answers</p><h2>Before you send a lot</h2></div>
          <Link href="/faq">Read all questions <span>→</span></Link>
        </div>
        <div className="home-answer-grid">
          {frequentlyAskedQuestions.slice(0, 4).map((item, index) => (
            <article key={item.question}>
              <span>{(index + 1).toString().padStart(2, "0")}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <p>Have scrap to sell—or a grade to source?</p>
        <h2>Turn the requirement into a trade conversation.</h2>
        <Link className="button button-cream" href="/contact#trade-enquiry">Start an enquiry <span>↗</span></Link>
      </section>
    </main>
  );
}
