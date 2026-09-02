/**
 * One table describing every indexable route: the title and description the
 * page emits, and the two lines its social card carries.
 *
 * Pages import `metadataFor()` so the <head> is generated from here, and
 * `tool/render-og.mjs` imports ROUTES so the social cards are generated from
 * the same rows. A card therefore cannot drift from the page it previews.
 *
 * Deliberately free of `@/` path aliases and of any import that is not
 * relative, so Node can load this file directly with --experimental-strip-types.
 */

import type { Metadata } from "next"

export const SITE = {
  origin: "https://huypkc.github.io",
  name: "Huy Tran",
  /** Matches the eyebrow above the name on the homepage. */
  jobTitle: "Product Engineer",
  locale: "en_US",
} as const

/** Absolute URL for a site-relative path. Every route is trailing-slashed. */
export function url(path: string): string {
  return path === "/" ? `${SITE.origin}/` : `${SITE.origin}${path}/`
}

export type RouteMeta = {
  path: string
  /** <title>, before the "— Huy Tran" template is applied. */
  title: string
  description: string
  /** Small monospace label at the top of the social card. */
  ogLabel: string
  /** Serif display line on the social card. Defaults to `title`. */
  ogTitle?: string
  /** og:type. Case studies are articles; everything else is a website. */
  ogType?: "website" | "article"
  /** Card filename under /og/. */
  card: string
}

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Huy Tran — Product Engineer",
    description:
      "I build and finish web and mobile products, with evidence attached. Every claim on this site links to an inspectable artifact — a CI run, a release, a database test or a deployed demo.",
    ogLabel: "Product Engineer",
    ogTitle: "Huy Tran",
    card: "home",
  },
  {
    path: "/projects",
    title: "Work",
    description:
      "Engineering case studies in Flutter, Next.js and Supabase. Each carries a status label and evidence chips, shown only where the evidence exists.",
    ogLabel: "Case studies",
    ogTitle: "Work",
    card: "projects",
  },
  {
    path: "/projects/fieldproof",
    title: "FieldProof",
    description:
      "An offline-capable field inspection workflow built in Flutter, Supabase/Postgres and Next.js: 279 mobile tests, 183 database assertions, a downloadable Android build and a live review console.",
    ogLabel: "Case study · FieldProof",
    ogTitle: "Offline-capable field inspection workflow",
    ogType: "article",
    card: "fieldproof",
  },
  {
    path: "/projects/one-frame",
    title: "One Frame",
    description:
      "A local-first Android journal in Flutter and SQLite — one photograph and one sentence a day, held on the device with no account and no server. Taken to a signed release, deliberately not published.",
    ogLabel: "Case study · One Frame",
    ogTitle: "One photograph and one sentence a day",
    ogType: "article",
    card: "one-frame",
  },
  {
    path: "/projects/first-week",
    title: "First Week",
    description:
      "A contract-first Flutter app for Vietnamese students where every task carries the standing of its source, and a checklist nobody has filled in yet renders as thin as it really is.",
    ogLabel: "Case study · First Week",
    ogTitle: "A checklist that admits what it does not know",
    ogType: "article",
    card: "first-week",
  },
  {
    path: "/projects/skillr",
    title: "Skillr",
    description:
      "Listed for inclusion in this portfolio, but no repository, deployment or written artifact could be located. Nothing is claimed here.",
    ogLabel: "Case study · Skillr",
    ogTitle: "No evidence located",
    ogType: "article",
    card: "skillr",
  },
  {
    path: "/evidence",
    title: "Evidence",
    description:
      "Every claim this portfolio makes, with the artifact behind it and a verification status. Not everything is verified — that is the point of publishing the index rather than a summary.",
    ogLabel: "Evidence index",
    ogTitle: "Evidence",
    card: "evidence",
  },
  {
    path: "/timeline",
    title: "Timeline",
    description:
      "What was actually built and verified, in order. Not a resume — employment is present but secondary, because it carries no artifact I am free to publish.",
    ogLabel: "Engineering history",
    ogTitle: "Timeline",
    card: "timeline",
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Available for contract and freelance work: existing product work, MVP completion, Flutter and Next.js implementation, Supabase and Firebase integration, admin portals and production readiness.",
    ogLabel: "Get in touch",
    ogTitle: "Contact",
    card: "contact",
  },
]

export function routeFor(path: string): RouteMeta {
  const route = ROUTES.find((r) => r.path === path)
  if (!route) throw new Error(`No SEO row for route ${path}`)
  return route
}

export function cardUrl(card: string): string {
  return `${SITE.origin}/og/${card}.png`
}

/**
 * Builds the full <head> block for a route: canonical, Open Graph and Twitter
 * all derived from the one row, so they cannot disagree with each other.
 */
export function metadataFor(path: string): Metadata {
  const r = routeFor(path)
  const canonical = url(r.path)
  const image = cardUrl(r.card)
  // The root layout applies "%s — Huy Tran"; the homepage title is already whole.
  const social = r.path === "/" ? r.title : `${r.title} — ${SITE.name}`

  return {
    title: r.path === "/" ? undefined : r.title,
    description: r.description,
    alternates: { canonical },
    openGraph: {
      type: r.ogType ?? "website",
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      title: social,
      description: r.description,
      images: [{ url: image, width: 1200, height: 630, alt: social }],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description: r.description,
      images: [image],
    },
  }
}

/**
 * Only technologies that appear in the visible copy of the site. Nothing is
 * added here to widen keyword coverage.
 */
export const KNOWS_ABOUT = [
  "Flutter",
  "Dart",
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Firebase",
  "SQLite",
  "Row Level Security",
  "OpenAPI",
  "GitHub Actions",
  "Offline-first mobile applications",
  "Continuous integration",
  "Release engineering",
]
