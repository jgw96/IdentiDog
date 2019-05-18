importScripts('workbox-v3.4.1/workbox-sw.js')


self.workbox.routing.registerRoute(
  new RegExp('https://storage.googleapis.com/tfjs-models/*'),
  new workbox.strategies.CacheFirst({
    cacheName: 'ai-model',
  })
);

self.workbox.precaching.precacheAndRoute([]);
