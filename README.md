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
