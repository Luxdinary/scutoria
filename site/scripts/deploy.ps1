# Baut das Website-Image und lädt es in die private Registry (E18: Docker-Image, kein GitHub).
# Voraussetzungen: Docker Desktop läuft, `docker login` ist einmal erfolgt,
# Umgebungsvariable SCUTORIA_IMAGE = docker.io/<benutzer>/scutoria-site
# Aufruf: powershell -File site\scripts\deploy.ps1 [-Tag 2026-10-25]
param(
  [string]$Tag = (Get-Date -Format 'yyyy-MM-dd-HHmm'),
  [string]$Repo = $env:SCUTORIA_IMAGE
)
$ErrorActionPreference = 'Stop'
if (-not $Repo) { throw 'SCUTORIA_IMAGE fehlt, zum Beispiel docker.io/<benutzer>/scutoria-site' }
$site = Resolve-Path (Join-Path $PSScriptRoot '..')
Push-Location $site
try {
  npm run build:assets; if ($LASTEXITCODE -ne 0) { throw 'build:assets fehlgeschlagen' }
  npm test; if ($LASTEXITCODE -ne 0) { throw 'Tests fehlgeschlagen, kein Deploy' }
  docker build --build-arg "APP_VERSION=$Tag" -t "${Repo}:${Tag}" -t "${Repo}:latest" .; if ($LASTEXITCODE -ne 0) { throw 'docker build fehlgeschlagen' }
  docker push "${Repo}:${Tag}"; if ($LASTEXITCODE -ne 0) { throw 'docker push fehlgeschlagen' }
  docker push "${Repo}:latest"; if ($LASTEXITCODE -ne 0) { throw 'docker push latest fehlgeschlagen' }
  Write-Output "Image ${Repo}:${Tag} liegt in der Registry. Render zieht :latest beim naechsten Deploy (Dashboard oder Claude)."
} finally {
  Pop-Location
}
