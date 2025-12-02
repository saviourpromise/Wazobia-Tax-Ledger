const CACHE_NAME = "wazobia-v1";
const urlsToCache = [
  "/",
  "/index.html",
];

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // No cache hit - fetch from network and cache it
      return fetch(event.request).then(
        response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and can only be consumed once. We need to consume it once
          // to send it to the browser and once to cache it.
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    })
  );
});

self.addEventListener("activate", (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
