# quellen.py · Ergänzung zu ANIMATION/marken.py für Video 02: Absätze mit [QUELLE], aber ohne [MARKER].
# Sie bekommen in der Szene nur die Quellenleiste (ohne Marker-Kapsel). Liest die Skripte genauso wie marken.py.
# Aufruf: python video-02/quellen.py <SKRIPTE/NN-slug> <video-02/quellen.js>
import io, json, re, sys

def lies(pfad):
    s = io.open(pfad, encoding='utf-8').read()
    s = s[s.index('## Script'):]
    s = s[:s.index('## Regie')] if '## Regie' in s else s
    absaetze, marker = [], None
    for zeile in s.split('\n'):
        z = zeile.strip()
        if not z or z.startswith('#') or (z.startswith('<') and z.endswith('>')):
            continue
        m = re.match(r'^\[(MARKER|QUELLE|SOURCE|SCREEN)\s*:\s*(.*)\]$', z)
        if m:
            if m.group(1) == 'MARKER': marker = m.group(2).strip()
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
    if d['marker'] or not d['quelle']: continue
    assert e['quelle'] and not e['marker'], i
    nd = de[i + 1]['text'] if i + 1 < len(de) else ''
    ne = en[i + 1]['text'] if i + 1 < len(en) else ''
    out.append({'absatz': i, 'quelle': {'de': d['quelle'], 'en': e['quelle']},
                'start': {'de': anfang(d['text']), 'en': anfang(e['text'])}, 'weiter': {'de': anfang(nd), 'en': anfang(ne)}})
with io.open(ziel, 'w', encoding='utf-8', newline='\n') as f:
    f.write('// Erzeugt von video-02/quellen.py aus den freigegebenen Skripten; nicht von Hand ändern.\n')
    f.write('window.QUELLEN_DATEN = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
print(len(out), 'Absätze mit Quelle ohne Marker')
for o in out: print(o['absatz'], '|', o['start']['de'], '|', o['quelle']['de'][:70])
