from pathlib import Path
import shutil,json
out=Path('.')
old=Path(r'C:/Users/Stefa/OneDrive/scutoria/_berichte/2026-11-02-Fuenf-Premium-Designs')
shutil.copy(old/'config.js','catalog-data.js')
for a in ['03-business-atlas.webp','04-signal-studio.webp','01-sapphire-vault.webp']:
 shutil.copy(old/'assets'/a,out/'assets'/a)
for n,name in enumerate(['Atlas Studio','Signal Journey','Open Campus'],1):
 Path(f'variante-{n}.html').write_text(f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Scutoria · {name}</title><link rel="stylesheet" href="design.css"></head><body data-design="{n}"><div id="app"></div><script src="catalog-data.js"></script><script src="app.js"></script></body></html>''',encoding='utf-8')
