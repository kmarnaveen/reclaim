"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { materialCategories } from "../lib/materials";

const allMaterials = materialCategories.flatMap((category) =>
  category.accepted.flatMap((group) =>
    group.items.map((item) => ({
      item,
      group: group.group,
      category: category.name,
      slug: category.slug,
      heroClass: category.heroClass,
    })),
  ),
);

const popularSearches = ["Copper", "Tyres", "Cotton", "OCC", "Stainless steel"];

export function MaterialFinder() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    return allMaterials
      .filter((material) => {
        const inCategory = category === "all" || material.slug === category;
        const searchable = `${material.item} ${material.group} ${material.category}`.toLowerCase();
        return inCategory && searchable.includes(normalizedQuery);
      })
      .slice(0, 12);
  }, [category, normalizedQuery]);

  return (
    <section className="material-finder" aria-labelledby="material-finder-title">
      <div className="finder-heading">
        <p className="kicker">Material finder</p>
        <h2 id="material-finder-title">Search every accepted scrap type.</h2>
        <p>Search by material, grade, fibre, polymer or common trade name.</p>
      </div>
      <div className="finder-control">
        <label className="finder-search">
          <span className="sr-only">Search scrap materials</span>
          <b aria-hidden="true">⌕</b>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try copper, OCC, EPDM, denim..."
            autoComplete="off"
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear material search">Clear</button>}
        </label>
        <label className="finder-category">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {materialCategories.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
          </select>
        </label>
      </div>
      <div className="popular-searches" aria-label="Popular material searches">
        <span>Popular</span>
        {popularSearches.map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}
      </div>
      <div className="finder-results" aria-live="polite">
        {normalizedQuery.length >= 2 && (
          <div className="finder-result-count">
            <span>{results.length.toString().padStart(2, "0")} matches</span>
            <span>Showing the strongest matches</span>
          </div>
        )}
        {results.length > 0 && (
          <div className="finder-result-grid">
            {results.map((result) => (
              <Link href={`/materials/${result.slug}`} key={`${result.slug}-${result.item}`}>
                <span className={result.heroClass}>{result.category.slice(0, 1)}</span>
                <p><strong>{result.item}</strong><small>{result.group} · {result.category}</small></p>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        )}
        {normalizedQuery.length >= 2 && results.length === 0 && (
          <div className="finder-empty">
            <p>No exact listing found. We still evaluate unlisted and mixed material streams.</p>
            <Link href="/contact?intent=sell#trade-enquiry">Submit the material for review <span>→</span></Link>
          </div>
        )}
      </div>
    </section>
  );
}
