# ton-fassung.py · setzt eine geänderte Tonspur aus vorhandenen Aufnahmen zusammen und gleicht die Stimmlage an.
# 1. Schnitt: Teile werden an Wortankern (Whisper-Wortzeiten der Ausgangsspur) in der Mitte der gemessenen Pause geschnitten.
#    Die Schnittliste beschreibt die neue Reihenfolge: Datei-Teile, Ausschnitte der Ausgangsspur von Anker bis Anker.
# 2. Stimmlage: Die Spur wird an Pausen ab 0,35 s in Abschnitte geteilt; weicht die mittlere Tonhöhe eines Abschnitts mehr als
#    0,8 Halbtöne vom Median der ganzen Spur ab (YIN aus tonhoehe.py, Oktavsprünge der Messung zurückgefaltet), wird er mit ffmpeg rubberband (Formanten erhalten) auf den Median verschoben,
#    höchstens 2,5 Halbtöne; danach gleicht eine zweite Stufe die Drift im Fenster von ±20 s aus (ab 0,4, höchstens 1,5 Halbtöne), und auf den Pegel des Originals gebracht. Die Dauer bleibt gleich; Wortzeiten verschieben sich dadurch nicht.
# 3. Wortzeiten (mit --woerter-aus): Die Whisper-Wörter der Ausgangsspur werden mit den Schnitten umgerechnet; Datei-Teile bringen
#    ihre eigenen Wörter mit ("woerter": JSON von woerter.py). So braucht die neue Spur keinen zweiten Whisper-Lauf; danach ausrichten.py.
# Aufruf: python ton-fassung.py --sprache de --quelle <ton-de.wav> --woerter <woerter-de.json> --schnitt <schnitt.json> --aus <neu-de.wav>
import argparse, io, json, os, re, subprocess, tempfile, wave
import numpy as np
from tonhoehe import yin, falten, stimmlage

ap = argparse.ArgumentParser()
for a in ('--sprache', '--quelle', '--woerter', '--schnitt', '--aus'): ap.add_argument(a, required=True)
ap.add_argument('--ohne-angleichen', action='store_true')
ap.add_argument('--woerter-aus', help='JSON mit den umgerechneten Wortzeiten der neuen Spur')
a = ap.parse_args()

ZAHL = {'eins': '1', 'zwei': '2', 'drei': '3', 'vier': '4', 'one': '1', 'two': '2', 'three': '3', 'four': '4'}
def norm(s):
    n = re.sub(r'[^\w]+', '', s.lower().replace('ß', 'ss')).replace('_', '')
    return ZAHL.get(n, n)

def lies(p):
    with wave.open(p) as w:
        sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32)
    return sr, x
