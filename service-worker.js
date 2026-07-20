    const cacheName = "molly-weekend-v15";

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



self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(cacheName)

        .then(cache => {

            return cache.addAll(filesToCache);

        })

        .then(() => self.skipWaiting())

    );

});




self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if(cache !== cacheName){

                        return caches.delete(cache);

                    }

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

            return response || fetch(event.request);

        })

    );

});
