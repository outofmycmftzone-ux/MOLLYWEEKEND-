const cacheName = "molly-weekend-v18";

const filesToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./cards.json",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


// Install and cache files
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(cacheName)

        .then(cache => {

            return cache.addAll(filesToCache);

        })

        .then(() => {

            return self.skipWaiting();

        })

    );

});



// Remove old caches
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== cacheName){

                        return caches.delete(key);

                    }

                })

            );

        })

        .then(() => self.clients.claim())

    );

});



// Serve cached files offline
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);

        })

    );

});
