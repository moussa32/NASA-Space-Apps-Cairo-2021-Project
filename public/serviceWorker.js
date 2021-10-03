const CACHE_NAME = "version-1";
const urlsToCashe = ["index.html", "offline.html"];

const self = this;

//Install SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Open cache");

      return cache.addAll(urlsToCashe);
    })
  );
});

//Listen for requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => {
        chaches.match("offline.html");
      });
    })
  );
});

//Active SW
self.addEventListener("activate", event => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
