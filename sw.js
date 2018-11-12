// list of all files to be cached
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
  ];

  // first time a user visits the page an install event is triggered, page assets are cached
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('restaurant-cache').then(function(cache) {
     return cache.addAll(cacheFiles);
   })
 );
});

// triggered for every request that is made, returns cached version of assets instead of beig retrieved from the network
self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   // look in the cache for matching resources
    event.respondWith(
        // match returns a promise
        // when file is not found, fetch it from the network and return it to the browser
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });

//    resource
//    https://developers.google.com/web/fundamentals/codelabs/offline/