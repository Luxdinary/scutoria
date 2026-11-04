from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,zipfile,hashlib
R=Path(__file__).parent
class Links(HTMLParser):
 def __init__(self):super().__init__();self.urls=[]
 def handle_starttag(self,t,attrs):
  for k,v in attrs:
   if k in ['href','src']:self.urls.append(v)
bad=[]
for f in R.glob('*.html'):
 p=Links();p.feed(f.read_text(encoding='utf8'))
 for u in p.urls:
  if u.startswith(('http:','https:','#','data:','mailto:')):continue
  dest=R/unquote(urlsplit(u).path)
  if not dest.exists() and dest.name!='Scutoria-Paket-fuer-Claude.zip':bad.append([f.name,u])
qa=json.loads((R/'prototyp-tests.json').read_text(encoding='utf8'))
assert all(x['pass'] for x in qa['interactions']),qa
assert all(x['pass'] for x in qa['responsive']),qa
assert not bad,bad
allowed={'.html','.md','.jpg','.json'}
files=[p for p in R.rglob('*') if p.is_file() and p.name!='paket-manifest.json' and (p.suffix in allowed or p.name in ['LESEN.txt','HINWEIS.txt'])]
manifest={'date':'2026-11-01','html':len(list(R.glob('*.html'))),'interaction_checks':len(qa['interactions']),'responsive_checks':len(qa['responsive']),'missing_local_targets':bad,'files':[{'path':str(p.relative_to(R)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]}
(R/'paket-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
zpath=R/'Scutoria-Paket-fuer-Claude.zip'
with zipfile.ZipFile(zpath,'w',compression=zipfile.ZIP_DEFLATED) as z:
 for p in files+[R/'paket-manifest.json']:z.write(p,p.relative_to(R))
with zipfile.ZipFile(zpath) as z:assert z.testzip() is None
print(json.dumps({'files_in_zip':len(files)+1,'zip_bytes':zpath.stat().st_size,'interaction_checks':len(qa['interactions']),'responsive_checks':len(qa['responsive']),'missing_local_targets':bad},indent=2))
