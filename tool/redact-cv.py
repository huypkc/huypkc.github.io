#!/usr/bin/env python3
"""Publish the CV with the phone number removed.

A CV emailed to a recruiter and a CV on a crawlable URL are not the same
document. The phone number belongs on the first and not on the second, so the
published copy is generated from the private one rather than being a separate
file that has to be remembered and kept in step.

This deletes the glyphs, not the appearance of them: the codes are dropped from
the text-showing operators, so the number is absent from the content stream and
from any copy, extract or index of it. Everything else in the file is untouched
— `pdftotext` output differs on exactly one line.

Needs pikepdf, which is why this is an authoring command and not a CI gate:

    pip install pikepdf
    python3 tool/redact-cv.py ~/path/to/CV.pdf
"""

import pathlib
import re
import sys

import pikepdf

OUT = pathlib.Path(__file__).resolve().parent.parent / "huy-tran-cv.pdf"
# The separator in front is taken too, so no dangling " | " is left behind.
PHONE = re.compile(r"\s*\|?\s*0983\s*688\s*845")


def cmap(font):
    """code -> character, from the font's own ToUnicode map. The fonts are
    subset with private codes, so the digits are not searchable as bytes."""
    out = {}
    tu = font.get("/ToUnicode")
    if tu is None:
        return out
    data = tu.read_bytes().decode("latin-1")
    for blk in re.findall(r"beginbfchar(.*?)endbfchar", data, re.S):
        for s, d in re.findall(r"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", blk):
            out[s.lower()] = bytes.fromhex(d).decode("utf-16-be", "replace")
    for blk in re.findall(r"beginbfrange(.*?)endbfrange", data, re.S):
        for lo, hi, d in re.findall(
                r"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", blk):
            base = int(d, 16)
            for i in range(int(lo, 16), int(hi, 16) + 1):
                out[f"{i:0{len(lo)}x}"] = chr(base + i - int(lo, 16))
    return out


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__.strip().splitlines()[-1], file=sys.stderr)
        return 2
    pdf = pikepdf.open(sys.argv[1])
    removed = 0

    for pno, pg in enumerate(pdf.pages, 1):
        page = pikepdf.Page(pg)
        fonts = page.Resources.get("/Font")
        if fonts is None:
            continue
        maps = {str(k): cmap(v) for k, v in fonts.items()}
        raw = page.obj.Contents.read_bytes().decode("latin-1")

        cur, ops, glyphs = None, [], []
        for t in re.finditer(r"/(\w+)\s+[\d.]+\s+Tf|<([0-9A-Fa-f]*)>", raw):
            if t.group(1):
                cur = "/" + t.group(1)
                continue
            h = (t.group(2) or "").lower()
            m = maps.get(cur, {})
            w = max((len(k) for k in m), default=2)
            codes = [h[i:i + w] for i in range(0, len(h), w)]
            ops.append((t.start(), t.end(), codes))
            for j, c in enumerate(codes):
                glyphs.append((len(ops) - 1, j, m.get(c, "")))

        flat = "".join(g[2] for g in glyphs)
        cut = set()
        for m in PHONE.finditer(flat):
            off = 0
            for oi, j, ch in glyphs:
                if off < m.end() and off + len(ch) > m.start():
                    cut.add((oi, j))
                off += len(ch)
        if not cut:
            continue

        edited, last = [], 0
        for oi, (s, e, codes) in enumerate(ops):
            keep = [c for j, c in enumerate(codes) if (oi, j) not in cut]
            if len(keep) == len(codes):
                continue
            removed += len(codes) - len(keep)
            edited.append(raw[last:s])
            edited.append("<" + "".join(keep) + ">")
            last = e
        edited.append(raw[last:])
        page.obj.Contents = pdf.make_stream("".join(edited).encode("latin-1"))
        print(f"page {pno}: {len(cut)} glyphs dropped")

    if not removed:
        print("no phone number found — check the pattern before publishing",
              file=sys.stderr)
        return 1
    pdf.save(OUT)
    print(f"wrote {OUT.name} — {removed} glyphs removed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
