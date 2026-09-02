import type { NextConfig } from "next"

// huypkc.github.io is the GitHub user site: it deploys at the domain root, so
// no basePath or assetPrefix. `trailingSlash` makes the export emit
// `/evidence/index.html` rather than `/evidence.html`, which is what lets
// GitHub Pages serve a direct hit on /evidence without a 404.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
