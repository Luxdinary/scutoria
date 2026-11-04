# Scutoria: Arbeitsregeln

Stand 18.10.2026. Dieser Ordner ist das einzige Projekt. Alte Repositories, Vault-Notizen, das Cowork-Projekt und der Ordner `C:\Users\Stefa\Claude` sind Archiv und werden nicht fortgeführt.

## Rollen
- Stefan entscheidet, liest, gibt frei. Er programmiert nicht, führt keine Gespräche, hat keinen Kundenkontakt und tritt nicht mit Namen oder Gesicht auf. Einzige Ausnahme: das Impressum, weil das Gesetz es verlangt.
- Claude baut, schreibt, gestaltet, recherchiert, deployt. Entscheidungen werden als Optionen mit Empfehlung vorgelegt, nie stillschweigend getroffen.

## Drei Tore, bei denen Claude immer fragt
Geld (Preise, Abos, Ausgaben), Recht (Texte, die live gehen), Veröffentlichen (Beiträge, Mails an Kunden, Live-Deploys).

## Sprache
- Produkte, Website, Tools, Beiträge: Englisch zuerst, Deutsch im selben Lauf.
- Dokumente für Stefan: Deutsch, du-Form, knapp, mit Empfehlung. Keine Emojis, keine Gedankenstriche als Einschub.

## Belegregel
Jede Zahl, Frist und Rechtsaussage trägt Quelle und Abrufdatum. Was nicht belegbar ist, heißt „nicht ermittelbar“ mit Grund. Keine Rechts- oder Steuerberatung; Unsicheres wird mit „Stand prüfen“ markiert.

## Technik
- Git lokal, kein GitHub. Die Git-Datenbank liegt außerhalb von OneDrive unter `C:\Users\Stefa\.scutoria-git`; der Ordner selbst enthält nur die Zeigerdatei `.git`. Nach jedem Commit sichert ein Hook die Historie als Bundle nach `_archiv/git-history.bundle`.
- scutoria.com läuft seit 30.10.2026 auf Lovable (Projekt „Scutoria“, E22); der alte Shop (Render-Dienst `swk-shop`) steht im Wartungsmodus und wird abgeschaltet (E40). Keine Änderungen bei Render, Stripe, Brevo oder GoDaddy ohne Stefans Wort; Veröffentlichen bei Lovable nur auf sein Wort.
- Deploy-Weg: Lovable (E22, löst E18 ab); Code lokal in `site/` gespiegelt, Übergabe byteweise mit Prüfsummen. Kasse: alles über Stripe (E19); Umsatzsteuer nach Auskunft des Steuerberaters.
- Keine Geheimnisse im Ordner. `.env`-Dateien sind ignoriert.

## Quellen der Wahrheit
1. Das Dossier: https://claude.ai/artifact/Svu6tyyfTezCn7naCSo2eY (Entscheidungen in der Datenbank, Sammlungen `entscheidungen` und `fragen`; mit ArtifactData auslesen).
2. `ENTSCHEIDUNGEN.md` (Export), `STAND.md`, `AUFGABEN.md`.
Bei Widerspruch gilt das Dossier.
