// Scutoria site script: local, no library, no network. Three jobs: the top bar gets its line after 8px of scroll, sections
// fade in once as they enter the view (opacity and 8px, staggered in CSS), and the four marker shapes draw themselves once
// when their row is 30 percent in view. With reduced motion, or without IntersectionObserver, everything shows its final state.
(() => {
  const html = document.documentElement;
  const os = window.matchMedia('(prefers-reduced-motion: reduce)');
  let choice = null;
  try { choice = localStorage.getItem('scutoria-motion'); } catch {}
  const reduced = () => choice === 'off' || (choice !== 'on' && os.matches);
  const toggle = document.querySelector('[data-motion-switch]');
  const applyMotion = () => {
    html.classList.toggle('motion-off', reduced());
    if (toggle) { toggle.setAttribute('aria-pressed', String(!reduced())); toggle.textContent = reduced() ? toggle.dataset.off : toggle.dataset.on; }
    if (reduced()) document.querySelectorAll('.reveal, [data-reveal], [data-reveal-stagger], .draw').forEach(el => el.classList.add('is-in'));
    document.dispatchEvent(new Event('scutoria-motion'));
  };
  toggle?.addEventListener('click', () => { choice = reduced() ? 'on' : 'off'; try { localStorage.setItem('scutoria-motion', choice); } catch {} applyMotion(); });
  os.addEventListener('change', applyMotion);
  applyMotion();
  document.querySelector('.skip-link')?.addEventListener('click', () => document.getElementById('main')?.focus());
  html.classList.add('js');
  const bar = document.querySelector('.bar');
  if (bar) {
    // Also on load, back navigation, anchors and after smooth or programmatic scrolling, so a page that opens scrolled is covered.
    const onScroll = () => bar.classList.toggle('bar--stuck', (window.scrollY || document.documentElement.scrollTop) > 8);
    onScroll();
    requestAnimationFrame(onScroll);
    ['scroll', 'scrollend', 'resize'].forEach((ev) => window.addEventListener(ev, onScroll, { passive: true }));
    ['load', 'pageshow', 'hashchange', 'popstate'].forEach((ev) => window.addEventListener(ev, () => { onScroll(); setTimeout(onScroll, 120); }));
  }
  const reveal = document.querySelectorAll('.reveal');
  const draw = document.querySelectorAll('.draw');
  const show = (el) => el.classList.add('is-in');
  const reduce = reduced();
  if (reduce || !('IntersectionObserver' in window)) {
    reveal.forEach(show);
    draw.forEach(show);
    return;
  }
  const watch = (els, options) => {
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }, options);
    els.forEach((el) => io.observe(el));
  };
  watch(reveal, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  watch(draw, { threshold: 0.3 });
})();

// Native disclosures remain usable without scripts; Escape closes and returns focus.
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const details = document.activeElement?.closest('details[open]');
  if (details) { details.open = false; details.querySelector('summary')?.focus(); }
});

// Mobile menu: disclosure button for the header nav.
(() => {
  const btn = document.querySelector('.bar__menu');
  const nav = btn && document.getElementById(btn.getAttribute('aria-controls'));
  if (!nav) return;
  const set = (open) => { btn.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
})();
