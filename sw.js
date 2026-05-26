self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('app-v3').then(cache => cache.addAll([
            '/app-bea/',
            '/app-bea/index.html',
            '/app-bea/calma.html',
            '/app-bea/style.css',
            '/app-bea/script.js',
            '/app-bea/sw.js',
            '/app-bea/manifest.json',
            '/app-bea/wave1.png',
            '/app-bea/wave2.png',
            '/app-bea/wave3.png',
            '/app-bea/line.png',
            '/app-bea/heart.png',
            '/app-bea/icona.png',
            '/app-bea/icona-512.png',
        ]))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== 'app-v3').map(k => caches.delete(k)))
        )
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
 
