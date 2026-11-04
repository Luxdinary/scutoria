"""Prüft eine Variante gegen die harten Regeln des Briefs und erzeugt eine lokale Vorschau mit Seitengerüst.
Aufruf: python -I check.py variante-a.html"""
import re, sys, os

ROOT = os.path.dirname(os.path.abspath(__file__))
name = sys.argv[1]
path = os.path.join(ROOT, name)
t = open(path, encoding="utf-8").read()
problems = []

size = len(t.encode("utf-8"))
print(f"{name}: {size/1024:.0f} KB")
if size > 450 * 1024:
    problems.append(f"zu groß: {size/1024:.0f} KB")

head = t.lstrip()[:120].lower()
if not head.startswith("<title>"):
    problems.append("beginnt nicht mit <title>")
for tag in ("<html", "<head", "<body", "<!doctype"):
    if re.search(re.escape(tag) + r"[\s>]", t.lower()):
        problems.append(f"enthält {tag}")

# externe Verweise
for m in re.finditer(r'https?://[^\s"\'<>)]+', t):
    u = m.group(0)
    if not (u.startswith("https://fonts.googleapis.com") or u.startswith("https://fonts.gstatic.com") or u.startswith("https://scutoria.com")):
        problems.append(f"fremder Verweis: {u[:80]}")

# Bilder nur aus assets/
for m in re.finditer(r'src=["\']([^"\']+)["\']', t):
    s = m.group(1)
    if s.startswith("data:") and len(s) > 20000:
        problems.append("data-URI über 20 KB")
    elif not s.startswith("data:") and not s.startswith("assets/") and not s.startswith("https://fonts"):
        problems.append(f"src außerhalb assets/: {s[:60]}")

# sichtbarer Text ohne CSS/Script
visible = re.sub(r"<style[^>]*>.*?</style>", "", t, flags=re.S)
visible = re.sub(r"<script[^>]*>.*?</script>", "", visible, flags=re.S)
visible = re.sub(r"<[^>]+>", " ", visible)
# Datensatz-Script enthält die Texte; prüfe deshalb auch die Script-Strings auf verbotene Wörter
scripts = "".join(re.findall(r"<script[^>]*>(.*?)</script>", t, flags=re.S))
for word in ("verified", "compliant", "zertifiziert", "certified", "simulator", "compliance", "gdpr ready", "ai act ready", "rechtskonform"):
    n = len(re.findall(re.escape(word), (visible + scripts).lower()))
    if n:
        problems.append(f"verbotenes Wort „{word}“ {n}×")
for m in re.finditer(r"\d+\s?%", visible + scripts):
    ctx = (visible + scripts)[max(0, m.start()-30):m.end()+10].replace("\n", " ")
    if any(k in ctx for k in ("width", "height", "translate", "scale", "calc", "basis", "style=", "inset", "left:", "top:", "right:", "bottom:")):
        continue
    problems.append(f"Prozentzahl im Text: …{ctx}…")

for word in ("#00d4ff", "cyan"):
    if word in t.lower():
        problems.append(f"Cyan gefunden: {word}")

for must in ("window.SC", "claude:viewport-fit-sides", "fonts.googleapis.com/css2?family=Manrope", "IBM+Plex+Mono", "safe-area-inset-left", "prefers-reduced-motion", "<dialog"):
    if must not in t:
        problems.append(f"fehlt: {must}")

print("Probleme:" if problems else "keine Probleme gefunden")
for p in problems:
    print(" -", p)

# Vorschau mit dem Seitengerüst des Artefakt-Viewers
skeleton = ('<!doctype html><html><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
            'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>'
            '</head><body>')
out = os.path.join(ROOT, "preview-" + name)
open(out, "w", encoding="utf-8", newline="\n").write(skeleton + t + "</body></html>")
print("Vorschau:", out)
