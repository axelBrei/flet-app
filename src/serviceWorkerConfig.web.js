import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker.web';

const ServiceWorkerUpdateButton = () => {};

export const displayUpdateNotification = () => {
  const link = document.createElement('a');
  link.setAttribute('id', 'update-notification');
  link.setAttribute('href', '#');
  document.querySelector('body').appendChild(link);
  ReactDOM.render(
    <ServiceWorkerUpdateButton />,
    document.getElementById('update-notification'),
  );
};

serviceWorker.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if (event.target.state === 'activated') {
          displayUpdateNotification();
        }
      });
      waitingServiceWorker.postMessage({type: 'SKIP_WAITING'});
    }
  },
});
