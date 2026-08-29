# huypkc.github.io profile site

Static personal profile and portfolio. No build step, no framework, no
tracking, no cookies.

## Files

| File | What it is |
|---|---|
| `index.html` | Homepage — held frames, one idea each |
| `timeline/index.html` | Engineering / research timeline, served at `/timeline` |
| `one-frame.html` | One Frame case study |
| `styles.css` | The whole visual language |
| `script.js` | Reveal-on-scroll only; the page is complete without it |
| `assets/` | Favicon and product photography |
| `robots.txt` | Crawling allowed, points at the sitemap |
| `sitemap.xml` | The pages that actually exist |
| `llms.txt` | Machine-readable profile for agentic search |
| `data/timeline.json` | Source of truth for the timeline |
| `data/runs.json` | Source of truth for the evidence appendix |
| `tool/render-timeline.py` | Renders both into committed static HTML |
| `tool/render-og.py` | Renders `assets/og.png`, the social card |
| `tool/redact-cv.py` | Publishes the CV with the phone number removed |
| `huy-tran-cv.pdf` | The published CV — generated, never copied by hand |
| `tool/discovery-check.py` | Gate: the three discovery surfaces must agree |

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
visible page is the failure this setup exists to avoid — so it is a gate, not a
convention:

```
python3 tool/discovery-check.py
python3 tool/render-timeline.py --check
python3 tool/render-og.py --check
```

It runs on every push and pull request to `master` (`.github/workflows/discovery.yml`)
and needs no install. It fails if a `knowsAbout` term or job title is missing
from the visible copy or from `llms.txt`, if `sameAs` or the contact address
disagree, if the sitemap and the files on disk drift apart, if a page loses its
canonical or its `robots` directive, or if the real-time denial in `llms.txt`
goes missing while the interest stays.

## The timeline

`/timeline` is a record of how the thinking changed, not a changelog. The unit
is a thought: an entry exists because something was thought on a date about
real work, and evidence hangs underneath it when evidence exists. An entry with
nothing but a context and a question is a complete entry — that is what
`HYPOTHESIS` is for.

Two rules the data enforces on itself:

- **Nothing is rewritten when a later entry contradicts it.** The original
  keeps its words and its status becomes `REVISED` or `SUPERSEDED`, with a
  `related` link to what replaced it. `tool/render-timeline.py` refuses to
  render a `related` id that matches no entry, so a chain cannot rot.
- **A commit dates an application, not an origin.** Where a thought predates
  the code that shows it, the entry carries a `dateNote` saying how its date
  was arrived at instead of borrowing precision from a SHA.

`data/timeline.json` is the source of truth and the HTML is generated from it
and committed, so the file on disk is the file that is served. The alternative
— fetching the JSON in the browser — would put the entire page behind
JavaScript, which is the failure this site is written against and would hide it
from the crawlers `llms.txt` exists to serve. Expansion is native
`<details>`, so the page is complete with no script at all. The homepage's
description of the timeline (how many entries, over what span, how many were
later contradicted) is generated from the same data, so it cannot overstate the
page it links to.

## The CV

`huy-tran-cv.pdf` is generated from the private CV, not copied from it. A CV
emailed to a recruiter and a CV on a crawlable URL are not the same document:
the phone number belongs on the first and not on the second. `tool/redact-cv.py`
drops those glyph codes out of the content stream, so the number is absent from
the file rather than hidden in it, and `pdftotext` output differs on exactly one
line. Re-export the CV and run the command again — do not copy the file in by
hand, or the number comes back.

```
pip install pikepdf
python3 tool/redact-cv.py ~/path/to/CV.pdf
```

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
