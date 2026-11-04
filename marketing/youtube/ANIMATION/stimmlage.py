# stimmlage.py · misst die Tonhöhe (Grundfrequenz) einer Sprachaufnahme, um Sprünge der Stimmlage zwischen
# TTS-Anfragen zu finden. YIN je 40-ms-Fenster (tonhoehe.py), Oktavsprünge der Messung zurückgefaltet, Median je Datei und je Minute.
# Aufruf: python stimmlage.py <datei.wav> [<datei2.wav> …]
import sys, wave
import numpy as np
from tonhoehe import yin, falten, stimmlage

for pfad in sys.argv[1:]:
    with wave.open(pfad) as w:
        sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    t, f = yin(x, sr, schwelle=0.2)
    g = stimmlage(f); f = falten(f, g); dauer = len(x) / sr
    proMin = [float(np.median(f[(t >= m * 60) & (t < (m + 1) * 60)])) for m in range(int(dauer // 60) + 1) if np.sum((t >= m * 60) & (t < (m + 1) * 60)) >= 20]
    spanne = 12 * np.log2(max(proMin) / min(proMin)) if proMin else 0
    print(f'{pfad.split(chr(92))[-1].split("/")[-1]}: {dauer:.0f} s · Median {g:.1f} Hz · je Minute ' + ' '.join(f'{v:.0f}' for v in proMin) + f' · Spanne {spanne:.1f} Halbtöne')
