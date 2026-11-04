# Lovable-Projekt „Scutoria Migration“: Aufbau nach Etappe 1

Stand 23. Oktober 2026, Lovable-Commit `190b5f78`. Projekt `1f1d2707-b98b-48de-8831-f1b78ea4bf6c`, Editor https://lovable.dev/projects/1f1d2707-b98b-48de-8831-f1b78ea4bf6c, Vorschau https://id-preview--1f1d2707-b98b-48de-8831-f1b78ea4bf6c.lovable.app (nur mit Lovable-Anmeldung, von außen 401).

## Wie Lovable die Website betreibt

- Unser Original-Code liegt unverändert unter `src/legacy/` (Kopie von `site/src/`), die Inhalte unter `content/`, Stylesheets, Schriften, Muster und Tools unter `public/`. Die Tests liegen als Spezifikation unter `reference/test/`.
- Zwei Server-Routen von TanStack Start (`src/routes/index.tsx` für `/`, `src/routes/$.tsx` für alle anderen Adressen) geben jede Anfrage an `src/lib/legacy-handler.ts` weiter, der `app.handle(request)` aus `src/legacy/server.mjs` aufruft.
- `src/legacy/runtime/express.mjs` ist ein kleiner, Express-5-ähnlicher Router für die Worker-Laufzeit; unsere Routen laufen damit unverändert. Gespiegelt in diesem Ordner.
- `src/legacy/runtime/files.mjs` bündelt Inhalte, Stylesheets und Schriften beim Bauen, weil die Laufzeit kein Dateisystem hat. Gespiegelt.
- Angepasst wurden: `config.mjs` (kein Dateisystem, Standard-`BASE_URL` scutoria.com), `markdown.mjs`, `toolkit/handbook.mjs`, `toolkit/engine.mjs`, `toolkit/documents/blocks.mjs` (Lesen über `files.mjs`), `server.mjs` (kein `listen`, keine statischen Dateien, keine Erinnerungs-Schleife), `shop/routes.mjs` (Adapter statt Express).
- Platzhalter bis Etappe 4: `db.mjs` (speichert nichts; gespiegelt), `toolkit/documents/pdf.mjs` (wirft einen Fehler). Die Originale liegen dort als `db.sqlite-reference.mjs.txt` und `pdf.chromium-reference.mjs.txt`.
- `AGENTS.md` und `.lovable/migrate-external-project/ledger.json` halten Regeln und Fortschritt fest.

## Bekannte Lücken nach Etappe 1

- Warteliste und Memo-Kontakte: Die Seite meldet Erfolg, gespeichert wird nichts. Vor jeder Veröffentlichung beheben.
- Seitenaufrufe werden nicht gezählt.
- Konto, Kauf, Generator-Läufe über mehrere Anfragen hinweg und PDF: erst Etappe 4 und 5.

## Kosten

Prüfung des Pakets 0,6 Credits, Etappe 1 3,7 Credits (Lovable-Connector, 23.10.2026).
