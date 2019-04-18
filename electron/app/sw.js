importScripts('workbox-v3.4.1/workbox-sw.js')

/*
  This is our code to handle push events.
*/
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Notification';
  const options = {
    body: `${event.data.text()}`,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.workbox.precaching.precacheAndRoute([
  {
    "url": "build/app.css",
    "revision": "04a21bfa885a8835afd3ce32e70d3798"
  },
  {
    "url": "build/app.js",
    "revision": "39a3edc6a6fadb2ebe2daaa29c5ff1c4"
  },
  {
    "url": "build/app/1e4xacf6.entry.js",
    "revision": "d5ee176827fadd2017f2536f971c786d"
  },
  {
    "url": "build/app/1e4xacf6.sc.entry.js",
    "revision": "d643bc23c1d11aba8b516c25adc27ff8"
  },
  {
    "url": "build/app/27gkek2v.entry.js",
    "revision": "dbb824f9e93fdaffa60b2f7790a81137"
  },
  {
    "url": "build/app/27gkek2v.sc.entry.js",
    "revision": "178a6711659e6f7faf152c23ff3e16c9"
  },
  {
    "url": "build/app/41a9fj8w.entry.js",
    "revision": "e35fc0f5f8fc595a95a08603058aa157"
  },
  {
    "url": "build/app/41a9fj8w.sc.entry.js",
    "revision": "e9fe13d35b5ba3c695a6ca0dfd144d8c"
  },
  {
    "url": "build/app/app.rocvt2xo.js",
    "revision": "44e0af4f6c7e382ad6c546c262baa484"
  },
  {
    "url": "build/app/app.wfftoimb.js",
    "revision": "59f153a2298175e53b1ad1fbb31b57d0"
  },
  {
    "url": "build/app/chunk-0f8926dc.js",
    "revision": "5a3b3528a27460031614a5a5a16c5299"
  },
  {
    "url": "build/app/chunk-1004ea03.js",
    "revision": "74d8b2144cfd6c82830dfc6e0e605213"
  },
  {
    "url": "build/app/chunk-187ef6fc.es5.js",
    "revision": "be74232fd314cb477e193df811dc483b"
  },
  {
    "url": "build/app/chunk-2abae55f.js",
    "revision": "194984015df498f04ec30f9f43599779"
  },
  {
    "url": "build/app/chunk-31e25466.es5.js",
    "revision": "690607d31b3e27863601327267ab3dd5"
  },
  {
    "url": "build/app/chunk-523a9283.js",
    "revision": "9761e7f37c94fa9390ad6af118b5b656"
  },
  {
    "url": "build/app/chunk-647a6bad.js",
    "revision": "c76c26ba4a608046a313a6548e4f0199"
  },
  {
    "url": "build/app/chunk-96ecf18f.es5.js",
    "revision": "e6f1b5413f724212b289063bd53ed276"
  },
  {
    "url": "build/app/chunk-b760673a.es5.js",
    "revision": "686b549eb89849a0ddb11e89b8dce810"
  },
  {
    "url": "build/app/chunk-f541d606.es5.js",
    "revision": "c55206ffea0ffbe6513b9335503e9e6f"
  },
  {
    "url": "build/app/envyk7jn.entry.js",
    "revision": "7a755893b8e73ac599246e6ccc012e06"
  },
  {
    "url": "build/app/envyk7jn.sc.entry.js",
    "revision": "e3afd13e6b8fe3902c311fd33101311b"
  },
  {
    "url": "build/app/fkn00lub.entry.js",
    "revision": "7ca9fed349546cfde294584441ce20e8"
  },
  {
    "url": "build/app/fkn00lub.sc.entry.js",
    "revision": "c781ed39736444c7f198ab6f257848fe"
  },
  {
    "url": "build/app/gesture.es5.js",
    "revision": "71e4baeeb0b1f7f7ad9d2f049fff20d4"
  },
  {
    "url": "build/app/gesture.js",
    "revision": "5212708c012c967cbb7c924bf63361a0"
  },
  {
    "url": "build/app/hardware-back-button.es5.js",
    "revision": "676f9dab79c7cad9fe704d60ac8a2e70"
  },
  {
    "url": "build/app/hardware-back-button.js",
    "revision": "6527d884bbf8c62f47920231da0812ae"
  },
  {
    "url": "build/app/input-shims.es5.js",
    "revision": "abf3f8ee784ee7cb7165567780748924"
  },
  {
    "url": "build/app/input-shims.js",
    "revision": "25b333682ab17ffc7941e77772c3dd33"
  },
  {
    "url": "build/app/ios.transition.es5.js",
    "revision": "1ff57d0079a08cfe303388705d384bdb"
  },
  {
    "url": "build/app/ios.transition.js",
    "revision": "fe7a3bca3b0952fe786f439e55bede34"
  },
  {
    "url": "build/app/jmmd8jo5.entry.js",
    "revision": "8e6983f23a392ff9c1929cdf858ebb6c"
  },
  {
    "url": "build/app/jmmd8jo5.sc.entry.js",
    "revision": "fbaf19821d76cbbc28d03a0a850c8f71"
  },
  {
    "url": "build/app/ldhqx8y3.entry.js",
    "revision": "9438505fc63766ce82c816aadc97ffc4"
  },
  {
    "url": "build/app/ldhqx8y3.sc.entry.js",
    "revision": "996b80e2a491d8811dd1fd3b5303a96c"
  },
  {
    "url": "build/app/md.transition.es5.js",
    "revision": "2ef4dc3c25834ec97b11f411ada8a49b"
  },
  {
    "url": "build/app/md.transition.js",
    "revision": "715cd90aed03e8e67e5ec142f0112971"
  },
  {
    "url": "build/app/opnq7plp.entry.js",
    "revision": "a29350ecf969cfdd5068de4ec1855438"
  },
  {
    "url": "build/app/opnq7plp.sc.entry.js",
    "revision": "ffe6efbdb0450f95c4d1cd4379934be1"
  },
  {
    "url": "build/app/rzxngasf.entry.js",
    "revision": "4735e781ab1f76f2cc81afcff60b5842"
  },
  {
    "url": "build/app/rzxngasf.sc.entry.js",
    "revision": "e29b90bc3416f198eb026aa0817919c1"
  },
  {
    "url": "build/app/status-tap.es5.js",
    "revision": "b28bd581ab23ed0ed8c9fb9f70224d62"
  },
  {
    "url": "build/app/status-tap.js",
    "revision": "2f61ddb806604ad9e84bb86ea918d99d"
  },
  {
    "url": "build/app/svg/index.esm.js",
    "revision": "2bdea9e6190aa6a40e24eb01a1e4fb97"
  },
  {
    "url": "build/app/svg/index.js",
    "revision": "35b1701e9c9c1dacb8be33a8bace509b"
  },
  {
    "url": "build/app/swipe-back.es5.js",
    "revision": "e39d2f8b6e34e6a2f070afcf6bddbb24"
  },
  {
    "url": "build/app/swipe-back.js",
    "revision": "a59e5cd2061d83eeee9fe90a9f79bef7"
  },
  {
    "url": "build/app/tap-click.es5.js",
    "revision": "6ee38fc425e73ae238ab770b87dd5092"
  },
  {
    "url": "build/app/tap-click.js",
    "revision": "e0ad0b1bbbad2c9fea83b85507fc5efa"
  },
  {
    "url": "build/app/tlmwejgj.entry.js",
    "revision": "b659b07891895b7b5b434561ab310aa4"
  },
  {
    "url": "build/app/tlmwejgj.sc.entry.js",
    "revision": "53e0cc57d807cb265723b638b9750cd0"
  },
  {
    "url": "build/app/whiytezj.entry.js",
    "revision": "c07218b5ece372c68dce58f0770f60ac"
  },
  {
    "url": "build/app/whiytezj.sc.entry.js",
    "revision": "b4c38f23dff1466a6c972411a3c0cfd8"
  },
  {
    "url": "build/app/xlrit5rt.entry.js",
    "revision": "5cbae2b79ad34e6d66b4a437b43213a2"
  },
  {
    "url": "build/app/xlrit5rt.sc.entry.js",
    "revision": "5cbae2b79ad34e6d66b4a437b43213a2"
  },
  {
    "url": "build/app/ygsswijd.entry.js",
    "revision": "606492c228c37db32b7f68f14d6c98b2"
  },
  {
    "url": "build/app/ygsswijd.sc.entry.js",
    "revision": "7fb6bf16f69a42f6296f0c531b113634"
  },
  {
    "url": "index.html",
    "revision": "8690f788c7c31b857cd6eea4382626de"
  },
  {
    "url": "manifest.json",
    "revision": "7bf36a1923f25e08e65511596f0e41d0"
  }
]);
