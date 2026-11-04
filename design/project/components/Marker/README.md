Marker ist die Legende aus vier Formen, die dem Leser sagt, wie weit eine Aussage trägt: Fakt, Auslegung, Unsicher, Lücke.

Jeder Marker ist eine Form plus ihr Wort in der Stufe `stamp`: gefülltes Quadrat in `marker-fact`, Raute in `marker-interpretation`, halber Kreis in `marker-uncertain`, gestrichelter Kreis in `marker-gap`. Die Formen werden in CSS gezeichnet, nie als Emoji. Im Fließtext eröffnet der Marker den Absatz, den er bewertet; als Chip auf `surface-raised` steht er in Legenden, Tabellen und Nachweislisten. Ein Marker je Aussage; ein Absatz, der zwei bräuchte, ist zwei Absätze.

Auf der Website stehen die vier Marker einmal groß als Kacheln (`markers`, `markers__item`): eine dunkle, leicht durchscheinende Fläche mit `hairline`-Rahmen und einem 3-px-Streifen oben in der Markerfarbe, gestrichelt für Lücke; darin die Form (32 px, als SVG mit `pathLength`) und der Name in `stamp`, darunter die bestehende Bedeutung in `ink-muted`. Die Formen zeichnen sich einmal, wenn die Reihe zu 30 Prozent sichtbar ist (500 ms); bei reduzierter Bewegung stehen sie sofort. Auf dem Hero-Blatt sitzen die Marker als Index-Reiter (`paper__tab`) am rechten Rand, Form und Name in `on-signal` auf der Markerfarbe.

Der Verwender liefert die Art. Die Wörter sind festgelegt, englisch (Fact, Interpretation, Uncertain, Gap) und deutsch (Fakt, Auslegung, Unsicher, Lücke).
