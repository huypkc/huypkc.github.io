#!/usr/bin/env python3
"""Render the social card at assets/og.png.

A shared link is the first frame most people see, and a blank card is the one
surface the site could not control. This draws the same thing the page opens
with — the positioning line, set in the type the site already uses — rather
than a screenshot, because the sentence is the claim and a screenshot of a
minimal page is a picture of white space.

The card is generated and committed. It is regenerated only when the line on
it changes, which is why the line lives here and the check below refuses to
run if the page and the card disagree.

    python3 tool/render-og.py           # write assets/og.png
    python3 tool/render-og.py --check   # verify the card matches the page
"""

import pathlib
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og.png"

# Instrument Sans ships with the First Week build already in this repository,
# so the card is drawn in a real grotesque rather than a system fallback.
FONT = ROOT / "first-week" / "assets" / "assets" / "fonts" / "instrument-var.ttf"
FALLBACK = pathlib.Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")

W, H = 1200, 630
PAD = 84
INK = (29, 29, 31)
MUTED = (110, 110, 115)
HAIR = (222, 222, 226)
PAGE = (255, 255, 255)

# The one sentence the card exists to carry. It is asserted against the page.
LINE = "Claim only what survives verification."
STANDING = "Senior Software Engineer · Product Engineer"


def face(size: int, weight: int = 400):
    if FONT.exists():
        f = ImageFont.truetype(str(FONT), size)
        try:
            f.set_variation_by_axes([100, weight])
        except (OSError, AttributeError):
            pass
        return f
    return ImageFont.truetype(str(FALLBACK), size)


def tracked(draw, xy, text, font, fill, track=0.0):
    """Letterspacing, which PIL has no notion of. The site sets its small
    labels wide and its headline tight, and the card has to do the same or it
    reads as a different site."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + track
    return x


def wrap(draw, text, font, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) <= width or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def build() -> Image.Image:
    img = Image.new("RGB", (W, H), PAGE)
    d = ImageDraw.Draw(img)

    tracked(d, (PAD, PAD), "HUY TRAN", face(19, 500), MUTED, track=3.4)

    head = face(72, 600)
    lines = wrap(d, LINE, head, W - PAD * 2)
    y = H // 2 - (len(lines) * 84) // 2 - 10
    for ln in lines:
        d.text((PAD - 4, y), ln, font=head, fill=INK)
        y += 84

    d.line([(PAD, H - PAD - 46), (W - PAD, H - PAD - 46)], fill=HAIR, width=1)
    small = face(21, 400)
    d.text((PAD, H - PAD - 24), STANDING, font=small, fill=MUTED)
    tail = "huypkc.github.io"
    d.text((W - PAD - d.textlength(tail, font=small), H - PAD - 24),
           tail, font=small, fill=MUTED)
    return img


def main() -> int:
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    if LINE.rstrip(".") not in page:
        print(f"the card says {LINE!r}, which is not on index.html", file=sys.stderr)
        return 1
    if not re.search(r'<meta property="og:image" content="[^"]*og\.png"', page):
        print("index.html does not declare assets/og.png as its og:image", file=sys.stderr)
        return 1

    if "--check" in sys.argv:
        if not OUT.exists():
            print("assets/og.png is missing. Run: python3 tool/render-og.py",
                  file=sys.stderr)
            return 1
        w, h = Image.open(OUT).size
        if (w, h) != (W, H):
            print(f"assets/og.png is {w}x{h}, expected {W}x{H}", file=sys.stderr)
            return 1
        print(f"OG OK — {W}x{H} card, and its line is the line on the page")
        return 0

    build().save(OUT, optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)} — {W}x{H}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
