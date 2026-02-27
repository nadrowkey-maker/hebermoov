// Fichier sw.js (Service Worker)
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installation');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activation');
});

self.addEventListener('fetch', (e) => {
    // Ce bloc est obligatoire pour que le navigateur considère l'app comme valide
    // Même s'il ne fait rien de spécial pour le moment.
    e.respondWith(fetch(e.request).catch(() => console.log('Hors ligne')));
});
