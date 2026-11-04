# ausrichten.py · legt die Whisper-Wortzeiten auf den freigegebenen Sprechtext.
# Whisper verhört sich manchmal, lässt Wörter aus oder erfindet welche. Die Szene sucht ihre Wortanker aber im Skripttext.
# Deshalb bekommt jedes Wort des Sprechtexts eine Zeit: Passt es zu einem Whisper-Wort, dessen Zeit; sonst wird die Zeit
# zwischen den benachbarten sicheren Wörtern nach Wortlänge verteilt. Erfundene Whisper-Wörter fallen weg.
# Aufruf: python ausrichten.py --sprache de --woerter <woerter-de.json aus woerter.py> --text <ganz-de.txt> --js <video-NN/woerter-de.js>
import argparse, difflib, io, json, re, subprocess

ZAHL = {'eins': '1', 'zwei': '2', 'drei': '3', 'vier': '4', 'fuenf': '5', 'fünf': '5', 'sechs': '6', 'sieben': '7', 'acht': '8', 'neun': '9', 'zehn': '10',
        'elf': '11', 'zwoelf': '12', 'zwölf': '12', 'fuenfzehn': '15', 'fünfzehn': '15', 'fuenfzig': '50', 'fünfzig': '50',
        'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10',
        'eleven': '11', 'twelve': '12', 'fifteen': '15', 'fifty': '50'}

def norm(s):
    n = re.sub(r'[^\w]+', '', s.lower().replace('ß', 'ss')).replace('_', '')
    return ZAHL.get(n, n)

def teile(wort):
    # Bindestrich trennt Teile (Whisper schreibt „KI“ „-Tools“), jeder Teil wird einzeln verglichen
    return [p for p in (norm(x) for x in re.split(r'[-–/]', wort)) if p]

ap = argparse.ArgumentParser()
ap.add_argument('--sprache', required=True)
ap.add_argument('--woerter', required=True)
ap.add_argument('--text', required=True)
ap.add_argument('--js', required=True)
ap.add_argument('--ton', help='Gesamttonspur; gemessene Pausen korrigieren Wortanfänge')
a = ap.parse_args()

daten = json.load(io.open(a.woerter, encoding='utf-8'))
meta, ww = daten['meta'], daten['woerter']
text = io.open(a.text, encoding='utf-8').read()
text = re.sub(r'<[^>]+>', ' ', text)
skript = text.split()

# Teilfolgen bilden: (Index des Worts, normierter Teil)
st = [(i, p) for i, w in enumerate(skript) for p in teile(w)]
wt = [(j, p) for j, w in enumerate(ww) for p in teile(w['w'])]
sm = difflib.SequenceMatcher(None, [p for _, p in st], [p for _, p in wt], autojunk=False)
zeit = [[None, None] for _ in skript]
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        i = st[blk.a + k][0]; j = wt[blk.b + k][0]
        s, e = ww[j]['s'], ww[j]['e']
        if zeit[i][0] is None or s < zeit[i][0]: zeit[i][0] = s
        if zeit[i][1] is None or e > zeit[i][1]: zeit[i][1] = e

# Lücken füllen: zwischen zwei sicheren Wörtern nach Zeichenzahl verteilen
n = len(skript); sicher = [i for i in range(n) if zeit[i][0] is not None]
out = []
treffer = len(sicher)
i = 0
while i < n:
    if zeit[i][0] is not None:
        i += 1; continue
    j = i
    while j < n and zeit[j][0] is None: j += 1
    t0 = zeit[i - 1][1] if i > 0 else 0.0
    t1 = zeit[j][0] if j < n else meta['dauer']
    t1 = max(t1, t0 + 0.05 * (j - i))
    laenge = [max(1, len(skript[k])) for k in range(i, j)]
    summe = sum(laenge); pos = t0
    for k, l in zip(range(i, j), laenge):
        d = (t1 - t0) * l / summe
        zeit[k] = [round(pos, 3), round(pos + d * 0.9, 3)]; pos += d
    i = j

woerter = [{'w': w, 's': round(zeit[k][0], 3), 'e': round(zeit[k][1], 3), 'm': 1 if k in set(sicher) else 0} for k, w in enumerate(skript)]
# Kurze Wörter, die eine Pause davor mitschlucken (Whisper setzt den Anfang an den Pausenbeginn), vorne kürzen
for w in woerter:
    hoechst = 0.18 + 0.085 * len(w['w'])
    if w['e'] - w['s'] > hoechst + 0.35: w['s'] = round(w['e'] - hoechst, 3)
# Beginnt ein Wort in einer gemessenen Pause (ffmpeg silencedetect), rückt sein Anfang ans Pausenende
pausen = []
if a.ton:
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', a.ton, '-af', 'silencedetect=noise=-38dB:d=0.25', '-f', 'null', '-'], capture_output=True, text=True, encoding='utf-8', errors='replace')
    anf = None
    for z in r.stderr.splitlines():
        m = re.search(r'silence_start: ([0-9.]+)', z)
        if m: anf = float(m.group(1))
        m = re.search(r'silence_end: ([0-9.]+)', z)
        if m and anf is not None: pausen.append((anf, float(m.group(1)))); anf = None
    verschoben = 0
    for w in woerter:
        for p0, p1 in pausen:
            if p0 - 0.02 <= w['s'] < p1 - 0.05 and p1 - w['s'] < 2.5:
                w['s'] = round(p1, 3); w['e'] = round(max(w['e'], p1 + 0.1), 3); verschoben += 1; break
    print(f'{len(pausen)} Pausen gemessen, {verschoben} Wortanfänge ans Pausenende gerückt')
# Zeiten müssen aufsteigend sein (Ausreißer der Erkennung glätten)
for k in range(1, n):
    if woerter[k]['s'] < woerter[k - 1]['s']: woerter[k]['s'] = woerter[k - 1]['s']
    if woerter[k]['e'] < woerter[k]['s']: woerter[k]['e'] = woerter[k]['s']
meta = dict(meta, ausgerichtet=True, skriptwoerter=n, sicher=treffer)
with io.open(a.js, 'w', encoding='utf-8', newline='\n') as f:
    f.write('// Erzeugt von ANIMATION/woerter.py und ANIMATION/ausrichten.py; nicht von Hand ändern.\n')
    f.write('// Wörter des freigegebenen Sprechtexts mit Zeiten aus Whisper (m: 1 sicher zugeordnet, 0 verteilt).\n')
    f.write('window.TON = ' + json.dumps(meta, ensure_ascii=False) + ';\n')
    f.write('window.WOERTER = ' + json.dumps(woerter, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(f'{a.sprache}: {n} Skriptwörter, davon {treffer} sicher zugeordnet ({100 * treffer / n:.1f} %), Whisper-Wörter {len(ww)}')
