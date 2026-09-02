/**
 * Asserts the discovery layer in the built output. Runs in CI after the export.
 *
 * These are the failures that are silent otherwise: a route that loses its
 * canonical, an og:image that 404s, a second H1, a JSON-LD block that stops
 * parsing, or a metadata URL that still points at localhost.
 *
 * Run: node tool/check-seo.mjs
 */

import { readFile, stat } from "node:fs/promises"
import { join } from "node:path"

const OUT = "out"
const ORIGIN = "https://huypkc.github.io"

const ROUTES = [
  "/",
  "/projects",
  "/projects/fieldproof",
  "/projects/one-frame",
  "/projects/first-week",
  "/projects/skillr",
  "/evidence",
  "/timeline",
  "/cv",
  "/contact",
]

const failures = []
const fail = (route, msg) => failures.push(`${route}: ${msg}`)

const file = (route) =>
  route === "/" ? join(OUT, "index.html") : join(OUT, route, "index.html")

const one = (html, re) => {
  const m = html.match(re)
  return m ? m[1] : null
}
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1])

const exists = async (p) => {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

/** Site-absolute URL -> path under out/. */
const localPath = (u) => join(OUT, u.replace(ORIGIN, ""))

for (const route of ROUTES) {
  const path = file(route)
  if (!(await exists(path))) {
    fail(route, "no index.html emitted")
    continue
  }
  const html = await readFile(path, "utf8")
  const canonicalUrl = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}/`

  // --- title / description ---------------------------------------------
  const title = one(html, /<title>([^<]*)<\/title>/)
  if (!title) fail(route, "missing <title>")
  else if (title.length > 70) fail(route, `title is ${title.length} chars`)

  const desc = one(html, /<meta name="description" content="([^"]*)"/)
  if (!desc) fail(route, "missing meta description")
  else if (desc.length < 70 || desc.length > 200)
    fail(route, `description is ${desc.length} chars (want 70-200)`)

  // --- canonical --------------------------------------------------------
  const canon = all(html, /<link rel="canonical" href="([^"]*)"/g)
  if (canon.length === 0) fail(route, "missing canonical")
  else if (canon.length > 1) fail(route, `${canon.length} canonical tags`)
  else if (canon[0] !== canonicalUrl)
    fail(route, `canonical is ${canon[0]}, want ${canonicalUrl}`)

  // --- open graph / twitter --------------------------------------------
  const ogUrl = one(html, /<meta property="og:url" content="([^"]*)"/)
  if (ogUrl !== canonicalUrl)
    fail(route, `og:url is ${ogUrl}, want ${canonicalUrl}`)

  const ogTitle = one(html, /<meta property="og:title" content="([^"]*)"/)
  if (!ogTitle) fail(route, "missing og:title")

  const ogImage = one(html, /<meta property="og:image" content="([^"]*)"/)
  if (!ogImage) fail(route, "missing og:image")
  else if (!ogImage.startsWith(ORIGIN))
    fail(route, `og:image is not absolute: ${ogImage}`)
  else if (!(await exists(localPath(ogImage))))
    fail(route, `og:image does not resolve: ${ogImage}`)

  const twCard = one(html, /<meta name="twitter:card" content="([^"]*)"/)
  if (twCard !== "summary_large_image")
    fail(route, `twitter:card is ${twCard}`)
  const twImage = one(html, /<meta name="twitter:image" content="([^"]*)"/)
  if (!twImage) fail(route, "missing twitter:image")

  // Each route must carry its own card, not inherit the homepage's.
  if (route !== "/" && ogTitle === "Huy Tran — Product Engineer")
    fail(route, "og:title inherited from the homepage")

  // --- robots -----------------------------------------------------------
  const robots = one(html, /<meta name="robots" content="([^"]*)"/)
  if (!robots || !robots.includes("index") || robots.includes("noindex"))
    fail(route, `robots meta is "${robots}"`)

  // --- headings ---------------------------------------------------------
  const h1s = all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g)
  if (h1s.length !== 1) fail(route, `${h1s.length} <h1> elements, want 1`)

  // --- structured data --------------------------------------------------
  const blocks = all(
    html,
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )
  if (blocks.length === 0) fail(route, "no JSON-LD")
  for (const [i, raw] of blocks.entries()) {
    try {
      const data = JSON.parse(raw.replace(/\\u003c/g, "<"))
      if (!data["@context"]) fail(route, `JSON-LD #${i} has no @context`)
    } catch (e) {
      fail(route, `JSON-LD #${i} does not parse: ${e.message}`)
    }
  }

  // --- nothing may point at a dev origin --------------------------------
  if (/localhost|127\.0\.0\.1|:3000/.test(html))
    fail(route, "output references localhost")
}

// --- sitemap -------------------------------------------------------------
const sitemap = await readFile(join(OUT, "sitemap.xml"), "utf8")
const locs = all(sitemap, /<loc>([^<]*)<\/loc>/g)
for (const route of ROUTES) {
  const want = route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}/`
  if (!locs.includes(want)) fail("sitemap", `missing ${want}`)
}
for (const loc of locs) {
  if (!(await exists(localPath(loc))))
    fail("sitemap", `${loc} does not resolve in the export`)
}
if (locs.length !== ROUTES.length)
  fail("sitemap", `${locs.length} urls, want ${ROUTES.length}`)
if (/404|_not-found/.test(sitemap)) fail("sitemap", "lists a non-content page")

// --- robots.txt ----------------------------------------------------------
const robotsTxt = await readFile(join(OUT, "robots.txt"), "utf8")
if (!/user-agent:\s*\*/i.test(robotsTxt)) fail("robots.txt", "no wildcard agent")
if (!/allow:\s*\//i.test(robotsTxt)) fail("robots.txt", "does not allow /")
if (/disallow:\s*\/\s*$/im.test(robotsTxt)) fail("robots.txt", "disallows the site")
if (!robotsTxt.includes(`${ORIGIN}/sitemap.xml`))
  fail("robots.txt", "no sitemap reference")

// --- agent + icon surfaces ----------------------------------------------
for (const f of [
  "llms.txt",
  "site.webmanifest",
  "icons/icon-512.png",
  "icons/apple-icon.png",
  ".nojekyll",
]) {
  if (!(await exists(join(OUT, f)))) fail("assets", `missing /${f}`)
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} discovery-layer failure(s):\n`)
  for (const f of failures) console.error(`  ${f}`)
  process.exit(1)
}

console.log(`✓ discovery layer OK across ${ROUTES.length} routes`)
