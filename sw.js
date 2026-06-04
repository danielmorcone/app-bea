// A ogni modifica dei file, incrementa questa versione (es. 'app-v5', 'app-v6')
const CACHE_NAME = 'app-v4'; 

const ASSETS = [
    '/app-bea/',
    '/app-bea/index.html',
    '/app-bea/calma.html',
    '/app-bea/style.css',
    '/app-bea/script.js',
    '/app-bea/manifest.json',
    '/app-bea/wave1.png',
    '/app-bea/wave2.png',
    '/app-bea/wave3.png',
    '/app-bea/line.png',
    '/app-bea/heart.png',
    '/app-bea/icona.png',
    '/app-bea/icona-512.png'
];

// 1. Installazione: Scarica i file e forza l'attivazione immediata
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        }).then(() => {
            return self.skipWaiting(); // Forza il nuovo SW a prendere il posto del vecchio
        })
    );
});

// 2. Attivazione: Cancella le vecchie cache e prende il controllo dei client
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        }).then(() => {
            return self.clients.claim(); // Prende il controllo immediato delle pagine aperte
        })
    );
});

// 3. Fetch: Strategia Cache-First (se c'è in cache usa quella, altrimenti va in rete)
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
