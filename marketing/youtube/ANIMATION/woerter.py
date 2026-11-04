# woerter.py · Wortzeiten für die animierten Videos.
# Hängt die Tonspuren eines Videos in Reihenfolge aneinander, schreibt die Gesamttonspur und ermittelt
# mit Whisper large-v3 (lokal, faster-whisper) für jedes Wort Anfang und Ende in Sekunden ab Videobeginn.
# Aufruf: python woerter.py --sprache de --aus <ordner> <spur1.wav> <spur2.wav> ...
# Ergebnis im Ausgabeordner: ton-<sprache>.wav, woerter-<sprache>.json; neben der Szene: woerter-<sprache>.js (window.WOERTER).
import argparse, json, os, subprocess, sys, wave

ap = argparse.ArgumentParser()
ap.add_argument('--sprache', required=True)
ap.add_argument('--aus', required=True, help='Ordner für Gesamttonspur und JSON (außerhalb des Repos)')
ap.add_argument('--js', required=True, help='Pfad der woerter-<sprache>.js neben der Szene')
ap.add_argument('--modell', default='large-v3')
ap.add_argument('spuren', nargs='+')
a = ap.parse_args()
os.makedirs(a.aus, exist_ok=True)

ton = os.path.join(a.aus, f'ton-{a.sprache}.wav')
liste = os.path.join(a.aus, f'spuren-{a.sprache}.txt')
with open(liste, 'w', encoding='utf-8') as f:
    for s in a.spuren: f.write("file '" + s.replace(chr(92), "/") + "'" + chr(10))
subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', liste, '-c', 'copy', ton], check=True)

dauer = []
for s in a.spuren:
    with wave.open(s) as w: dauer.append(w.getnframes() / w.getframerate())

from faster_whisper import WhisperModel
# Auf diesem Rechner fehlen die CUDA-Bibliotheken (cublas), daher CPU mit allen Kernen.
m = WhisperModel(a.modell, device='cpu', compute_type='int8', cpu_threads=os.cpu_count() or 8)

woerter, off = [], 0.0
for s, d in zip(a.spuren, dauer):
    # Pausenerkennung (VAD) und kein Weiterreichen des vorigen Textes: weniger erfundene Wörter, genauere Zeiten an Absatzpausen
    segs, info = m.transcribe(s, language=a.sprache, word_timestamps=True, beam_size=5, vad_filter=True, vad_parameters=dict(min_silence_duration_ms=250), condition_on_previous_text=False)
    for seg in segs:
        for w in seg.words:
            woerter.append({'w': w.word.strip(), 's': round(w.start + off, 3), 'e': round(w.end + off, 3)})
    print(f'{os.path.basename(s)}: {d:.2f} s, Wörter bisher {len(woerter)}', flush=True)
    off += d

meta = {'sprache': a.sprache, 'dauer': round(off, 3), 'spuren': [{'datei': os.path.basename(s), 'beginn': round(sum(dauer[:i]), 3), 'dauer': round(d, 3)} for i, (s, d) in enumerate(zip(a.spuren, dauer))], 'modell': a.modell}
with open(os.path.join(a.aus, f'woerter-{a.sprache}.json'), 'w', encoding='utf-8') as f:
    json.dump({'meta': meta, 'woerter': woerter}, f, ensure_ascii=False, indent=0)
with open(a.js, 'w', encoding='utf-8') as f:
    f.write('// Erzeugt von ANIMATION/woerter.py; nicht von Hand ändern.\n')
    f.write('window.TON = ' + json.dumps(meta, ensure_ascii=False) + ';\n')
    f.write('window.WOERTER = ' + json.dumps(woerter, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('fertig', ton, len(woerter), 'Wörter', round(off, 2), 's')
