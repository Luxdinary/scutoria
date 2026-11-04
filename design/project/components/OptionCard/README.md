OptionCard (Optionskarte) ist die Auswahl in jedem Check und Generator: eine Frage, eine kurze Liste ganzflächiger Optionen, eine gewählt.

Jede Option ist ein `label`, das ein verstecktes Radio umschließt, damit die ganze Karte klickbar ist. `surface` mit `border-control`-Rahmen und `radius-field`, Innenabstand `space-3` zu `space-4`, mindestens `control` hoch und mit dem Text wachsend. Titel in `body` mit Gewicht 500, Hinweis in `small` und `ink-muted`. Gewählt: `accent`-Rahmen, `accent-tint`-Fläche, gefüllter Punkt. Fokus: der `focus`-Ring an der Karte, obwohl das Eingabefeld versteckt ist. Optionen stehen in einer Spalte; nie mehr als sechs je Frage.

Der Verwender liefert die Frage (in `heading` über der Liste), die Optionen mit je einem einzeiligen Hinweis und die Fortschrittszeile („Question 3 of 20“).
