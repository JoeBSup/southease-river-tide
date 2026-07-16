const CACHE="southease-tide-v1";

const files=[
"index.html",
"style.css",
"app.js"
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