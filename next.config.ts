import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` — no Node server, no edge runtime.
  output: "export",
  // Netlify serves the exported files as-is, so skip the on-demand optimizer.
  images: { unoptimized: true },
  // Export each route as `<route>/index.html` so static hosts resolve them.
  trailingSlash: true,
};

export default nextConfig;
