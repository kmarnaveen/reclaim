import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/json-ld";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { siteUrl, contact, whatsappUrl } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Diyar e Taiba | Global Scrap Trading",
    template: "%s | Diyar e Taiba",
  },
  description: "Buy and supply all types of metal, rubber, textile and paper scrap across India, Europe and the Middle East.",
  applicationName: "Diyar e Taiba",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Diyar e Taiba | Global Scrap Trading",
    description: "Metal, rubber, textile and paper scrap across India, Europe and the Middle East.",
    url: siteUrl,
    siteName: "Diyar e Taiba",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Diyar e Taiba scrap catalogue — metal, rubber, textile and paper" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diyar e Taiba | Global Scrap Trading",
    description: "Metal, rubber, textile and paper scrap across India, Europe and the Middle East.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/diyar-e-taiba-mark.png",
    shortcut: "/brand/diyar-e-taiba-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Diyar e Taiba",
        url: siteUrl,
        logo: `${siteUrl}/brand/diyar-e-taiba-logo.png`,
        description: "B2B sourcing and supply of metal, rubber, textile and paper scrap across India, Europe and the Middle East.",
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.locality,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.countryCode,
        },
        telephone: `+${contact.whatsapp[0].number}`,
        contactPoint: contact.whatsapp.map((line) => ({
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: `+${line.number}`,
          url: whatsappUrl(line.number),
          areaServed: ["IN", "EU", "AE"],
          availableLanguage: ["en", "hi", "ur"],
        })),
        sameAs: contact.whatsapp.map((line) => whatsappUrl(line.number)),
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Europe" },
          { "@type": "Place", name: "Middle East" },
        ],
        knowsAbout: [
          "Metal scrap",
          "Rubber scrap",
          "Textile scrap",
          "Paper scrap",
          "Recovered materials",
          "Scrap quality inspection",
          "Cross-border scrap trade",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Diyar e Taiba",
        description: "Global B2B scrap materials directory and trade enquiry website.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={organizationSchema} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <nav className="mobile-lead-bar" aria-label="Quick enquiry actions">
          <Link href="/contact?intent=sell#trade-enquiry">Sell scrap</Link>
          <Link href="/contact?intent=source#trade-enquiry">Source material</Link>
        </nav>
        <SiteFooter />
      </body>
    </html>
  );
}
