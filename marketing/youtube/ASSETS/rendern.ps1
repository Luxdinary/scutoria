# rendern.ps1 · erzeugt PNG-Dateien aus den HTML-Vorlagen mit dem vorhandenen Microsoft Edge (ohne Fenster).
# Aufruf (PowerShell, in diesem Ordner): .\rendern.ps1
# Ergebnis: banner.png (2560 × 1440), profil.png (800 × 800), endscreen.png und endscreen-de.png (1920 × 1080), thumbnail-vorlage.png (2560 × 1440).
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
if (-not (Test-Path $edge)) { throw "Microsoft Edge nicht gefunden." }
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$profile = Join-Path $env:TEMP "scutoria-edge-render"
$jobs = @(
  @{ html = "banner.html"; png = "banner.png"; w = 2560; h = 1440 },
  @{ html = "profil.html"; png = "profil.png"; w = 800; h = 800 },
  @{ html = "endscreen.html"; png = "endscreen.png"; w = 1920; h = 1080 },
  @{ html = "endscreen-de.html"; png = "endscreen-de.png"; w = 1920; h = 1080 },
  @{ html = "thumbnail-vorlage.html"; png = "thumbnail-vorlage.png"; w = 2560; h = 1440 }
)
foreach ($j in $jobs) {
  $src = "file:///" + ((Join-Path $here $j.html) -replace '\\', '/')
  $out = Join-Path $here $j.png
  & $edge --headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$profile" --window-size=$($j.w),$($j.h) --screenshot="$out" "$src" 2>$null | Out-Null
  if (Test-Path $out) { Write-Output ("Erzeugt: {0}" -f $out) } else { Write-Output ("Fehlgeschlagen: {0}" -f $j.png) }
}
