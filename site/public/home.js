// E29 home enhancement. All content is already in the HTML; no requests or autoplay.
import { detect, placeholderize } from './tools/personal.js';
const reduced = () => document.documentElement.classList.contains('motion-off');
const root = document.querySelector('[data-workbench]');
if (root) {
  const situations = [...root.querySelectorAll('[data-situation]')];
  const steps = [...root.querySelectorAll('[data-step]')];
  const cases = [...root.querySelectorAll('[data-case]')];
  let situation = 0, step = 2, timer = null;
  const stop = () => { clearTimeout(timer); timer = null; };
  const show = (straight = true) => {
    if (straight) root.classList.add('is-straight');
    situations.forEach((b,i) => b.setAttribute('aria-pressed', String(i === situation)));
    steps.forEach((b,i) => b.setAttribute('aria-pressed', String(i === step)));
    cases.forEach((c,i) => {
      c.classList.toggle('is-current',i===situation); c.setAttribute('aria-hidden',String(i!==situation)); c.inert=i!==situation;
      c.querySelectorAll('[data-stage]').forEach((s,j) => { s.classList.toggle('is-current',j===step); s.setAttribute('aria-hidden',String(j!==step)); s.inert=j!==step; });
    });
  };
  root.classList.add('is-enhanced');
  show(false);
  const play = () => {
    stop();
    step = reduced() ? 2 : 0;
    show();
    const next = () => { step++; show(); if (step < 2) timer = setTimeout(next,950); else timer = null; };
    if (!reduced()) timer = setTimeout(next,950);
  };
  situations.forEach((b,i) => b.addEventListener('click',() => { stop(); situation=i; show(); }));
  steps.forEach((b,i) => b.addEventListener('click',() => { stop(); step=i; show(); }));
  root.querySelector('[data-play]').addEventListener('click',play);
  document.querySelector('[data-show-example]')?.addEventListener('click',e => {
    e.preventDefault();
    root.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});
    play();
  });
  document.addEventListener('scutoria-motion',() => { if (reduced()) { stop(); step=2; show(); } });
}
const markers=document.querySelector('[data-markers]');
if (markers) {
  const buttons=[...markers.querySelectorAll('[data-marker]')];
  const examples=[...markers.querySelectorAll('[data-marker-example]')];
  const panel=markers.querySelector('.home29-marker-panel');
  const show=i=>{panel.hidden=i<0; buttons.forEach((b,j)=>b.setAttribute('aria-expanded',String(i===j))); examples.forEach((a,j)=>{a.hidden=i!==j;});};
  show(0);
  buttons.forEach((b,i)=>b.addEventListener('click',()=>show(b.getAttribute('aria-expanded')==='true'?-1:i)));
  markers.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=buttons.find(b=>b.getAttribute('aria-expanded')==='true');show(-1);active?.focus();}});
}
const demo=document.querySelector('[data-try]');
if (demo) demo.querySelector('[data-replace]').addEventListener('click',()=>{
  const text=demo.querySelector('[data-try-input]').value;
  const out=demo.querySelector('[data-try-output]');
  out.textContent=placeholderize(text,detect(text),JSON.parse(out.dataset.labels));
});
// Sapphire Cinema (3 November 2026): the three topic paths. All panels are in the HTML; the script makes them a choice.
const paths=document.querySelector('[data-paths]');
if (paths) {
  const btns=[...paths.querySelectorAll('[data-path]')], panels=[...paths.querySelectorAll('[data-path-panel]')];
  const show=i=>{btns.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));panels.forEach((pn,j)=>pn.classList.toggle('is-current',i===j));};
  show(0);
  btns.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
}
