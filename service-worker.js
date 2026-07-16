/*
==========================================================
Southease River Tide v3.0
service-worker.js
==========================================================
*/

const CACHE_NAME = "southease-river-v3-0";

const APP_FILES = [

    "./",
    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./js/sampleTides.js",
    "./js/tideService.js",
    "./js/riverCalculator.js",
    "./js/countdown.js",
    "./js/app.js",

    "./icons/icon-192.png",
    "./icons/icon-512.png"

];


/* -------------------------------------------------------
   Install
------------------------------------------------------- */

self.addEventListener("install", event => {

    console.log("Service Worker installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(APP_FILES))

    );

    self.skipWaiting();

});


/* -------------------------------------------------------
   Activate
------------------------------------------------------- */

self.addEventListener("activate", event => {

    console.log("Service Worker activated.");

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cache => {

                        if (cache !== CACHE_NAME) {

                            console.log("Deleting old cache:", cache);

                            return caches.delete(cache);

                        }

                    })

                );

            })

    );

    self.clients.claim();

});


/* -------------------------------------------------------
   Fetch
------------------------------------------------------- */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        caches.match(event.request)

            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        const responseClone =
                            networkResponse.clone();

                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseClone
                                );

                            });

                        return networkResponse;

                    });

            })

            .catch(() => {

                if (event.request.mode === "navigate") {

                    return caches.match("./index.html");

                }

            })

    );

});
