const CACHE_NAME = "southease-river-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./js/app.js",
  "./js/countdown.js"
];


self.addEventListener(
"install",
event=>{

event.waitUntil(
caches.open(CACHE)
.then(cache=>cache.addAll(files))
);

});


self.addEventListener(
"fetch",
event=>{

event.respondWith(
caches.match(event.request)
.then(response=>response || fetch(event.request))
);

});
