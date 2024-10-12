self.addEventListener('install', (event) => {
    console.log('[Custom SW] Service Worker Installed');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    console.log('[Custom SW] Service Worker Activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Intercept the POST request to /share-handler
    if (request.method === 'POST' && request.url.endsWith('/share-handler')) {
        event.respondWith(
            (async () => {
                const formData = await request.formData();
                const file = formData.get('exel');
                console.log('[Custom SW] Received file:', file);

                // Store the file in IndexedDB or cache for later use
                await storeFileInCache(file);

                // Return a simple response to acknowledge the POST
                return new Response('File received', { status: 200 });
            })()
        );
    }
});

// Store the file in the cache
async function storeFileInCache(file) {
    const cache = await caches.open('share-handler-cache');
    const response = new Response(file);
    await cache.put('/shared-file', response);
    console.log('[Custom SW] File stored in cache');
}
