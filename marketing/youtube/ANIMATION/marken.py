# marken.py · liest die Marker und Quellen eines freigegebenen Skripts (EN und DE) und schreibt sie für die Szene.
# Je markiertem Absatz: Art des Markers, Quelle wörtlich aus dem Skript, Anfangswörter des Absatzes und des folgenden Absatzes (Wortanker).
# Aufruf: python marken.py <SKRIPTE/NN-slug> <video-NN/marken.js>
import io, json, re, sys

ART = {'fakt': 'fakt', 'fact': 'fakt', 'auslegung': 'auslegung', 'interpretation': 'auslegung', 'unsicher': 'unsicher', 'uncertain': 'unsicher', 'lücke': 'luecke', 'luecke': 'luecke', 'gap': 'luecke'}

def lies(pfad):
    s = io.open(pfad, encoding='utf-8').read()
    s = s[s.index('## Script'):]
    s = s[:s.index('## Regie')] if '## Regie' in s else s
    absaetze, marker, quelle = [], None, None
    for zeile in s.split('\n'):
        z = zeile.strip()
        if not z or z.startswith('#') or (z.startswith('<') and z.endswith('>')):
            continue
        m = re.match(r'^\[(MARKER|QUELLE|SOURCE|SCREEN)\s*:\s*(.*)\]$', z)
        if m:
            if m.group(1) == 'MARKER': marker = ART[m.group(2).strip().lower()]
            elif m.group(1) in ('QUELLE', 'SOURCE') and absaetze: absaetze[-1]['quelle'] = m.group(2).strip()
            continue
        absaetze.append({'text': z, 'marker': marker, 'quelle': None}); marker = None
    return absaetze

def anfang(text, n=4):
    w = re.sub(r'[„“"”]', '', text).split()
    return ' '.join(w[:n])

basis, ziel = sys.argv[1], sys.argv[2]
de, en = lies(basis + '.de.md'), lies(basis + '.en.md')
assert len(de) == len(en), (len(de), len(en))
out = []
for i, (d, e) in enumerate(zip(de, en)):
    assert d['marker'] == e['marker'], (i, d['marker'], e['marker'])
    if not d['marker']: continue
    nd = de[i + 1]['text'] if i + 1 < len(de) else ''
    ne = en[i + 1]['text'] if i + 1 < len(en) else ''
    out.append({'absatz': i, 'art': d['marker'], 'quelle': {'de': d['quelle'], 'en': e['quelle']} if d['quelle'] else None,
                'start': {'de': anfang(d['text']), 'en': anfang(e['text'])}, 'weiter': {'de': anfang(nd), 'en': anfang(ne)}})
with io.open(ziel, 'w', encoding='utf-8', newline='\n') as f:
    f.write('// Erzeugt von ANIMATION/marken.py aus den freigegebenen Skripten; nicht von Hand ändern.\n')
    f.write('window.MARKEN_DATEN = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
    f.write('window.ABSAETZE = ' + json.dumps([{'de': anfang(d['text'], 5), 'en': anfang(e['text'], 5)} for d, e in zip(de, en)], ensure_ascii=False) + ';\n')
print(len(de), 'Absätze,', len(out), 'markiert')
for o in out: print(o['absatz'], o['art'], '|', o['start']['de'], '|', (o['quelle'] or {}).get('de', '')[:60])
