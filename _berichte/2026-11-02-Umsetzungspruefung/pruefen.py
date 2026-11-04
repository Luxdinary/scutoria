from html.parser import HTMLParser
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin
import requests,json
R=Path(__file__).parent
class P(HTMLParser):
 def __init__(self):
  super().__init__();self.title='';self.it=False;self.h1=0;self.main=False;self.text=[];self.links=[];self.scripts=[];self.robots='';self.forms=[]
 def handle_starttag(self,t,attrs):
  d=dict(attrs)
  if t=='title':self.it=True
  if t=='h1':self.h1+=1
  if t=='main':self.main=True
  if t=='a' and d.get('href'):self.links.append(d['href'])
  if t=='script' and d.get('src'):self.scripts.append(d['src'])
  if t=='meta' and d.get('name')=='robots':self.robots=d.get('content','')
  if t=='form':self.forms.append({k:d.get(k) for k in ['action','method']})
 def handle_endtag(self,t):
  if t=='title':self.it=False
  if t=='main':self.main=False
 def handle_data(self,s):
  if self.it:self.title+=s
  if self.main:self.text.append(s)
paths=['/de/','/','/de/tools','/de/toolkits/ki-richtlinien','/de/toolkits/sicherheitsnachweis','/de/toolkits/ki-richtlinien/handbuch','/de/toolkits/sicherheitsnachweis/handbuch','/toolkits/ai-policy/handbook','/toolkits/security-evidence/handbook','/de/datenschutz','/de/ueber','/de/impressum','/de/agb','/robots.txt','/audit-missing-page-20261101']
def fetch(path):
 u=urljoin('https://scutoria.com',path)
 try:
  x=requests.get(u,headers={'Cache-Control':'no-cache'},timeout=30);p=P();p.feed(x.content.decode('utf8','replace'))
  text=' '.join(' '.join(p.text).split());out={'url':u,'status':x.status_code,'title':p.title,'h1':p.h1,'robots':p.robots,'main':text,'links':p.links,'scripts':p.scripts,'forms':p.forms,'csp':x.headers.get('Content-Security-Policy'),'date':x.headers.get('Date'),'lovable_badge':'id="lovable-badge"' in x.text,'analytics_script':any('__l5e' in s for s in p.scripts),'external_links':[l for l in p.links if l.startswith('http') and 'scutoria.com' not in l]}
  if path=='/robots.txt':out['body']=x.text
  return out
 except Exception as e:return {'url':u,'error':str(e)}
with ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(fetch,paths))
(R/'live-gegenpruefung.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps([{k:p.get(k) for k in ['url','status','title','h1','lovable_badge','analytics_script']}|{'external_links':len(p.get('external_links',[]))} for p in rows],ensure_ascii=True,indent=2))
