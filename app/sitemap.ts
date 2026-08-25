import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";
import { materialCategories } from "../lib/materials";
import { industrialAreas } from "../lib/locations";

// Metadata routes must be pre-rendered for `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const routes = ["", "/materials", "/markets", "/quality", "/faq", "/contact", "/locations"];
  const categoryRoutes = materialCategories.map((category) => `/materials/${category.slug}`);
  const areaRoutes = industrialAreas.map((area) => `/locations/${area.slug}`);

  return [...routes, ...categoryRoutes, ...areaRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-22"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/materials"
          ? 0.9
          : route.startsWith("/locations/")
            ? 0.5
            : 0.7,
  }));
}
