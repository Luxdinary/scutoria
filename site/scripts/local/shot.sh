#!/bin/bash
# Screenshot of a local HTML file or URL with Chrome (no window, own profile in the scratchpad, reduced motion, scale 1).
# Usage: bash scripts/local/shot.sh <file-or-url> <width> <height> <out.png>
# Note: on Windows the headless window is never narrower than about 500 px; phone widths must be checked with device emulation.
SRC="$1"; W="$2"; H="$3"; OUT="$4"
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
PROFILE="C:/Users/Stefa/AppData/Local/Temp/claude/C--Users-Stefa-OneDrive-scutoria/2bd5f3e6-fc88-4cc8-85f2-34265e43c491/scratchpad/varianten/chrome-profile"
case "$SRC" in http*) URL="$SRC" ;; *) URL="file:///$(cygpath -m "$SRC")" ;; esac
"$CH" --headless=new --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check --user-data-dir="$PROFILE" \
  --virtual-time-budget=6000 --force-prefers-reduced-motion --force-device-scale-factor=1 --window-size="$W,$H" --screenshot="$OUT" "$URL" >/dev/null 2>&1
echo "$OUT $(stat -c %s "$OUT" 2>/dev/null)"
