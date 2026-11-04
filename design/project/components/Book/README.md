Book (Cover auf der Website) zeigt ein Toolkit als Hardcover in CSS 3D: Deckel, Rücken, Buchblock und Rückseite als sechs Flächen eines Körpers, leicht gedreht (24 Grad um die Hochachse, 6 Grad zum Betrachter geneigt), mit einem weichen Schatten auf dem Tisch.

Der Deckel folgt dem Aufbau des Druck-Covers (ProductCover): Marke und SCUTORIA oben links, der Linienname oben rechts, „Toolkit · 01“ in Versalien, der Titel in Manrope 800, die Nummer als Kontur, der Claim als Balken über einer Linie, darunter die Formatzeile „PDF · DOCX · XLSX“. Die Seite neben dem Cover nennt das Toolkit im Text; das Cover ist für Hilfstechnik ausgeblendet.

Zwei Varianten. `book--colour` ist der Stand der Website (entschieden 20. Oktober 2026): der Deckel in der Linienfarbe (`book--policy` Blau, `book--security` Türkis, `book--setup` Bernstein), gemischt mit `ground` als Grund und zu `cover-deep` am Rücken, Schrift in Weiß und Silber, der Streifen am Rücken weiß zu 22 Prozent. `book--dark` ist das Druck-Cover als Körper: `cover-ground` mit dem Linienstreifen. Violett gibt es nicht als Linie; es bleibt dem Auslegungs-Marker vorbehalten.

Die Größe setzt `--w`; alles im Buch skaliert mit ihr (`book--hero` 300 px, `book--offer` 180 px). Bei Hover mit Maus dreht der Körper sieben Grad weiter, hebt 4 px und der Schatten wächst, 500 ms; am Handy steht er still. Kein Filter auf einem Vorfahren des Buchs, sonst fällt das 3D flach.

Der Verwender liefert Linie, Nummer, Titel und Größe.
