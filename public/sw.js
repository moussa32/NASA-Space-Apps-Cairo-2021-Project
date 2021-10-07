let cachedTableName = "appV1";

this.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cachedTableName).then(cacheEvent => {
      cacheEvent.addAll([
        "/static/js/main.chunk.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/vendors~main.chunk.js.map",
        "/static/js/bundle.js",
        "/static/media/risk-factor.b6e56fc8.svg",
        "/static/media/dashboard.d6b679be.svg",
        "/static/media/results.05bce268.svg",
        "/static/media/background.246619e4.svg",
        "/static/js/main.chunk.js.map",
        "/manifest.json",
        "/favicon.ico",
        "/logo144.png",
        "/dashboard",
        "/index.html",
        "/notifications",
        "/news",
        "/disease",
        "/",
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(resp => {
        return (
          resp ||
          fetch(event.request)
            .then(response => {
              let responseClone = response.clone();
              caches.open(cachedTableName).then(cache => {
                cache.put(event.request, responseClone);
              });

              return response;
            })
            .catch(() => {
              return alert("There are no cache and you are offline");
            })
        );
      })
    );
  }
});

this.addEventListener("push", function (event) {
  var data = JSON.parse(event.data.text());

  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "/images/contoso.png",
    })
  );
});
