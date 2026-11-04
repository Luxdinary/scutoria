Button (Knopf) ist der eine Aufruf zum Handeln auf einer Seite, gefüllt mit `button` und beschriftet in `on-accent`; die Zweitvariante hat nur einen Rahmen in `border-control`. Dazwischen steht die starke Variante (`sc-btn--strong`) auf `surface-raised` mit `border-control`, für die zweite Handlung eines Hero („Start the generator“ neben „Buy annual licence“); die vierte Handlung ist ein Textlink, nie ein vierter Knopf.

Ein Hauptknopf je Ansicht; alles andere ist Zweitknopf oder Link. Höhe `control` (48 px), seitlicher Innenabstand `space-6`, `radius-pill`; die kleine Variante hat `control-sm` für die Leiste. Am Handy volle Breite. In nebeneinanderliegenden Karten den Knopf mit margin-top auto nach unten schieben, damit die Reihe auf einer Linie steht.

Zustände: Hover eine Stufe dunkler (`button-hover`), Aktiv zwei (`button-active`), Fokus der `focus`-Ring mit 2 px und 3 px Abstand, Deaktiviert bei 50 Prozent Deckkraft. Kein Leuchten, kein Wachsen, keine Knöpfe nur mit Icon.

Der Verwender liefert die Beschriftung (ein Verb: „Start the check“, „Buy · €199“) und die Aktion. Beschriftungen bleiben einzeilig.
