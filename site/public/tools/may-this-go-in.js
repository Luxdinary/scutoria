// "May this go in?" A traffic light for staff before they paste something into an AI tool. Runs in the browser, sends nothing.
// decide() is pure and tested in Node; the page wiring below only runs in the browser.

// a = { data: [...kinds], access, training, purpose }
export function decide(a) {
  const data = new Set(a.data ?? []);
  const reasons = [];
  let level = 'green';
  const red = (key) => { level = 'red'; reasons.push(key); };
  const amber = (key) => { if (level !== 'red') level = 'amber'; reasons.push(key); };
  for (const k of ['persons', 'access', 'business', 'health', 'third']) if (data.has(k)) red(`data:${k}`);
  if (a.purpose === 'person') red('purpose:person');
  if (a.access === 'private') red('access:private');
  if (a.access === 'unknown') amber('access:unknown');
  if (a.access === 'unapproved') amber('access:unapproved');
  if (a.training === 'yes') amber('training:yes');
  if (a.training === 'unknown') amber('training:unknown');
  // "Something else" was not checked against the permitted uses, so it is never green.
  if (a.purpose === 'other') amber('purpose:other');
  if (level === 'green') reasons.push('ok');
  return { level, reasons };
}

if (typeof document !== 'undefined') {
  const cfg = JSON.parse(document.getElementById('tool-config')?.textContent ?? '{}');
  const form = document.getElementById('tool-form');
  const light = document.getElementById('light');
  const verdictEl = document.getElementById('verdict');
  const reasonsEl = document.getElementById('reasons');
  const nextEl = document.getElementById('next');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const read = () => {
    const fd = new FormData(form);
    const data = fd.getAll('data').filter((v) => v !== 'none');
    return { data, access: fd.get('access'), training: fd.get('training'), purpose: fd.get('purpose') };
  };
  const render = () => {
    const a = read();
    const answered = a.access && a.training && a.purpose && (a.data.length || new FormData(form).getAll('data').includes('none'));
    if (!answered) { light.className = 'light light--off'; verdictEl.textContent = cfg.start; reasonsEl.innerHTML = ''; nextEl.innerHTML = ''; return; }
    const r = decide(a);
    light.className = `light light--${r.level}`;
    verdictEl.textContent = cfg.verdicts[r.level];
    reasonsEl.innerHTML = r.reasons.map((k) => `<li>${esc(cfg.reasons[k] ?? k)}</li>`).join('');
    nextEl.innerHTML = (cfg.next[r.level] ?? []).map((s) => `<li>${esc(s)}</li>`).join('') + `<li>${esc(cfg.doubt)}</li>`;
  };
  form.addEventListener('change', (e) => {
    // "none of these" clears the other data boxes, and any other box clears "none".
    if (e.target.name === 'data') {
      const boxes = [...form.querySelectorAll('input[name="data"]')];
      if (e.target.value === 'none' && e.target.checked) boxes.forEach((b) => { if (b.value !== 'none') b.checked = false; });
      else if (e.target.checked) boxes.forEach((b) => { if (b.value === 'none') b.checked = false; });
    }
    render();
  });
  form.addEventListener('submit', (e) => e.preventDefault());
  document.getElementById('share-btn')?.addEventListener('click', async (e) => {
    try { await navigator.clipboard.writeText(location.href); e.target.textContent = cfg.copied; } catch { /* the address bar still has it */ }
  });
  render();
}
