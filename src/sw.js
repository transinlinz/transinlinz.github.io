// Cache names — bump CACHE_VERSION on each deploy to invalidate all caches
const CACHE_VERSION = 'v1';
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const FONT_CACHE = `fonts-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;

// Max age in seconds
const IMAGE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const FONT_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

async function cacheFirstWithMaxAge(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    const dateHeader = cached.headers.get('date');
    if (!dateHeader) return cached;
    const age = (Date.now() - new Date(dateHeader).getTime()) / 1000;
    if (age < maxAge) return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (_) {
    if (cached) return cached;
    throw _;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached ?? fetchPromise;
}

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => !key.endsWith(CACHE_VERSION))
              .map((key) => caches.delete(key)),
          ),
        ),
    ]),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const p = url.pathname;

  if (p.startsWith('/img/')) {
    event.respondWith(
      cacheFirstWithMaxAge(request, IMAGE_CACHE, IMAGE_MAX_AGE),
    );
  } else if (p.startsWith('/fonts/')) {
    event.respondWith(cacheFirstWithMaxAge(request, FONT_CACHE, FONT_MAX_AGE));
  } else if (p.startsWith('/css/') || p.startsWith('/js/')) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});
