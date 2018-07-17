const DEBUG = false

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
const { assets } = global.serviceWorkerOption

const CACHE_NAME = new Date().toISOString()

let assetsToCache = [...assets, './']

assetsToCache = assetsToCache.map(path => {
  return new URL(path, global.location).toString()
})

function messageToClient(client, msg){
  return new Promise(function(resolve, reject){
      var msg_chan = new MessageChannel();

      msg_chan.port1.onmessage = function(event){
          if(event.data.error){
              reject(event.data.error);
          }else{
              resolve(event.data);
          }
      };

      client.postMessage(msg, [msg_chan.port2]);
  });
}

function messageToAllClients(msg){
  clients.matchAll().then(clients => {
      clients.forEach(client => {
        messageToClient(client, msg).then(m => console.log("SW Received Message: "+m));
      })
  })
}

// When the service worker is first added to a computer.
self.addEventListener('install', event => {
  // Perform install steps.
  
  self.skipWaiting()

  if (DEBUG) {
    console.log('[SW] Install event')
  }

  // Add core website files to cache during serviceworker installation.
  /* event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache)
      })
      .then(() => {
        if (DEBUG) {
          console.log('Cached assets: main', assetsToCache)
        }
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  ) */
})

// After the install event.
self.addEventListener('activate', event => {
  if (DEBUG) {
    console.log('[SW] Activate event')
  }

  // Clean the caches
  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          if (cacheName.indexOf(CACHE_NAME) === -1) 
            return true
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      )
    })
  )
})

self.addEventListener('message', event => {
  console.log('message: ' + event)
  switch (event.data.action) {
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting()
        self.clients.claim()
      }
      break
    default:
      break
  }
})

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  const data = event.data.json()

  if(data.username===localStorage.getItem('username')){
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = data.title;
    const options = {
      body: data.body,
    };

    messageToAllClients(data)

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

self.addEventListener('fetch', event => {
  const request = event.request

  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`)
    }
    return
  }

  const requestUrl = new URL(request.url)

  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`)
    }
    return
  }

  const resource = global.caches.match(request).then(response => {
    if (response) {
      if (DEBUG) {
        console.log(`[SW] fetch URL ${requestUrl.href} from cache`)
      }

      return response
    }

    // Load and cache known assets.
    return fetch(request)
      .then(responseNetwork => {
        if (!responseNetwork || !responseNetwork.ok) {
          if (DEBUG) {
            console.log(
              `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${
                responseNetwork.status
              } ${responseNetwork.type}`
            )
          }

          return responseNetwork
        }

        if (DEBUG) {
          console.log(`[SW] URL ${requestUrl.href} fetched`)
        }

        const responseCache = responseNetwork.clone()

        global.caches
          .open(CACHE_NAME)
          .then(cache => {
            return cache.put(request, responseCache)
          })
          .then(() => {
            if (DEBUG) {
              console.log(`[SW] Cache asset: ${requestUrl.href}`)
            }
          })

        return responseNetwork
      })
      .catch(() => {
        // User is landing on our page.
        if (event.request.mode === 'navigate') {
          return global.caches.match('./')
        }

        return null
      })
  })

  event.respondWith(resource)
})