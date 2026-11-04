from pathlib import Path
import requests,json,io,zipfile
from pypdf import PdfReader
from concurrent.futures import ThreadPoolExecutor
root=Path(__file__).parent
d=json.loads((root/'crawl-results.json').read_text(encoding='utf8'))
links=json.loads((root/'ai-document-links.json').read_text(encoding='utf8'))+json.loads((root/'security-document-links.json').read_text(encoding='utf8'))
urls=[p['url'] for p in d['pages'] if 'application/pdf' in p.get('type','')]+[p['url'] for p in links if p['text'] in ['PDF','DOCX','XLSX','All documents as ZIP']]
def check(u):
 try:
  r=requests.get(u,timeout=45);out={'url':u,'status':r.status_code,'type':r.headers.get('Content-Type'),'bytes':len(r.content)}
  if r.content.startswith(b'%PDF'):
   pdf=PdfReader(io.BytesIO(r.content));out['pages']=len(pdf.pages);out['characters']=sum(len(p.extract_text() or '') for p in pdf.pages)
  elif r.content.startswith(b'PK'):
   z=zipfile.ZipFile(io.BytesIO(r.content));out['zip_ok']=z.testzip() is None;out['files']=z.namelist()
  else:out['unexpected']=r.text[:200]
  return out
 except Exception as e:return {'url':u,'error':str(e)}
with ThreadPoolExecutor(max_workers=4) as ex:results=list(ex.map(check,dict.fromkeys(urls)))
(root/'document-checks.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(results,ensure_ascii=True,indent=2))
