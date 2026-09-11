// @ts-check

'use strict';

// Minimal Service Worker satisfying Chrome/Android PWA install criteria
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// A fetch handler must exist for installability, even if it just passes through to network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});