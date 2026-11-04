Card (Karte) fasst ein Angebot, ein Tool oder einen Schritt auf `surface` mit `hairline`-Rahmen und `radius-card`.

Innenabstand `space-6` am Handy und `space-8` am Desktop; der Inhalt stapelt sich mit `space-3`: ein optionaler Kicker in `label`, ein Titel in `heading`, Text in `body` und `ink-muted` bis `measure`, dann die Knopfreihe, mit margin-top auto nach unten geschoben, damit Knöpfe benachbarter Karten eine Grundlinie teilen. Text beginnt oben, nie mittig. Karten im Raster haben den Abstand `space-6`; keine Schatten auf Papier, `shadow-card` nur für das erhöhte Cover-Objekt auf dunklem Grund.

Karten sind Flächen auf `surface`, kein Glas, kein Weichzeichner, kein Anheben bei Hover; nur der Rahmen wird eine Stufe heller. Papier ist keine Karte (siehe Paper). Die Karte eines Werkzeugs (`sc-card--tool`, auf der Tools-Seite `sc-card--big`) trägt vor der Knopfreihe eine Vorschau auf dunklem Einsatz (siehe Preview). Ein Toolkit, das nicht im Verkauf ist, steht als Regal (`sc-card--shelf`): gestrichelter Rahmen, Titel in `ink-muted`, Mono-Vermerk „Not on sale“, Textlink statt Knopf.

Der Verwender liefert Kicker, Titel, Text und bis zu zwei Aktionen.
