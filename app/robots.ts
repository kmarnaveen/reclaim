import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";

// Metadata routes must be pre-rendered for `output: "export"`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
