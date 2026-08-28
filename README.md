# huypkc.github.io profile site

Static personal profile and portfolio. No build step, no framework, no
tracking, no cookies.

## Files

| File | What it is |
|---|---|
| `index.html` | Homepage — eight held frames, one idea each |
| `one-frame.html` | One Frame case study |
| `styles.css` | The whole visual language |
| `script.js` | Reveal-on-scroll only; the page is complete without it |
| `assets/` | Favicon and product photography |
| `robots.txt` | Crawling allowed, points at the sitemap |
| `sitemap.xml` | The two pages that actually exist |
| `llms.txt` | Machine-readable profile for agentic search |

## Publish

Push to `master`. GitHub Pages serves the repository root directly, so
`robots.txt`, `sitemap.xml` and `llms.txt` resolve at the domain root.

## Discovery

The site is meant to be readable by hiring and agentic search systems as well
as by people. Three surfaces carry that, and they must agree with each other:

1. **Visible copy** — the capability and "Open to" frames on the homepage.
2. **`schema.org` Person JSON-LD** in `index.html` — `knowsAbout` mirrors the
   visible capability copy, and nothing appears there that is not on screen.
3. **`llms.txt`** — the same claims in prose a model can read end to end.

If one changes, change all three. A machine-readable profile that outruns the
visible page is the failure this setup exists to avoid.

## The rule the copy follows

**Claim only what survives verification.** Every figure on the site is one a
gate produces — 141 Flutter tests, 610 TypeScript tests, 14 contract operations
verified, a signed v2 Android artifact — and the standing line says plainly
what is *not* true: not published, no store release, no production users, no
uptime figure.

The same rule governs the "Open to" section. Openness to distributed and
real-time systems work is stated as a direction, and `llms.txt` says outright
that there is no shipped RTB, HFT, high-throughput or sub-100ms latency work
behind it. Interest is not experience, and a recruiter's crawler should not be
able to read it as such.

## Content position

Senior Software Engineer / Product Engineer.
Systems-minded builder: architecture → implementation → verification → release.
