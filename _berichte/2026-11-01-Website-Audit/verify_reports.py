from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json
r=Path(__file__).parent
class Links(HTMLParser):
 def __init__(self):super().__init__();self.urls=[]
 def handle_starttag(self,t,a):
  for k,v in a:
   if k in ['href','src']:self.urls.append(v)
bad=[]
for file in r.glob('*.html'):
 p=Links();p.feed(file.read_text(encoding='utf8'))
 for u in p.urls:
  if not u.startswith(('http','#')) and not (r/urlsplit(u).path).exists():bad.append([file.name,u])
print(json.dumps({'html_files':len(list(r.glob('*.html'))),'missing_local_targets':bad,'document_checks':len(json.loads((r/'document-checks.json').read_text(encoding='utf8')))},indent=2))
assert not bad
