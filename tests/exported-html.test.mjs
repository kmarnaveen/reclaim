import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const outDir = new URL("../out/", import.meta.url);

async function readExported(path) {
  return readFile(fileURLToPath(new URL(path, outDir)), "utf8");
}

test("exports every route as static HTML", async () => {
  const routes = [
    "index.html",
    "materials/index.html",
    "materials/metal/index.html",
    "materials/rubber/index.html",
    "materials/textile/index.html",
    "materials/paper/index.html",
    "markets/index.html",
    "quality/index.html",
    "faq/index.html",
    "contact/index.html",
    "404.html",
  ];

  for (const route of routes) {
    const html = await readExported(route);
    assert.match(html, /<html/i, `${route} should contain a rendered document`);
  }
});

test("renders material content into the HTML rather than fetching it", async () => {
  const html = await readExported("materials/metal/index.html");
  assert.match(html, /HMS 1 &amp; HMS 2|HMS 1 & HMS 2/);
  assert.match(html, /application\/ld\+json/);
});

test("emits the crawler files a static host serves directly", async () => {
  assert.match(await readExported("robots.txt"), /Sitemap:/i);
  assert.match(await readExported("sitemap.xml"), /<urlset/);
  assert.match(await readExported("manifest.webmanifest"), /Diyar e Taiba/);
});

test("keeps the Netlify form definitions in the deploy output", async () => {
  const html = await readExported("__forms.html");
  assert.match(html, /name="trade-enquiry"/);
  assert.match(html, /name="quick-lead"/);
});

test("renders the enquiry form into the static HTML, not only after hydration", async () => {
  const html = await readExported("contact/index.html");
  assert.match(html, /Submit trade enquiry/);
  assert.match(html, /name="trade-enquiry"/);
  assert.match(html, /name="description"/);
});

test("ships no Cloudflare, OpenAI or database runtime references", async () => {
  const html = await readExported("index.html");
  assert.doesNotMatch(html, /chatgpt\.site|cloudflare|vinext|_vinext/i);
});
