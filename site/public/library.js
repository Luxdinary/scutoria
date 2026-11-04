// Library filters (Sapphire Cinema, 3 November 2026): topic and search apply together, the count follows, an empty result
// names the search and offers a reset. Every entry is in the HTML; without this script all of them stay visible.
(() => {
  const root = document.querySelector('[data-library]');
  if (!root) return;
  const entries = [...root.querySelectorAll('[data-entry]')];
  const buttons = [...root.querySelectorAll('[data-topic-filter]')];
  const input = root.querySelector('[data-search]');
  const count = root.querySelector('[data-count]');
  const empty = root.querySelector('[data-empty]');
  const query = root.querySelector('[data-query]');
  const reset = root.querySelector('[data-reset]');
  if (!input || !count || !empty) return;
  let texts = { one: '1', many: '{n}' };
  try { texts = JSON.parse(count.dataset.texts); } catch {}
  let topic = 'all';
  const apply = () => {
    const needle = input.value.trim().toLowerCase();
    let n = 0;
    for (const entry of entries) {
      const ok = (topic === 'all' || entry.dataset.topic === topic) && (!needle || entry.dataset.search.includes(needle));
      entry.hidden = !ok;
      if (ok) n++;
    }
    count.textContent = n === 1 ? texts.one : texts.many.replace('{n}', String(n));
    empty.hidden = n > 0;
    if (query) query.textContent = input.value.trim();
  };
  const choose = (key) => {
    topic = key;
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.topicFilter === key));
    apply();
  };
  for (const b of buttons) b.addEventListener('click', () => choose(b.dataset.topicFilter));
  input.addEventListener('input', apply);
  reset?.addEventListener('click', () => { input.value = ''; choose('all'); input.focus(); });
})();
