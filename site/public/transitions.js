// Register before pagereveal, which may fire before deferred site scripts run.
// Aborted/opted-out transitions are expected; observe all three native promises.
(() => {
  let nativeNavigation = false;
  // Chromium can abort before pagereveal exposes a ViewTransition (null),
  // leaving its internal ready rejection inaccessible. Handle only the known
  // native DOMExceptions during that reveal, never unrelated application errors.
  window.addEventListener('unhandledrejection', e => {
    const reason = e.reason;
    if (nativeNavigation && reason instanceof DOMException && (
      (reason.name === 'AbortError' && reason.message === 'Transition was skipped') ||
      (reason.name === 'InvalidStateError' && reason.message === 'Transition was aborted because of invalid state. ViewTransition opt-in disabled')
    )) e.preventDefault();
  });
  const motionOff = () => {
    let choice = null;
    try { choice = localStorage.getItem('scutoria-motion'); } catch {}
    return choice === 'off' || (choice !== 'on' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  };
  for (const event of ['pageswap', 'pagereveal']) window.addEventListener(event, e => {
    nativeNavigation = true;
    if (event === 'pagereveal') setTimeout(() => { nativeNavigation = false; }, 1000);
    const transition = e.viewTransition;
    if (!transition) return;
    transition.finished.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    // Only a successfully ready transition can be skipped. An opted-out target
    // rejects ready, so no method is called on that aborted transition.
    transition.ready.then(() => {
      if (!document.documentElement.hasAttribute('data-generator') && motionOff()) transition.skipTransition();
    }).catch(() => {});
  });
})();