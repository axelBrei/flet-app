// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
firebase.initializeApp({
  apiKey: 'AIzaSyDOlMRpgt9lnpIyPrOVr23HHwfoEuPv1Co',
  authDomain: 'fletapp-dev.firebaseapp.com',
  projectId: 'fletapp-dev',
  storageBucket: 'fletapp-dev.appspot.com',
  messagingSenderId: '527406759056',
  appId: '1:527406759056:web:118d720bc35581a93e6c15',
  measurementId: 'G-7266KE4L6Q',
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
      };
      return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );
    });
  return promiseChain;
});
