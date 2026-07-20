const cacheName = "molly-weekend-v14";

const filesToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./cards.json",
    "./manifest.json"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(cacheName)
        .then(cache => cache.addAll(filesToCache))
        .then(() => self.skipWaiting())

    );

});



self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    return caches.delete(cache);

                })

            );

        })

        .then(() => self.clients.claim())

    );

});



self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            if(response){

                return response;

            }

            return fetch(event.request);

        })

    );

});