def schreib(p, sr, x):
    with wave.open(p, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(np.clip(x, -32768, 32767).astype(np.int16).tobytes())

def pausen(p, db=-38, d=0.18):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', p, '-af', f'silencedetect=noise={db}dB:d={d}', '-f', 'null', '-'], capture_output=True, text=True, encoding='utf-8', errors='replace')
    out, anf = [], None
    for z in r.stderr.splitlines():
        m = re.search(r'silence_start: ([0-9.]+)', z)
        if m: anf = float(m.group(1))
        m = re.search(r'silence_end: ([0-9.]+)', z)
        if m and anf is not None: out.append((anf, float(m.group(1)))); anf = None
    return out

sr, quelle = lies(a.quelle)
ww = json.load(io.open(a.woerter, encoding='utf-8'))['woerter']
toks = [norm(w['w']) for w in ww]
stille = pausen(a.quelle)

def finde(phrase, ab=0):
    ziel = [norm(t) for t in phrase.split() if norm(t)]
    for i in range(ab, len(toks) - len(ziel) + 1):
        if all(toks[i + k] == ziel[k] or (len(ziel[k]) > 3 and toks[i + k].startswith(ziel[k][:4])) for k in range(len(ziel))):
            return i
    raise SystemExit(f'Anker nicht gefunden: {phrase}')

def schnittzeit(i):
    # Mitte der gemessenen Pause zwischen Wort i-1 und Wort i; sonst Mitte der Lücke laut Whisper
    vorher = ww[i - 1]['e'] if i > 0 else 0.0
    s = ww[i]['s']
    beste = None
    for p0, p1 in stille:
        if p1 >= vorher - 0.3 and p0 <= s + 0.3:
            if beste is None or (p1 - p0) > (beste[1] - beste[0]): beste = (p0, p1)
    return (beste[0] + beste[1]) / 2 if beste else (vorher + s) / 2

plan = json.load(io.open(a.schnitt, encoding='utf-8'))[a.sprache]
teile, neuW, pos = [], [], 0.0
for t in plan:
    if 'datei' in t:
        s2, x = lies(t['datei']); assert s2 == sr
        if 'bis_s' in t: x = x[:int(t['bis_s'] * sr)]  # Datei-Teil vorne behalten, Rest (etwa ein Störlaut) weg
        teile.append(x); print('Datei', os.path.basename(t['datei']), f'{len(x) / sr:.2f} s')
        if t.get('woerter'):
            for w in json.load(io.open(t['woerter'], encoding='utf-8'))['woerter']:
                if w['s'] < len(x) / sr: neuW.append({'w': w['w'], 's': round(w['s'] + pos, 3), 'e': round(min(w['e'], len(x) / sr) + pos, 3)})
        pos += len(x) / sr; continue
    # Grenzen als Wortanker (Mitte der Pause davor) oder fest in Sekunden der Ausgangsspur (von_s, bis_s), etwa um einen Störlaut auszulassen
    if 'von_s' in t: t0 = t['von_s']; i0 = next(k for k, w in enumerate(ww) if w['s'] >= t0)
    elif t['von'] == 'ANFANG': t0, i0 = 0.0, 0
    else: i0 = finde(t['von'], t.get('ab', 0)); t0 = schnittzeit(i0)
    if 'bis_s' in t: t1 = t['bis_s']
    elif t['bis'] == 'ENDE': t1 = len(quelle) / sr
    else: t1 = schnittzeit(finde(t['bis'], i0 + 1))
    teile.append(quelle[int(t0 * sr):int(t1 * sr)])
    for w in ww:
        if t0 <= (w['s'] + w['e']) / 2 < t1: neuW.append({'w': w['w'], 's': round(max(w['s'], t0) - t0 + pos, 3), 'e': round(min(w['e'], t1) - t0 + pos, 3)})
    pos += (int(t1 * sr) - int(t0 * sr)) / sr
    print(f'Ausschnitt {str(t.get("von", t.get("von_s")))[:28]!r} bis {str(t.get("bis", t.get("bis_s")))[:28]!r}: {t0:.2f}–{t1:.2f} s')
neu = np.concatenate(teile)

if not a.ohne_angleichen:
    tmp = tempfile.mkdtemp(prefix='stimmlage-')
    roh = os.path.join(tmp, 'roh.wav'); schreib(roh, sr, neu)
    st = [p for p in pausen(roh, -38, 0.35)]
    grenzen = [0] + [int((p0 + p1) / 2 * sr) for p0, p1 in st] + [len(neu)]
    pegel = float(np.sqrt(np.mean((neu / 32768) ** 2)))  # stimmhafte Fenster nach dem Pegel der ganzen Spur, wie stimmlage.py
    f0 = lambda x: yin(x / 32768, sr, schwelle=0.2, pegel=pegel)[1]
    gesamt = stimmlage(f0(neu))
    okt = lambda f: falten(f, gesamt)  # Oktavsprünge der Messung zurückfalten, sonst springt der Median eines Satzes
    # Stufe 1 je Satz: Abweichung ab 0,8 Halbtönen auf den Median. Stufe 2 Drift: Median aller Sätze im Fenster von ±20 s
    # nach Stufe 1 (rechnerisch, ohne Audio); ab 0,4 Halbtönen wird der Rest ausgeglichen. Beides in einem rubberband-Durchgang.
    teile2 = [neu[grenzen[k]:grenzen[k + 1]] for k in range(len(grenzen) - 1)]
    mitte = [(grenzen[k] + grenzen[k + 1]) / 2 / sr for k in range(len(teile2))]
    fz = [okt(f0(x)) for x in teile2]
    s1 = []
    for f in fz:
        abw = 12 * np.log2(np.median(f) / gesamt) if len(f) >= 25 else 0.0
        s1.append(float(np.clip(-abw, -2.5, 2.5)) if abs(abw) >= 0.8 else 0.0)
    nachher = [f * 2 ** (d / 12) for f, d in zip(fz, s1)]
    aus, verschoben = [], 0
    for k, x in enumerate(teile2):
        fenster_f = np.concatenate([nachher[j] for j in range(len(teile2)) if abs(mitte[j] - mitte[k]) <= 20] or [np.array([gesamt])])
        drift = 12 * np.log2(np.median(fenster_f) / gesamt) if len(fenster_f) >= 25 else 0.0
        s2 = float(np.clip(-drift, -1.5, 1.5)) if abs(drift) >= 0.4 else 0.0
        schritt = float(np.clip(s1[k] + s2, -3.0, 3.0))
        if abs(schritt) < 0.3: aus.append(x); continue
        faktor = 2 ** (schritt / 12)
        ein, raus = os.path.join(tmp, f'a{k}.wav'), os.path.join(tmp, f'b{k}.wav')
        schreib(ein, sr, x)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', ein, '-af', f'rubberband=pitch={faktor:.5f}:formant=preserved:pitchq=quality:transients=smooth', '-ar', str(sr), '-ac', '1', raus], check=True)
        _, y = lies(raus)
        y = y[:len(x)] if len(y) >= len(x) else np.concatenate([y, np.zeros(len(x) - len(y), np.float32)])
        y = y * min(np.sqrt(np.mean(x ** 2)) / max(np.sqrt(np.mean(y ** 2)), 1e-6), 31800 / max(np.abs(y).max(), 1))  # rubberband senkt den Pegel um etwa 2,7 dB; auf den Pegel des Originals heben
        aus.append(y); verschoben += 1
        print(f'  Abschnitt {k}: {grenzen[k] / sr:7.1f} s, {len(x) / sr:4.1f} s lang, Satz {s1[k]:+.1f}, Drift {s2:+.1f}, verschoben {schritt:+.1f} Halbtöne')
    neu = np.concatenate(aus)
    print(f'Stimmlage: Median {gesamt:.1f} Hz, {len(grenzen) - 1} Abschnitte, {verschoben} angeglichen')
schreib(a.aus, sr, neu)
if a.woerter_aus:
    meta = {'sprache': a.sprache, 'dauer': round(len(neu) / sr, 3), 'spuren': [{'datei': os.path.basename(a.aus), 'beginn': 0, 'dauer': round(len(neu) / sr, 3)}], 'modell': 'large-v3', 'schnitt': os.path.basename(a.schnitt)}
    with open(a.woerter_aus, 'w', encoding='utf-8') as f: json.dump({'meta': meta, 'woerter': neuW}, f, ensure_ascii=False, indent=0)
    print('Wortzeiten', a.woerter_aus, len(neuW), 'Wörter')
print('fertig', a.aus, f'{len(neu) / sr:.2f} s')
