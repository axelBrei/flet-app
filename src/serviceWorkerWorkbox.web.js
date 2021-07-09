import {createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import {registerRoute, NavigationRoute} from 'workbox-routing';
import {skipWaiting, clientsClaim} from 'workbox-core';
import {name as appName} from '../package.json';

// skipWaiting();
clientsClaim();
skipWaiting();

const precacheManifest = [].concat(self.__WB_MANIFEST || []);
precacheAndRoute(precacheManifest);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
});
registerRoute(navigationRoute);

// self.addEventListener('install', event => {
//   self.skipWaiting();
// });
//
// self.addEventListener('message', function (event) {
//   if (event.data.action === 'skipWaiting') {
//     self.skipWaiting();
//   }
// });
