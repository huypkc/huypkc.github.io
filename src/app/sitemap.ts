import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import type { MetadataRoute } from "next"
import { ROUTES, url } from "@/lib/seo"

export const dynamic = "force-static"

/**
 * Last commit date that touched a file, as an ISO string.
 *
 * Returns undefined rather than guessing: if git is unavailable, or the clone
 * is too shallow to hold the commit, the route ships without a `lastmod`. A
 * fabricated date is worse than an absent one — `new Date()` at build time
 * would tell a crawler every page changed on every deploy.
 */
function lastCommit(file: string): string | undefined {
  if (!existsSync(file)) return undefined
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
    return out || undefined
  } catch {
    return undefined
  }
}

/** Files whose content is rendered into every route. */
const SHARED = ["src/data/portfolio.ts", "src/lib/seo.ts"]

function pageFile(path: string): string {
  return path === "/"
    ? "src/app/page.tsx"
    : `src/app${path}/page.tsx`
}

function lastModified(path: string): Date | undefined {
  const dates = [pageFile(path), ...SHARED]
    .map(lastCommit)
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d))
  if (dates.length === 0) return undefined
  return new Date(Math.max(...dates.map((d) => d.getTime())))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: url(r.path),
      // The homepage is the entry point; case studies sit under the work index.
      priority: r.path === "/" ? 1 : r.path.startsWith("/projects/") ? 0.7 : 0.8,
    }
    const mod = lastModified(r.path)
    if (mod) entry.lastModified = mod
    return entry
  })
}
