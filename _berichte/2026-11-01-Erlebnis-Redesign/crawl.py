import requests, json, time
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse,urldefrag
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).parent
class Parser(HTMLParser):
 def __init__(self):
  super().__init__();self.links=[];self.assets=[];self.meta={};self.text=[];self.title='';self.intitle=False;self.h1=0;self.lang='';self.images=[];self.ids=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='html':self.lang=d.get('lang','')
  if t=='a' and 'href' in d:self.links.append(d['href'])
  if t=='link' and d.get('rel')=='stylesheet':self.assets.append(d.get('href',''))
  if t=='script' and d.get('src'):self.assets.append(d['src'])
  if t=='img':self.images.append(d);self.assets.append(d.get('src',''))
  if t=='meta':self.meta[d.get('name',d.get('property',''))]=d.get('content','')
  if t=='title':self.intitle=True
  if t=='h1':self.h1+=1
  if 'id' in d:self.ids.append(d['id'])
 def handle_endtag(self,t):
  if t=='title':self.intitle=False
 def handle_data(self,d):
  self.text.append(d)
  if self.intitle:self.title+=d
def fetch(url):
 start=time.time()
 try:
  r=requests.get(url,timeout=30);ct=r.headers.get('Content-Type','');p=Parser()
  out={'url':url,'final_url':r.url,'status':r.status_code,'type':ct,'bytes':len(r.content),'seconds':round(time.time()-start,3),'headers':{k:('[WERT GESCHWAERZT]' if k.lower()=='set-cookie' else v) for k,v in r.headers.items()}}
  if 'text/html' in ct:
   p.feed(r.content.decode('utf-8','replace'));out.update(title=p.title,lang=p.lang,h1=p.h1,meta=p.meta,links=p.links,assets=p.assets,images=p.images,ids=p.ids,text=' '.join(p.text))
  return out
 except Exception as e:return {'url':url,'error':str(e)}
seen=set();todo=['https://scutoria.com/'];pages=[]
for depth in range(5):
 todo=[u for u in todo if u not in seen];seen.update(todo)
 if not todo:break
 with ThreadPoolExecutor(max_workers=5) as ex:batch=list(ex.map(fetch,todo))
 pages+=batch;todo=[]
 for p in batch:
  for link in p.get('links',[]):
   u=urldefrag(urljoin(p['url'],link))[0];parts=urlparse(u)
   if parts.netloc=='scutoria.com' and parts.scheme=='https' and '/run/' not in u and '/checkout' not in u and u not in seen:todo.append(u)
 todo=list(dict.fromkeys(todo))
assets=list(dict.fromkeys(urljoin(p['url'],a) for p in pages for a in p.get('assets',[]) if a))
with ThreadPoolExecutor(max_workers=5) as ex:resources=list(ex.map(fetch,assets))
technical=[fetch('https://scutoria.com/robots.txt'),fetch('https://scutoria.com/sitemap.xml'),fetch('https://scutoria.com/audit-missing-page-20261101')]
(ROOT/'crawl-results.json').write_text(json.dumps({'date':'2026-11-01','pages':pages,'assets':resources,'technical':technical},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(pages),'assets':len(resources),'errors':[{'url':p['url'],'status':p.get('status'),'error':p.get('error')} for p in pages+resources+technical if p.get('status')!=200],'html':[{'url':p['url'],'title':p.get('title'),'robots':p.get('meta',{}).get('robots'),'bytes':p.get('bytes')} for p in pages if 'title' in p]},ensure_ascii=True,indent=2))
