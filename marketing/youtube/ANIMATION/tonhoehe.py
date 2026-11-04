# tonhoehe.py · Grundfrequenz einer Sprachaufnahme nach YIN (de Cheveigné und Kawahara 2002), nur mit numpy.
# Genauer als eine einfache Autokorrelation, weil die normierte Differenzfunktion kaum auf Formanten reagiert;
# das ist wichtig, wenn Abschnitte mit erhaltenen Formanten in der Tonhöhe verschoben und danach nachgemessen werden.
# Genutzt von ton-fassung.py und stimmlage.py.
import numpy as np


def yin(x, sr, fenster=0.04, schritt=0.01, fmin=60, fmax=320, schwelle=0.15, pegel=None):
    """x: float-Samples in [-1, 1]. Gibt Zeiten (Fenstermitte, s) und F0 (Hz) der stimmhaften Fenster zurück.
    Stimmhaft heißt: Pegel mindestens 0,6 mal `pegel` (Standard: Pegel von x) und ein Minimum unter `schwelle`."""
    W, tmin, tmax, h = int(fenster * sr), int(sr / fmax), int(sr / fmin) + 2, int(schritt * sr)
    L = W + tmax
    if len(x) < L + 1:
        return np.array([]), np.array([])
    if pegel is None:
        pegel = float(np.sqrt(np.mean(x ** 2)))
    starts = np.arange(0, len(x) - L, h)
    nfft = 1 << int(np.ceil(np.log2(L + W)))
    taus = np.arange(tmax)
    zt, fw = [], []
    for b in range(0, len(starts), 2000):
        st = starts[b:b + 2000]
        F = x[st[:, None] + np.arange(L)[None, :]].astype(np.float64)
        F -= F.mean(axis=1, keepdims=True)
        rms = np.sqrt(np.mean(F[:, :W] ** 2, axis=1))
        acf = np.fft.irfft(np.conj(np.fft.rfft(F[:, :W], nfft)) * np.fft.rfft(F, nfft), nfft)[:, :tmax]
        c = np.concatenate([np.zeros((len(st), 1)), np.cumsum(F ** 2, axis=1)], axis=1)
        d = c[:, W][:, None] + (c[:, taus + W] - c[:, taus]) - 2 * acf
        d[:, 0] = 0
        dn = np.ones_like(d)
        dn[:, 1:] = d[:, 1:] * taus[1:][None, :] / np.maximum(np.cumsum(d[:, 1:], axis=1), 1e-12)
        for i in range(len(st)):
            if rms[i] < pegel * 0.6:
                continue
            r = dn[i]
            unter = np.flatnonzero(r[tmin:tmax - 1] < schwelle)
            if not len(unter):
                continue
            k = int(unter[0]) + tmin
            while k + 1 < tmax - 1 and r[k + 1] < r[k]:
                k += 1
            a, m, c2 = r[k - 1], r[k], r[k + 1]
            nenner = a - 2 * m + c2
            kk = k + (0.5 * (a - c2) / nenner if nenner > 0 else 0.0)
            zt.append((st[i] + W / 2) / sr)
            fw.append(sr / kk)
    return np.array(zt), np.array(fw)


def falten(f, bezug):
    """Oktavsprünge der Messung zurückfalten: Werte über 1,5 mal `bezug` halbieren, unter 1/1,5 mal `bezug` verdoppeln.
    Verwerfen würde die Verteilung verzerren; ohne Faltung springt der Median eines Satzes bei wenigen Fehlern um Halbtöne."""
    f = np.asarray(f, dtype=np.float64).copy()
    for _ in range(3):
        f = np.where(f > 1.5 * bezug, f / 2, f)
        f = np.where(f < bezug / 1.5, f * 2, f)
    return f


def stimmlage(f):
    """Robuster Bezugswert einer ganzen Spur: Median nach Faltung um den rohen Median."""
    f = np.asarray(f)
    return float(np.median(falten(f, np.median(f)))) if len(f) else float('nan')
