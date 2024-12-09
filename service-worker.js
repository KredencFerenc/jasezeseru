const CACHE_NAME = 'favorite-movie-app-cache-v1';
const ASSETS_TO_CACHE = [
    './', // Kořenová stránka
    './index.html', // Hlavní HTML soubor
    './style.css', // CSS soubor
    './script.js', // JavaScript soubor
];

// Instalace Service Workeru
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Otevření mezipaměti a přidání souborů');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Aktivace Service Workeru
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Odstranění staré mezipaměti:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Obsluha požadavků přes Service Worker
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
