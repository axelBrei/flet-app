import React from 'react';
import styled from 'styled-components';
import {Text} from 'react-native';
import ReactDOM from 'react-dom';

const ServiceWorkerUpdateButton = () => {
  const onClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  return (
    <Button href="#" onClick={onClick}>
      Hay una actualización disponible.
      <br />
      Haga click aquí para actualizar
    </Button>
  );
};

export default ServiceWorkerUpdateButton;

/**
 * Styles
 */

const Button = styled(Text)`
  position: absolute;
  bottom: 5vh;
  right: 2vw;
  padding: 20px;
  background: #001689;
  color: white;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  box-shadow: 0 0px 16px 0px rgba(0, 0, 0, 0.6);
  text-decoration: none;
  line-height: 1.5em;
  @media (max-width: 800px) {
    bottom: 0;
    right: 0;
    width: 100%;
    box-shadow: none;
  }
`;

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

const onUpdate = (registration) => {
  const waitingServiceWorker = registration.waiting;

  if (waitingServiceWorker) {
    waitingServiceWorker.addEventListener('statechange', (event) => {
      if (event.target.state === 'activated') {
        displayUpdateNotification();
      }
    });
    waitingServiceWorker.postMessage({type: 'SKIP_WAITING'});
  }
};

export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // At this point, the updated precached content has been fetched,
                  // but the previous service worker will still serve the older
                  // content until all client tabs are closed.
                  console.log(
                    'New content is available and will be used when all ' +
                      'tabs for this page are closed. See http://bit.ly/CRA-PWA.',
                  );
                  onUpdate(registration);
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};
