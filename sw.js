self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('app-v2').then(cache => cache.addAll([
            '/',
            '/index.html',
            '/style.css',
            '/wave1.png',
            '/wave2.png',
            '/wave3.png',
        ]))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});

caches.open('app-v1').then(cache => cache.addAll([
    '/app-bea/',
    '/app-bea/index.html',
    '/app-bea/calma.html',
    '/app-bea/style.css',
    '/app-bea/script.js',
    '/app-bea/wave1.png',
    '/app-bea/wave2.png',
    '/app-bea/wave3.png',
    '/app-bea/line.png',
    '/app-bea/cuore.png',
    '/app-bea/manifest.json',
]))
