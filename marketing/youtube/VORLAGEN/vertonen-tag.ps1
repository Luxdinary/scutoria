# vertonen-tag.ps1 · vertont die Skripte eines Tages nacheinander über die Gemini-API (EN und DE je Skript, zwei Anfragen je Sprache).
# Aufruf (PowerShell, von C:\Users\Stefa\OneDrive\scutoria aus):
#   .\marketing\youtube\VORLAGEN\vertonen-tag.ps1 -Skripte 01-ai-rules-start,02-security-questionnaire
#   Optionen: -Model gemini-3.8-flash-tts (Standard) · -Voice Charon (Standard) · -Env C:\Automation\faceless-network\.env (Standard) · -Neu (vorhandene Dateien überschreiben)
# Free-Tier: zehn Anfragen je Tag und Modell; zwei Skripte in zwei Sprachen sind acht Anfragen. Das Skript bricht ab, sobald die API das Tageskontingent meldet.
param(
  [Parameter(Mandatory = $true)] [string[]] $Skripte,
  [string] $Model = 'gemini-3.8-flash-tts',
  [string] $Voice = 'Charon',
  [string] $Env = 'C:\Automation\faceless-network\.env',
  [switch] $Neu
)
$root = 'C:\Users\Stefa\OneDrive\scutoria'
Set-Location $root
foreach ($s in $Skripte) {
  foreach ($lang in @('en', 'de')) {
    $datei = "marketing/youtube/SKRIPTE/$s.$lang.md"
    if (-not (Test-Path $datei)) { Write-Output "fehlt: $datei"; continue }
    $args = @('marketing/youtube/VORLAGEN/vertonen.mjs', '--skript', $datei, '--voice', $Voice, '--model', $Model, '--env', $Env)
    if ($Neu) { $args += '--neu' }
    Write-Output ("== {0} {1} · {2} · {3}" -f $s, $lang, $Model, $Voice)
    & node @args 2>&1 | ForEach-Object { $_ -replace 'AIza[0-9A-Za-z_-]+', '[KEY]' -replace ' · usage \{"total_tokens":(\d+).*', ' · tokens $1' }
    if ($LASTEXITCODE -ne 0) { Write-Output "Abbruch bei $s $lang (Exit $LASTEXITCODE); Rest morgen."; exit $LASTEXITCODE }
  }
}
Write-Output "Tageslauf fertig."
