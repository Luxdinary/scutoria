Field (Feld) ist ein beschriftetes Eingabefeld mit Hinweiszeile für die wenigen getippten Antworten in einem Generator (Firmenname, Zahl der Beschäftigten, ein Datum).

Beschriftung in `small` mit Gewicht 600 darüber, Eingabefeld `control` hoch mit `radius-field` und `border-control`-Rahmen auf `surface`, Hinweis in `small` und `ink-muted` darunter. Im Fehlerzustand wechseln Rahmen und Hinweis auf `signal-red-text`, und der Hinweis sagt, was zu korrigieren ist. Fokus zeigt den `focus`-Ring. Höchstbreite 28rem; ein Feld dehnt sich nie über eine breite Seite.

Der Verwender liefert Beschriftung, Platzhalter, Wert und Hinweis. So wenig wie möglich abfragen; die meisten Antworten gehören in OptionCard.
