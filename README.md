# huypkc.github.io

An evidence-first engineering portfolio. Every public claim on the site is
carried by a record in [`src/data/portfolio.ts`](src/data/portfolio.ts), and a
record marked `Verified` must name an inspectable artifact — the type refuses to
compile otherwise.

**Live:** https://huypkc.github.io

## Stack

Next.js (App Router) with `output: "export"`, Tailwind CSS v4, TypeScript.
No server, no database, no API routes.

## Run

```bash
npm ci
npm run dev          # http://localhost:3000
```

## Gates

```bash
npx tsc --noEmit     # types
npm run lint         # eslint
npm run build        # production build + static export to ./out
```

`.github/workflows/deploy.yml` runs all three on every push to `master`, then
additionally asserts that every route emitted an `index.html`, that
`.nojekyll` is present, and that no `href="#"` placeholder reached the build.

## Deployment

GitHub Pages, **Source: GitHub Actions**. This is the user site, so it is
served from the domain root and needs no `basePath` or `assetPrefix`.

Two details that GitHub Pages makes load-bearing:

- `public/.nojekyll` — without it Pages strips the `_next/` directory and the
  site loads unstyled.
- `trailingSlash: true` — makes the export write `/evidence/index.html` rather
  than `/evidence.html`, which is what lets a direct hit on `/evidence`
  resolve instead of 404ing.

## Discovery layer

Canonical origin: `https://huypkc.github.io`. Every indexable route carries a
canonical, a per-route Open Graph and Twitter card, `index, follow`, and JSON-LD
that only states things visible on the page.

```bash
npm run og           # regenerate social cards + favicons into public/
npm run check:seo    # assert the discovery layer in ./out (CI runs this)
```

- `src/lib/seo.ts` is the route table. Pages build their `<head>` from it and
  `tool/render-og.mjs` renders the cards from it, so a card cannot say something
  its page does not.
- Social cards and favicons are **committed PNGs** under `public/og` and
  `public/icons`. Next's `opengraph-image.tsx` emits an extensionless file,
  which GitHub Pages serves as `application/octet-stream` — preview crawlers
  reject that, so real `.png` files are used instead. Re-run `npm run og` after
  editing any title or description in `src/lib/seo.ts`.
- `sitemap.xml` takes `lastmod` from the last commit touching each page, and
  omits it entirely if git cannot answer. The deploy workflow therefore checks
  out with `fetch-depth: 0`.
- `public/llms.txt` is a summary surface for retrieval agents. The HTML is the
  source of truth; where they disagree the page wins.
- No analytics, no tracking, no cookies.

## Content rules

The site is built around one relationship, repeated:

> claim → evidence → verification status → inspectable artifact

- A chip appears on a project only if that project has a `Verified` or
  `Partial` record of that kind. `chipsFor()` derives them; they are never
  hand-listed.
- `Partial` means the evidence exists but cannot be independently re-run —
  typically because the repository is private. The unedited command output is
  committed under `public/evidence/runs/` so it can at least be read.
- `Unavailable` means there is nothing to show, and nothing is claimed. These
  records are published rather than omitted.
- Employment is `Historical` and carries no artifact, so it carries no
  evidence link and no reconstructed dates.
