# Brief 1 (Gemini, 20.10.2026): Dynamik und Eye-Catcher

Quelle: von Stefan am 20.10.2026 eingereicht, Verfasser Gemini. Wortlaut unverändert.

---

Installiere als Senior Frontend Engineer und Motion-Designer zuerst die Bibliotheken 'framer-motion' und 'lucide-react' über npm. Unser Ziel ist es, die Website von SCUTORIA vollständig zu dynamisieren und interaktive "Eye-Catcher" zu implementieren, die technische Präzision und Freude bei der Nutzung vermitteln. Das Design muss extrem flüssig, edel und lebendig wirken – weg von der statischen Textwüste, hin zum High-End SaaS-Erlebnis.

Setze die folgenden drei High-Premium Eye-Catcher und Interaktionen direkt im Code um:

1. HERO EYE-CATCHER: DER INTERAKTIVE "DOKUMENTEN-SCANNER"
- Erstelle in der rechten Spalte der Hero-Sektion eine schwebende, dreidimensionale Vorschau unserer Dokumente (Weißes Papier, kontrastreich auf dem tiefblauen/schwarzen Hintergrund).
- Implementiere mithilfe von Tailwind-Animationen einen horizontalen, hauchdünnen Lichtstreifen (linearer Gradient in unserem Akzentblau mit hoher Opazität), der permanent und flüssig von oben nach unten über das Dokument gleitet (Dauer ca. 4 Sekunden, unendlich wiederholt).
- Nutze Framer Motion, um synchron zum Scan-Vorgang kleine Tech-Marker ("FAKT", "QUELLE", "RECHTSKONFORM") auf dem Dokument mit einem sanften Scale-In und Glow-Effekt aufploppen zu lassen.

2. CARD-UPGRADE: BENTO-GRID MIT MAUS-SPOTLIGHT
- Ordne die Produktlinien und Werkzeuge in einem modernen, asymmetrischen Bento-Grid an.
- Implementiere für jede Glassmorphismus-Karte einen "Mouse-Spotlight-Effekt": Ein radialer Gradient (rgba des Akzentblaus, opacity 0.15) soll der genauen Position des Mauszeigers innerhalb der Karte folgen, wenn der Nutzer darüberfährt.
- Die Status-Ampeln (Grün, Bernstein, Rot) bei den Free Tools müssen als echte CSS-Glow-Punkte (box-shadow) umgesetzt werden, die in einem unregelmäßigen, organischen Rhythmus sanft pulsieren (Atem-Effekt).

3. SCROLL-ANIMATION: DIE LEBENDIGE ZEITACHSE
- Verwandle die Schritte 1, 2 und 3 ("Beantworten", "Herunterladen", "In Kraft setzen") in eine zusammenhängende vertikale oder horizontale Zeitachse.
- Verwende Framer Motion (useScroll und useSpring), um eine feine Verbindungslinie zwischen den Zahlen proportional zum Scroll-Fortschritt des Nutzers mit unserem Akzentblau zu füllen.
- Sobald eine Zahl (z.B. Schritt 2 - Download) in den Sichtbereich des Nutzers scrollt, soll die Zahl kurz pulsieren und die dazugehörige Karte elegant von der Seite einfahren.

4. TEXT- UND TYPO-DYNAMIK
- Nutze für den Hauptslogan "Belegt. Datiert. Vorzeigbar." einen subtilen Texteffekt: Die Wörter sollen nicht zeitgleich, sondern elegant nacheinander (Staggered Animation, Abstand 0.2 Sekunden) mit einer leichten Aufwärtsbewegung eingeblendet werden.
- Stelle sicher, dass alle Schaltflächen (Buttons) bei Berührung (Hover) ihre Hintergrundfarbe sanft morphen und das Lucide-Icon im Button (z.B. ein Pfeil) sich um 4 Pixel nach rechts verschiebt.

Führe diese Änderungen sauber aus, achte darauf, dass keine Performance-Verluste entstehen, und teste die responsive Ansicht für mobile Endgeräte. Lass die Website absolute technologische Spitzenklasse ausstrahlen!

---

## Anmerkungen von Claude (20.10.2026)

- framer-motion und lucide-react sind React-Bibliotheken. Die Seite hat kein React (Express, serverseitiges HTML). Die Effekte lassen sich mit CSS und einem kleinen lokalen Skript bauen; die Icons gibt es als reine SVG-Dateien (Paket lucide-static).
- Der Marker „RECHTSKONFORM“ verstößt gegen die Markenregel (keine Konformitäts- oder Sicherheitsaussagen). Ersatz wären die echten Marker: Fakt, Quelle, Datiert.
- Tailwind wird nicht eingesetzt (Entscheidung Runde 1: CSP ohne Fremdskripte, Tokens als Quelle der Wahrheit).
