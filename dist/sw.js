// Set a name for the current cache
var cacheName = 'v2'; 

// Default files to always cache
var cacheFiles = [
	
]

self.addEventListener('install', e => {
    console.log('[Servise Worker] installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	); // end e.waitUntil
})

self.addEventListener('activate', e => {
    console.log('[Servise Worker] activated');

    e.waitUntil(

    	// Get all the cache keys (cacheName)
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end e.waitUntil
})

self.addEventListener('fetch', e => {
    console.log('[Servise Worker] fetching', e.request.url);
})