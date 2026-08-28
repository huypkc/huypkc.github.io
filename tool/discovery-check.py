#!/usr/bin/env python3
"""The three discovery surfaces must agree.

A profile that reads one way to a person and another to a crawler is the exact
failure this site is written against. Three surfaces carry the claims:

  1. the visible copy in index.html
  2. the schema.org Person JSON-LD, also in index.html
  3. llms.txt

This fails if they drift apart, if the sitemap and the files on disk disagree,
or if a claim of prior real-time/high-throughput production experience appears
anywhere it is not being explicitly denied.

Standard library only, so CI needs no install step.

    python3 tool/discovery-check.py
"""

import json
import pathlib
import re
import sys
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://huypkc.github.io"

problems: list[str] = []


def fail(msg: str) -> None:
    problems.append(msg)


def visible_text(html: str) -> str:
    """What a reader sees. Scripts and styles are stripped first, so the
    JSON-LD cannot satisfy a check about the visible page by quoting itself."""
    html = re.sub(r"<script\b.*?</script>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style\b.*?</style>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", html)
    return re.sub(r"\s+", " ", text)


index_html = (ROOT / "index.html").read_text()
one_frame_html = (ROOT / "one-frame.html").read_text()
llms = (ROOT / "llms.txt").read_text()
robots = (ROOT / "robots.txt").read_text()
seen = visible_text(index_html)

# ── 1 · the JSON-LD parses at all ────────────────────────────────────────
m = re.search(r'<script type="application/ld\+json">(.*?)</script>', index_html, re.S)
if not m:
    fail("index.html has no schema.org JSON-LD block")
    print("\n".join("  " + p for p in problems))
    sys.exit(1)

try:
    person = json.loads(m.group(1))
except json.JSONDecodeError as e:
    fail(f"the JSON-LD does not parse: {e}")
    print("\n".join("  " + p for p in problems))
    sys.exit(1)

# ── 2 · nothing is claimed to a machine that is not on the page ──────────
for term in person.get("knowsAbout", []):
    if term.lower() not in seen.lower():
        fail(f"knowsAbout {term!r} is not in the visible copy of index.html")
    if term.lower() not in llms.lower():
        fail(f"knowsAbout {term!r} is not in llms.txt")

titles = person.get("jobTitle", [])
if isinstance(titles, str):
    titles = [titles]
for title in titles:
    if title.lower() not in seen.lower():
        fail(f"jobTitle {title!r} is not in the visible copy of index.html")
    if title.lower() not in llms.lower():
        fail(f"jobTitle {title!r} is not in llms.txt")

# ── 3 · the same person, everywhere ──────────────────────────────────────
for url in person.get("sameAs", []):
    bare = url.replace("https://", "").replace("www.", "")
    if bare.rstrip("/") not in llms.replace("https://", "").replace("www.", ""):
        fail(f"sameAs {url!r} is not in llms.txt")

email = person.get("email", "").replace("mailto:", "")
if email and email not in index_html:
    fail(f"the JSON-LD email {email!r} is not reachable on the page")
if email and email not in llms:
    fail(f"the JSON-LD email {email!r} is not in llms.txt")

# ── 4 · the sitemap and the files on disk agree ──────────────────────────
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
locs = [e.text.strip() for e in ET.parse(ROOT / "sitemap.xml").getroot().iter(f"{{{ns['s']}}}loc")]

listed = set()
for loc in locs:
    if not loc.startswith(SITE):
        fail(f"sitemap entry {loc!r} is not on {SITE}")
        continue
    rel = loc[len(SITE):].lstrip("/") or "index.html"
    listed.add(rel)
    if not (ROOT / rel).exists():
        fail(f"sitemap lists {loc!r}, which does not exist in the repository")

for page in sorted(p.name for p in ROOT.glob("*.html")):
    if page not in listed:
        fail(f"{page} exists and is not in sitemap.xml")

# ── 5 · every page declares where it canonically lives ───────────────────
for name, html in (("index.html", index_html), ("one-frame.html", one_frame_html)):
    c = re.search(r'<link rel="canonical" href="([^"]+)"', html)
    if not c:
        fail(f"{name} has no canonical link")
        continue
    expected = f"{SITE}/" if name == "index.html" else f"{SITE}/{name}"
    if c.group(1) != expected:
        fail(f"{name} canonical is {c.group(1)!r}, expected {expected!r}")
    if not re.search(r'<meta name="robots" content="index, follow"', html):
        fail(f"{name} does not declare robots index, follow")

if f"Sitemap: {SITE}/sitemap.xml" not in robots:
    fail("robots.txt does not point at the sitemap")

# ── 6 · the overclaim guard ──────────────────────────────────────────────
# Interest in real-time systems is allowed and stated. Prior production
# experience in it is not, and must not be inferable from any surface.
FORBIDDEN = ["rtb", "high-frequency trading", "hft", "sub-100ms", "10m events",
             "10 million events"]

# The denial has to survive rewording, so this looks for one sentence that
# disclaims all three at once rather than for an exact form of words.
flat = re.sub(r"\s+", " ", llms.lower())
denials = [s for s in re.split(r"(?<=[.!?]) ", flat) if "no shipped" in s]
if not any(all(t in s for t in ("rtb", "hft", "sub-100ms")) for s in denials):
    fail("llms.txt no longer carries one sentence denying shipped RTB, HFT and "
         "sub-100ms work; either restore it or drop the real-time interest")

for surface, text in (("the visible page", seen), ("llms.txt", llms)):
    for word in FORBIDDEN:
        for hit in re.finditer(re.escape(word), text, re.I):
            context = text[max(0, hit.start() - 120):hit.end() + 60].lower()
            if "not" in context or "no shipped" in context:
                continue  # it is being denied, which is the point
            fail(f"{surface} contains {word!r} outside a denial — "
                 "that reads as a claim of experience")

# ── report ───────────────────────────────────────────────────────────────
if problems:
    print("DISCOVERY DRIFT\n")
    for p in problems:
        print(f"  {p}")
    print(f"\n{len(problems)} problem(s). The visible copy, the JSON-LD and "
          "llms.txt must say the same things.")
    sys.exit(1)

print(f"DISCOVERY OK — {len(person.get('knowsAbout', []))} capability terms, "
      f"{len(titles)} job titles and {len(locs)} sitemap entries agree across "
      "the page, the JSON-LD and llms.txt")
