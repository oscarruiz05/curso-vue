const CACHE_NAME = "v1_cache_contador_app_vue";
const urlsToCache = [
    './',
    './img/favicon.png',
    './img/image32.png',
    './img/image64.png',
    './img/image128.png',
    './img/image256.png',
    './img/image1024.png',
    './js/main.js',
    'https://unpkg.com/vue@next',
    './js/mountApp.js',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
    './css/style.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            Cache => Cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
});

self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) == -1){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.clain() 
        )
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if (res){

                    return res
                }

                return fetch(e.request)
            }
        )
    )
});