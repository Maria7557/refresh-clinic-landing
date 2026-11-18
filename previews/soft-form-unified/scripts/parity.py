from pathlib import Path
from html.parser import HTMLParser
import json,re
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'canonical-manifest.json').read_text())
class P(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.sections=[];self.cur=None;self.header='';self.footer='';self.where=None;self.links=[];self.a=None
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='a' and d.get('href','').startswith('https://wa.me/'):
   self.a={'label':'','href':d['href']};self.links.append(self.a)
  if t=='section':self.cur={'id':d.get('id'),'text':''};self.sections.append(self.cur)
  if t in ['header','footer']:self.where=t
 def handle_endtag(self,t):
  if t=='a':self.a=None
  if t=='section':self.cur=None
  if t in ['header','footer']:self.where=None
 def handle_data(self,x):
  if self.a is not None:self.a['label']+=x
  if self.cur is not None:self.cur['text']+=x
  if self.where:setattr(self,self.where,getattr(self,self.where)+x)
def norm(s):return re.sub(r'\s+',' ',s).strip()
for lang in ['en','ru']:
 p=P();p.feed((root/'dist'/lang/'index.html').read_text());m=manifest[lang]
 for got,want in zip(p.sections,m['sections']):
  assert got['id']==want['id'],(lang,got['id'],want['id'])
  assert norm(got['text'])==norm(want['text']),(lang,got['id'],got['text'],want['text'])
 assert len(p.sections)==len(m['sections'])==7
 print(lang,'7 section text/order exact PASS')
 for key in ['header','footer']:
  if key in m:
   want=m[key];want=want if isinstance(want,str) else want.get('text','')
   assert norm(getattr(p,key))==norm(want),(lang,key,getattr(p,key),want)
 print(lang,'header/footer exact PASS')
 assert [{'label':norm(x['label']),'href':x['href']}for x in p.links]==m['links'],(lang,'WA mismatch')
 print(lang,'5 WA labels/hrefs exact PASS')
print('ALL PARITY PASS')
