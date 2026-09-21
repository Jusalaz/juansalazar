/* First-party, anonymous activity. No form fields, budget values, queries or referrers. */
(() => {
  if (window.__juanMetricsLoaded || !/^https?:$/.test(location.protocol)) return;
  if (!['juansalazar.io', 'www.juansalazar.io', 'localhost', '127.0.0.1'].includes(location.hostname)) return;
  window.__juanMetricsLoaded = true;
  const budget = '/herramientas/presupuesto.html';
  const allowed = path => ['/', '/blog', '/libros', '/contacto', '/recursos', budget].includes(path) || /^\/(blog|libros)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path);
  const memory = {};
  const sent = new Set();
  const pending = new Set();
  let readRecorded = false;
  let path = '', visibleSeconds = 0, progress = 0, lastTick = performance.now();
  const uuid = () => crypto.randomUUID();
  function identity(name, ttl) {
    let item = memory[name];
    try { item = JSON.parse(localStorage.getItem(name)) || item; } catch { /* Private browsing fallback. */ }
    if (!item || typeof item.id !== 'string' || !Number.isFinite(item.expires) || item.expires < Date.now()) item = { id: uuid(), expires: 0 };
    item.expires = Date.now() + ttl;
    memory[name] = item;
    try { localStorage.setItem(name, JSON.stringify(item)); } catch { /* Use in-memory identity for this page. */ }
    return item.id;
  }
  function track(type, target = path) {
    if (!allowed(target) || location.pathname.startsWith('/admin') || navigator.doNotTrack === '1') return;
    const visitor = identity('js:visitor', 30 * 86400000);
    const session = identity('js:session', 30 * 60000);
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date());
    const key = [day, session, type, target].join('|');
    if (sent.has(key) || pending.has(key)) return;
    pending.add(key);
    fetch('/api/metrics', {
      method: 'POST', credentials: 'same-origin', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, path: target, visitor, session }),
    }).then(response => { if (response.ok) sent.add(key); }).catch(() => {}).finally(() => pending.delete(key));
  }
  function page() {
    const next = location.pathname;
    if (next === path) return;
    path = next; readRecorded = false; visibleSeconds = 0; progress = 0; lastTick = performance.now();
    if (allowed(path)) track('pageview');
  }
  function readingProgress() {
    if (!path.startsWith('/blog/')) return;
    const article = document.querySelector('[data-blog-content]');
    if (!article) return;
    const rect = article.getBoundingClientRect();
    progress = Math.max(progress, Math.min(1, Math.max(0, (innerHeight - rect.top) / rect.height)));
  }
  window.addEventListener('juan:page', page);
  window.addEventListener('popstate', page);
  window.addEventListener('pageshow', page);
  window.addEventListener('scroll', readingProgress, { passive: true });
  document.addEventListener('visibilitychange', () => { lastTick = performance.now(); });
  setInterval(() => {
    if (path !== location.pathname) page();
    const now = performance.now();
    if (document.visibilityState === 'visible' && path.startsWith('/blog/')) {
      visibleSeconds += Math.min((now - lastTick) / 1000, 2);
      readingProgress();
      if (!readRecorded && visibleSeconds >= 30 && progress >= .75) { readRecorded = true; track('blog_read'); }
    }
    lastTick = now;
  }, 1000);
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const save = event.target.closest('#btn-download');
    if (save && location.pathname === budget) track('budget_save', budget);
    const link = event.target.closest('a[download]');
    if (link) {
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname === budget) track('download', budget);
    }
  }, { capture: true });
  page();
})();
