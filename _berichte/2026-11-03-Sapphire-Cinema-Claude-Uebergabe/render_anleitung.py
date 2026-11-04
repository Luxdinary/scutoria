from pathlib import Path
import html,re
p=Path('.')
md=Path('ANLEITUNG-FUER-CLAUDE.md').read_text(encoding='utf-8-sig')
def inline(s):
 s=html.escape(s)
 s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
 s=re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s)
 return s
lines=md.splitlines();parts=[];toc=[];i=0
while i<len(lines):
 line=lines[i]
 if not line.strip():i+=1;continue
 if line.startswith('#'):
  level=len(line)-len(line.lstrip('#'));text=line[level:].strip();anchor='abschnitt-'+str(len(toc)+1) if level==2 else ''
  if level==2:toc.append((anchor,text))
  parts.append(f'<h{level} id="{anchor}">{inline(text)}</h{level}>');i+=1;continue
 if line.startswith('|'):
  rows=[]
  while i<len(lines) and lines[i].startswith('|'):
   cells=[c.strip() for c in lines[i].strip('|').split('|')]
   if not all(re.fullmatch(r'[:\- ]+',c) for c in cells):rows.append(cells)
   i+=1
  parts.append('<div class="tablewrap"><table><thead><tr>'+''.join('<th>'+inline(c)+'</th>' for c in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>');continue
 if line.startswith('- ') or re.match(r'^\d+\. ',line):
  ordered=not line.startswith('- ');tag='ol' if ordered else 'ul';items=[]
  while i<len(lines) and (bool(re.match(r'^\d+\. ',lines[i])) if ordered else lines[i].startswith('- ')):
   items.append('<li>'+inline(re.sub(r'^(?:- |\d+\. )','',lines[i]))+'</li>');i+=1
  parts.append('<'+tag+'>'+''.join(items)+'</'+tag+'>');continue
 para=[]
 while i<len(lines) and lines[i].strip() and not lines[i].startswith(('#','|','- ')) and not re.match(r'^\d+\. ',lines[i]):para.append(lines[i]);i+=1
 parts.append('<p>'+inline(' '.join(para))+'</p>')
css='''*{box-sizing:border-box}body{margin:0;background:#eaf0f8;color:#19314c;font:16px/1.75 "Segoe UI",Arial,sans-serif}.topbar{background:#0b1529;color:#eaf3ff;padding:20px 35px;display:flex;gap:25px;align-items:center}.topbar a{color:#b7d2ff}.layout{display:grid;grid-template-columns:270px minmax(0,1fr);max-width:1500px;margin:auto}.toc{padding:35px 25px;position:sticky;top:0;align-self:start;max-height:100vh;overflow:auto;font-size:12px}.toc a{display:block;color:#335b85;text-decoration:none;margin-bottom:11px}.doc{padding:35px 55px 70px;background:#f6f9fd;min-width:0}h1{font-size:40px;line-height:1.13;letter-spacing:-.035em}h2{font-size:27px;line-height:1.25;margin-top:48px;padding-top:20px;border-top:1px solid #c7d4e4;scroll-margin-top:20px}h3{font-size:21px;margin-top:28px}p{margin:15px 0}code{font:12px/1.6 Consolas,monospace;background:#e3ecf6;padding:2px 5px;border-radius:3px;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;font-size:13px;line-height:1.6}th,td{border:1px solid #c4d3e4;padding:10px 12px;text-align:left;vertical-align:top}th{background:#dce8f5}.tablewrap{overflow:auto;margin:20px 0}li{margin:9px 0}.actions{display:flex;gap:12px;flex-wrap:wrap;margin:25px 0}.actions a{display:inline-block;border:1px solid #496a97;background:#193654;color:#edf5ff;padding:9px 14px;text-decoration:none;border-radius:5px;font-size:13px}.landing{max-width:1320px;margin:auto;padding:40px 30px}.landing h1{color:#f0f5ff;font-size:48px}.landing p{color:#b5c8e3;max-width:900px}.introgrid{display:grid;grid-template-columns:1fr 250px;gap:25px}.introgrid img{width:100%;border:1px solid #3a567c;border-radius:7px}.introgrid .mobile{max-height:650px;object-fit:cover;object-position:top}.dark{background:#080f20;color:#edf3ff}.kicker{font:11px Consolas,monospace;letter-spacing:.12em;color:#9bc2ff}.note{border:1px solid #35557b;background:#132943;padding:20px 25px;margin-top:30px;color:#d3e5ff}.note ol{margin-bottom:0}@media(max-width:850px){.layout{grid-template-columns:1fr}.toc{position:relative;max-height:none;padding-bottom:0}.doc{padding:25px 20px}.introgrid{grid-template-columns:1fr}.introgrid .mobile{display:none}.landing h1{font-size:36px}.topbar{padding:18px 20px;flex-wrap:wrap}}@media print{.topbar,.toc,.actions{display:none}.layout{display:block}.doc{padding:0;background:white;color:black}body{background:white;font-size:10pt}h1{font-size:24pt}h2{font-size:17pt;break-after:avoid}h3{break-after:avoid}tr{break-inside:avoid}code{color:black}a{color:black}.tablewrap{overflow:visible}}'''
Path('dokument.css').write_text(css,encoding='utf-8')
head='<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="dokument.css">'
nav='<aside class="toc">'+''.join(f'<a href="#{a}">{html.escape(t)}</a>' for a,t in toc)+'</aside>'
Path('anleitung.html').write_text(head+'<title>Sapphire Cinema: Umsetzungsanleitung für Claude</title><body><div class="topbar"><strong>SCUTORIA / SAPPHIRE CINEMA</strong><a href="index.html">Übergabepaket</a><a href="ANLEITUNG-FUER-CLAUDE.md">Markdown für Claude</a></div><div class="layout">'+nav+'<article class="doc">'+''.join(parts)+'</article></div></body></html>',encoding='utf-8')
Path('index.html').write_text(head+'''<title>Sapphire Cinema: Claude-Übergabe</title><body class="dark"><main class="landing"><div class="kicker">SCUTORIA / AUSGEWÄHLTE RICHTUNG</div><h1>Sapphire Cinema.<br>Präzise Übergabe an Claude.</h1><p>Die ausgewählte Gestaltungsrichtung mit ausführlicher Anleitung, Startprompt, Farb-/Layouttokens, Bildreferenzen und einem isolierten Prototyp. Die mobile Textbreite und das Studiomodul wurden für diese Übergabe korrigiert.</p><div class="actions"><a href="anleitung.html">Anleitung lesen</a><a href="SCUTORIA-SAPPHIRE-CINEMA-CLAUDE.zip">Komplettpaket</a><a href="STARTPROMPT-FUER-CLAUDE.txt">Startprompt</a><a href="prototyp/sapphire-cinema.html?lang=de">Prototyp ausprobieren</a></div><div class="introgrid"><img src="referenzen/home.jpg" alt="Ausgewählte Cinema-Desktopgestaltung"><img class="mobile" src="referenzen/mobile-home.jpg" alt="Korrigierte mobile Cinema-Gestaltung"></div><section class="note"><strong>So übergibst du es an Claude</strong><ol><li>Das komplette ZIP zusammen mit Zugriff auf das bestehende Websiteprojekt bereitstellen.</li><li>Den Text aus STARTPROMPT-FUER-CLAUDE.txt als Nachricht einfügen.</li><li>Claude zuerst die Anleitung und Referenzbilder lesen lassen. Die Umsetzung erfolgt in der vorhandenen Codebasis.</li></ol></section><p>Enthaltene Seitentypen: Startseite, Bibliothek, Produktdetail, Tools und Studio. Neue Titel und Storyboards bleiben Gestaltungsmuster. Keine Liveänderung erfolgt.</p></main></body></html>''',encoding='utf-8')
print('Sections',len(toc),'Markdown words',len(md.split()))
