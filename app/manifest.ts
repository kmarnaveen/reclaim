import type { MetadataRoute } from "next";

// Metadata routes must be pre-rendered for `output: "export"`.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Diyar e Taiba",
    short_name: "Diyar e Taiba",
    description: "Global B2B scrap sourcing and supply across India, Europe and the Middle East.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef3f1",
    theme_color: "#005c65",
    icons: [
      {
        src: "/brand/diyar-e-taiba-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
