# sprechtext.ps1 · zieht aus einem Skript den reinen Sprechtext für die Gemini-Stimme.
# Aufruf (PowerShell): .\sprechtext.ps1 -Skript ..\SKRIPTE\01-ai-rules-start.en.md
# Ergebnis: Datei mit Endung .sprechtext.txt neben dem Skript. Entfernt werden: alles vor "## Script",
# Überschriften (#), Zeilen in eckigen Klammern ([SCREEN], [SOURCE], [QUELLE], [MARKER]) und leere Doppelzeilen.
# Die Gemini-Tags <short pause> und <long pause> bleiben stehen.
param(
  [Parameter(Mandatory = $true)] [string] $Skript
)
if (-not (Test-Path $Skript)) { throw "Datei nicht gefunden: $Skript" }
$zeilen = Get-Content -Path $Skript -Encoding UTF8
$start = 0
for ($i = 0; $i -lt $zeilen.Count; $i++) {
  if ($zeilen[$i] -match '^## (Script|Skript|Sprechtext)') { $start = $i + 1; break }
}
$aus = New-Object System.Collections.Generic.List[string]
$leer = $false
for ($i = $start; $i -lt $zeilen.Count; $i++) {
  $z = $zeilen[$i]
  if ($z -match '^## ') { break }            # Ende des Sprechteils (etwa "## Regie")
  if ($z -match '^\s*#') { continue }
  if ($z -match '^\s*\[') { continue }
  if ($z -match '^\s*\|') { continue }        # Tabellenzeilen
  if ($z -match '^\s*$') { if (-not $leer) { $aus.Add(''); $leer = $true }; continue }
  $aus.Add($z.Trim()); $leer = $false
}
$ziel = [System.IO.Path]::ChangeExtension($Skript, '.sprechtext.txt')
[System.IO.File]::WriteAllLines($ziel, $aus, (New-Object System.Text.UTF8Encoding $false))
$woerter = (($aus -join ' ') -split '\s+' | Where-Object { $_ -ne '' }).Count
Write-Output ("Geschrieben: {0} ({1} Wörter)" -f $ziel, $woerter)
