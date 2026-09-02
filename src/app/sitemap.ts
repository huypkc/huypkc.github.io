import type { MetadataRoute } from "next"
import { PROJECTS } from "@/data/portfolio"

const BASE = "https://huypkc.github.io"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/projects",
    ...PROJECTS.map((p) => p.href),
    "/evidence",
    "/timeline",
    "/contact",
  ]

  return routes.map((route) => ({
    url: `${BASE}${route === "/" ? "/" : `${route}/`}`,
    lastModified: new Date(),
    priority: route === "/" ? 1 : 0.8,
  }))
}
