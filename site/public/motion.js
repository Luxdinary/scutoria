// Scutoria motion (E23, 23 Oct 2026): local, no library, no network. Reveal variants, reading progress, pointer parallax,
// the hero slide stack, scrollytelling, scroll carousels and the opening cover. Reduced motion: nothing auto-advances,
// nothing parallaxes; every element shows its final state (the CSS only hides things under html.js + no-preference).
(() => {
  let reduce = document.documentElement.classList.contains('motion-off');
  document.addEventListener('scutoria-motion', () => { reduce = document.documentElement.classList.contains('motion-off'); });
  const fine = window.matchMedia('(pointer: fine)').matches;
  const $ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  // CSSOM rules keep motion values out of HTML style attributes.
  const motionSheet = new CSSStyleSheet();
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, motionSheet];
  const motionRules = new WeakMap();
  const setMotion = (el, key, value) => {
    let rule = motionRules.get(el);
    if (!rule) {
      const cls = `sc-motion-${motionSheet.cssRules.length}`;
      el.classList.add(cls);
      const index = motionSheet.insertRule(`.${cls} {}`);
      rule = motionSheet.cssRules[index]; motionRules.set(el, rule);
    }
    rule.style.setProperty(key, String(value));
  };
  // The index of the item whose centre is nearest to the centre of a horizontal scroll track.
  const nearest = (track, items) => {
    const r = track.getBoundingClientRect();
    const mid = r.left + r.width / 2;
    let best = 0, dist = Infinity;
    items.forEach((el, i) => { const b = el.getBoundingClientRect(); const d = Math.abs(b.left + b.width / 2 - mid); if (d < dist) { dist = d; best = i; } });
    return best;
  };

  // Reading progress: a 0..1 custom property on the bar under the top bar.
  const readbar = document.querySelector('.readbar');
  if (readbar) {
    let tick = false;
    const update = () => {
      tick = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setMotion(readbar, '--rp', max > 0 ? clamp(window.scrollY / max, 0, 1) : 0);
    };
    window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // One observer for everything that appears once: reveal variants, stagger groups, stamps, filing lines, the docs fan,
  // the hero shield and the tool demos.
  const once = $('[data-reveal], [data-reveal-stagger], .paper__stamp, .draw-line, .docs, .hero__shield');
  $('[data-reveal-stagger]').forEach((el) => Array.from(el.children).forEach((c, i) => setMotion(c, '--si', i)));
  $('.docs').forEach((el) => Array.from(el.children).forEach((c, i) => setMotion(c, '--fi', i)));
  $('.preview').forEach((el) => {
    $('.preview__rows li, .preview__text p', el).forEach((li, i) => setMotion(li, '--di', i));
    once.push(el);
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add(e.target.classList.contains('preview') ? 'demo' : 'is-in');
        io.unobserve(e.target);
      }
    }, { threshold: 0.25, rootMargin: '0px 0px -6% 0px' });
    once.forEach((el) => io.observe(el));
  } else {
    once.forEach((el) => el.classList.add(el.classList.contains('preview') ? 'demo' : 'is-in'));
  }
  // Replay the tool demo when the card is hovered again.
  $('.sc-card--tool').forEach((card) => {
    const preview = card.querySelector('.preview');
    if (!preview) return;
    card.addEventListener('mouseenter', () => {
      if (reduce || document.documentElement.hasAttribute('data-home29') || document.documentElement.classList.contains('motion-off') || !preview.classList.contains('demo')) return;
      preview.classList.remove('demo');
      void preview.offsetWidth;
      preview.classList.add('demo');
    });
  });

  if (!reduce) {
    // Pointer parallax: elements with data-depth tilt after the pointer, at most 6 degrees, desktop and fine pointer only.
    if (fine) {
      $('[data-depth]').forEach((el) => {
        el.addEventListener('pointermove', (e) => {
          if (document.documentElement.classList.contains('motion-off') || document.documentElement.hasAttribute('data-home29')) return;
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          setMotion(el, '--ry', `${clamp(x * 6, -6, 6)}deg`);
          setMotion(el, '--rx', `${clamp(-y * 6, -6, 6)}deg`);
        });
        el.addEventListener('pointerleave', () => { setMotion(el, '--rx', '0deg'); setMotion(el, '--ry', '0deg'); });
      });
    }
    // Scroll-linked values: data-sink sinks the hero stage over the first screen; data-open-book opens the cover.
    const sink = $('[data-sink]');
    const openers = $('[data-open-book]');
    if (sink.length || openers.length) {
      let tick = false;
      const update = () => {
        tick = false;
        if (document.documentElement.classList.contains('motion-off') || document.documentElement.hasAttribute('data-home29')) return;
        const p = clamp(window.scrollY / (window.innerHeight * 0.9), 0, 1);
        sink.forEach((el) => setMotion(el, '--sink', p));
        openers.forEach((el) => setMotion(el, '--open', p));
      };
      window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
      update();
    }
  }

  // Scrollytelling: the sticky picture follows the step in the middle of the viewport; the dots jump to a step.
  $('[data-scrolly]').forEach((root) => {
    const pics = $('.scrolly__pic', root);
    const items = $('li', root);
    const dots = $('.scrolly__dots .carousel__tab', root);
    const activate = (i) => {
      pics.forEach((pic, j) => pic.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => d.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
    };
    if (pics.length) activate(0);
    if ('IntersectionObserver' in window && pics.length) {
      const io = new IntersectionObserver((entries) => {
        if (window.innerWidth < 900) return; // on phones the dots follow the swipe track below
        for (const e of entries) if (e.isIntersecting) activate(items.indexOf(e.target));
      }, { rootMargin: '-45% 0px -45% 0px' });
      items.forEach((li) => io.observe(li));
    }
    dots.forEach((d, i) => d.addEventListener('click', () => {
      const li = items[i];
      if (!li) return;
      if (window.innerWidth < 900) li.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      else li.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }));
    const track = $('.steps', root)[0];
    if (track && dots.length) {
      track.addEventListener('scroll', () => {
        const i = nearest(track, items);
        dots.forEach((d, j) => d.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
      }, { passive: true });
    }
  });

  // Carousels. The server renders the slides, the index tabs and the buttons with their labels; this wires the behaviour.
  // data-carousel="stack": the hero sheet stack (auto-advances every 7s unless paused). data-carousel="scroll": a snap track.
  $('[data-carousel]').forEach((root) => {
    const mode = root.dataset.carousel;
    const slides = $('[data-slide]', root);
    const tabs = $('[data-tab]', root);
    const prev = $('[data-prev]', root)[0];
    const next = $('[data-next]', root)[0];
    const pauseBtn = $('[data-pause]', root)[0];
    const track = $('[data-track]', root)[0];
    let active = 0;
    let userPaused = reduce; // the pause button
    let held = false; // hover, focus inside or a hidden tab holds the autoplay
    let timer = null;
    const markTabs = root.querySelector('.stack__tabs');

    const show = (i) => {
      active = (i + slides.length) % slides.length;
      if (mode === 'stack') slides.forEach((s, j) => setMotion(s, '--i', (j - active + slides.length) % slides.length));
      tabs.forEach((t, j) => t.setAttribute('aria-pressed', j === active ? 'true' : 'false'));
      // The marker tabs slide in again on the new top sheet.
      if (markTabs) { markTabs.classList.remove('is-new'); void markTabs.offsetWidth; markTabs.classList.add('is-new'); }
    };
    const advance = (dir) => {
      if (mode === 'scroll' && track) {
        const target = slides[(active + dir + slides.length) % slides.length];
        track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
        return;
      }
      if (mode === 'stack' && dir > 0 && !reduce) {
        const top = slides[active];
        top.classList.add('is-leaving');
        setTimeout(() => {
          top.classList.add('is-returning');
          show(active + 1);
          top.classList.remove('is-leaving');
          requestAnimationFrame(() => requestAnimationFrame(() => top.classList.remove('is-returning')));
        }, 560);
      } else show(active + dir);
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => {
      stop();
      if (userPaused || held || reduce || root.dataset.auto !== 'on') return;
      timer = setInterval(() => advance(1), 7000);
    };
    document.addEventListener('scutoria-motion', () => { if (reduce) stop(); else start(); });
    // The pause button and hover/focus are separate holds: hovering pauses without touching the button's state.
    const setUserPaused = (v) => {
      userPaused = v;
      if (pauseBtn) pauseBtn.setAttribute('aria-pressed', v ? 'true' : 'false');
      v ? stop() : start();
    };
    const hold = (v) => { held = v; v ? stop() : start(); };

    show(0);
    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
      pauseBtn.addEventListener('click', () => setUserPaused(!userPaused));
    }
    if (prev) prev.addEventListener('click', () => advance(-1));
    if (next) next.addEventListener('click', () => advance(1));
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      if (mode === 'scroll' && track) track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
      else show(i);
    }));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); advance(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); advance(1); }
    });
    root.addEventListener('mouseenter', () => hold(true));
    root.addEventListener('mouseleave', () => hold(false));
    root.addEventListener('focusin', () => hold(true));
    root.addEventListener('focusout', () => { if (!root.contains(document.activeElement)) hold(false); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    // Swipe and drag.
    let downX = null;
    const surface = track ?? root;
    surface.addEventListener('pointerdown', (e) => { downX = e.clientX; if (track) track.classList.add('is-drag'); });
    surface.addEventListener('pointermove', (e) => { if (downX !== null && track) track.scrollLeft -= e.movementX; });
    const up = (e) => {
      if (downX === null) return;
      const dx = e.clientX - downX;
      downX = null;
      if (track) track.classList.remove('is-drag');
      if (!track && Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1);
    };
    surface.addEventListener('pointerup', up);
    surface.addEventListener('pointercancel', () => { downX = null; if (track) track.classList.remove('is-drag'); });
    if (track) {
      track.addEventListener('scroll', () => {
        const i = nearest(track, slides);
        active = i;
        tabs.forEach((t, j) => t.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
      }, { passive: true });
    }
    start();
  });
})();
