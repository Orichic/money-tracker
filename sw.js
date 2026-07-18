// Money Tracker service worker - makes the app work offline.
var CACHE = 'moneytracker-v4';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;

  // NEVER intercept cross-origin requests: sync API calls must always hit
  // the network, and their responses (the user's data) must never be cached.
  var u;
  try { u = new URL(e.request.url); } catch (err) { return; }
  if (u.origin !== self.location.origin) return;

  // Page loads: try the network first (so updates arrive), but fall back to
  // the cached app after 3.5s so a connected-but-dead network (captive
  // portal, router down) never leaves the user staring at a blank screen.
  if (e.request.mode === 'navigate') {
    var network = fetch(e.request).then(function (res) {
      // Only a genuine, healthy same-origin page may replace the app shell -
      // a captive portal's 200 or a server error must not poison the cache.
      if (res.ok && res.type === 'basic') {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./', copy); });
      }
      return res;
    });
    e.waitUntil(network.catch(function () { }));
    e.respondWith(
      Promise.race([
        network,
        new Promise(function (resolve) { setTimeout(resolve, 3500); })
      ]).then(function (res) {
        return res || caches.match('./');
      }).catch(function () {
        return caches.match('./');
      })
    );
    return;
  }

  // Same-origin static assets: cache first, then network.
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        if (res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      });
    })
  );
});
