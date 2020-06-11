// Asignar nombre y versión de caché
const CACHE_NAME = 'v1_cache_pwa';

// Ficheros a cachear en al app
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
];


//Evento Install
//Instalación del service worker y guardar en cache los recursos
self.addEventListener('install',e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(urlsToCache)
        .then(()=>{
            self.skipWaiting();
        })

        
        })

        .catch(err => { console.log('No se pudo registrar cache',err)})
    )

})

//Evento activate
// App funcione sin conexión
self.addEventListener('activate',e => {
    const cacheWhiteList =[CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {

                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        //Borrar elementso que no necestian
                        return caches.delete(cacheName);
                    }
                })
            )
        })

        .then(() => {
            self.clients.claim();
        })
    )
})

//Evento fetch


self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                //devuelve datos de cache
                return res;
            }

            return fetch(e.request);
        })
    )
})