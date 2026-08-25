# Diyar e Taiba — Scrap Materials Catalogue

A static marketing and trade-enquiry site for Diyar e Taiba, built with the
Next.js App Router and exported to plain HTML for Netlify.

There is no server, database, or edge runtime: `npm run build` writes a complete
static site into `out/`, which Netlify publishes as-is.

## Prerequisites

- Node.js `>=20.9.0`

## Commands

- `npm run dev` — local development server on http://localhost:3000
- `npm run build` — static export into `out/`
- `npm run start` — serve the built `out/` directory locally
- `npm test` — build, then assert the exported HTML
- `npm run lint` — ESLint

## Deploying to Netlify

`netlify.toml` already declares the build:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

Connect the repository in Netlify and it needs no further configuration.

Set **`NEXT_PUBLIC_SITE_URL`** in *Site configuration → Environment variables* to
the production domain (for example `https://diyaretaiba.com`). It feeds
`lib/site.ts`, which is the single source for canonical URLs, Open Graph tags,
`sitemap.xml`, `robots.txt`, and the JSON-LD graph. Without it the build falls
back to `https://diyar-e-taiba.netlify.app`.

## Enquiry Forms

Both forms — the full trade enquiry on `/contact` and the quick callback form on
the home page — submit to **Netlify Forms**. No backend or database is involved.

- `public/__forms.html` holds the field definitions. Netlify parses deployed HTML
  at build time to register forms, and this file is what it finds.
- `lib/submit-enquiry.ts` posts urlencoded submissions to that path and generates
  the `RM-XXXXXXXX` reference shown to the user, which is stored alongside the
  submission.
- Submissions appear under *Forms* in the Netlify dashboard. Add a notification
  there to have them emailed to the trade desk.
- Each form declares a `website` honeypot field for spam filtering.

If a field is added to a form component, add it to `public/__forms.html` too —
Netlify discards fields it has not registered.

## Content

Page copy is driven by two data files, so most edits need no JSX changes:

- `lib/materials.ts` — the four material categories, their accepted grades,
  forms, checks, and destinations. Also drives `/materials/[slug]` and the
  material finder.
- `lib/faqs.ts` — the FAQ entries used on `/faq` and the home page.

## Notes

- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, and
  `images: { unoptimized: true }`; the static host serves images directly.
- Metadata routes (`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`) declare
  `export const dynamic = "force-static"`, which `output: "export"` requires.
- Pages cannot read `searchParams` on the server in a static export. The contact
  form reads `?material=` and `?intent=` in the browser after mount, which keeps
  the full form in the pre-rendered HTML.
