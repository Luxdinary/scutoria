"""Erzeugt das Scutoria-Markenpaket neu: PNG-Exporte der Scutum-Marke und der Kachel, Favicon-Satz,
Kopien der vorhandenen Vorschau- und YouTube-Grafiken. Quelle der Form ist `design/project/assets/Logos/`.
Aufruf im Projektordner: python design/markenpaket/erzeugen.py
"""
from pathlib import Path
import shutil
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent

ACCENT = (0x4F, 0x8C, 0xFF, 255)      # accent, dunkel
INK = (0x14, 0x1A, 0x24, 255)         # ink auf Papier
TILE = (0x0A, 0x0C, 0x10, 255)        # Grund der Kachel (favicon.svg)

# Die Marke im 24er-Raster, wie in scutum-mark.svg: Schild als geschlossener Linienzug, dazu das Kreuz.
SHIELD = [(12, 2.5), (18.5, 5.7), (18.5, 17.3), (12, 21.5), (5.5, 17.3), (5.5, 5.7), (12, 2.5)]
CROSS = [[(12, 6), (12, 18)], [(8.5, 12), (15.5, 12)]]


def draw_mark(draw, scale, ox, oy, stroke, colour):
    """Zeichnet die Marke mit runden Enden und Ecken; scale = Pixel je Rastereinheit."""
    w = max(1, round(stroke * scale))
    r = w / 2
    pts = [(ox + x * scale, oy + y * scale) for x, y in SHIELD]
    draw.line(pts, fill=colour, width=w, joint="curve")
    for x, y in pts:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=colour)
    for line in CROSS:
        seg = [(ox + x * scale, oy + y * scale) for x, y in line]
        draw.line(seg, fill=colour, width=w)
        for x, y in seg:
            draw.ellipse((x - r, y - r, x + r, y + r), fill=colour)


def mark_png(size, colour, path):
    """Freigestellte Marke im vollen 24er-Feld (wie die SVG), überabgetastet und verkleinert."""
    ss = 8 if size <= 256 else 4
    big = size * ss
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw_mark(ImageDraw.Draw(img), big / 24, 0, 0, 1.8, colour)
    img.resize((size, size), Image.LANCZOS).save(path, optimize=True)


def tile_png(size, path, rounded=True):
    """Die Kachel aus favicon.svg: 64er-Feld, Radius 14, Marke um 8 versetzt und doppelt groß, Strich 2,1."""
    ss = 8 if size <= 256 else 4
    big = size * ss
    unit = big / 64
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    if rounded:
        draw.rounded_rectangle((0, 0, big - 1, big - 1), radius=round(14 * unit), fill=TILE)
    else:
        draw.rectangle((0, 0, big, big), fill=TILE)
    draw_mark(draw, 2 * unit, 8 * unit, 8 * unit, 2.1, ACCENT)
    small = img.resize((size, size), Image.LANCZOS)
    if path is not None:
        small.save(path, optimize=True)
    return small


GROUND = (0x0B, 0x11, 0x20, 255)     # ground, dunkel


def profile_png(size, path):
    """Profilbild wie marketing/youtube/ASSETS/profil.png: Grund ground, Marke mittig, ihr 24er-Feld nimmt 64 % der Breite."""
    ss = 4
    big = size * ss
    img = Image.new("RGBA", (big, big), GROUND)
    box = big * 0.64
    draw_mark(ImageDraw.Draw(img), box / 24, (big - box) / 2, (big - box) / 2, 1.8, ACCENT)
    img.resize((size, size), Image.LANCZOS).save(path, optimize=True)


def main():
    logo = OUT / "logo"
    (logo / "svg").mkdir(parents=True, exist_ok=True)
    (logo / "png").mkdir(parents=True, exist_ok=True)
    for name in ("scutum-mark.svg", "scutum-mark-ink.svg", "favicon.svg"):
        shutil.copy2(ROOT / "design/project/assets/Logos" / name, logo / "svg" / name)
    for size in (64, 128, 256, 512, 1024):
        mark_png(size, ACCENT, logo / "png" / f"scutum-mark-{size}.png")
        mark_png(size, INK, logo / "png" / f"scutum-mark-ink-{size}.png")

    fav = OUT / "favicon"
    fav.mkdir(exist_ok=True)
    for size in (16, 32, 48, 192, 512):
        tile_png(size, fav / f"favicon-{size}.png")
    tile_png(180, fav / "apple-touch-icon-180.png", rounded=False)
    profil = OUT / "profilbild"
    profil.mkdir(exist_ok=True)
    for size in (400, 800, 1080):
        profile_png(size, profil / f"profilbild-{size}.png")
    tile_png(256, None).save(fav / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    social = OUT / "vorschaubilder"
    social.mkdir(exist_ok=True)
    for f in sorted((ROOT / "site/public/og").glob("*.png")):
        shutil.copy2(f, social / f.name)

    yt = OUT / "youtube"
    yt.mkdir(exist_ok=True)
    for name in ("banner.png", "profil.png", "endscreen.png", "endscreen-de.png", "thumbnail-vorlage.png"):
        shutil.copy2(ROOT / "marketing/youtube/ASSETS" / name, yt / name)

    print("Markenpaket erzeugt:", OUT)


if __name__ == "__main__":
    main()
