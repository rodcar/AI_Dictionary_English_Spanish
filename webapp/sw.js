importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
 	workbox.routing.registerRoute(
  		new RegExp('diccionario.js'),
  		workbox.strategies.networkFirst()
	);

 	workbox.routing.registerRoute(
  		new RegExp('css/app.css'),
  		workbox.strategies.networkFirst()
	);

 	workbox.routing.registerRoute(
  		new RegExp('index.html'),
  		workbox.strategies.networkFirst()
	);

 	workbox.routing.registerRoute(
  		new RegExp('js/app.js'),
  		workbox.strategies.networkFirst()
	);

	// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
	workbox.routing.registerRoute(
	  /^https:\/\/fonts\.googleapis\.com/,
	  workbox.strategies.staleWhileRevalidate({
	    cacheName: 'google-fonts-stylesheets',
	  })
	);

	// Cache the underlying font files with a cache-first strategy for 1 year.
	workbox.routing.registerRoute(
	  /^https:\/\/fonts\.gstatic\.com/,
	  workbox.strategies.cacheFirst({
	    cacheName: 'google-fonts-webfonts',
	    plugins: [
	      new workbox.cacheableResponse.Plugin({
	        statuses: [0, 200],
	      }),
	      new workbox.expiration.Plugin({
	        maxAgeSeconds: 60 * 60 * 24 * 365,
	        maxEntries: 30,
	      }),
	    ],
	  })
	);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}