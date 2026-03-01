const CACHE_NAME = 'hebermoov-core-v12';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

// Phase d'installation : on met en cache les fichiers vitaux
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Fichiers tactiques mis en cache.');
                return cache.addAll(urlsToCache);
            })
    );
});

// Phase de récupération : on sert depuis le cache si on est hors-ligne
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si le fichier est dans le cache, on le donne instantanément
                if (response) {
                    return response;
                }
                // Sinon, on va le chercher sur internet
                return fetch(event.request);
            })
    );
});

// Mise à jour du Service Worker (pour supprimer les anciens caches)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
