import React from 'react';
import ReactDOM from 'react-dom';

const ServiceWorkerUpdateButton = ({serviceWorker}) => {
  const onClick = (e) => {
    serviceWorker.postMessage({action: 'skipWaiting'});
    e.preventDefault();
    window.location.reload();
  };
  return (
    <div className="update-notification">
      <p onClick={onClick}>
        Hay una actualización disponible.
        <br />
        Haga <a>click aquí</a> para actualizar
      </p>
    </div>
  );
};

export default ServiceWorkerUpdateButton;

export const displayUpdateNotification = (serviceWorker) => {
  const link = document.createElement('div');
  link.setAttribute('id', 'update-notification');
  const body = document.getElementById('react-root'); //document.querySelector('body').appendChild(link);
  body.appendChild(link);
  ReactDOM.render(
    <ServiceWorkerUpdateButton serviceWorker={serviceWorker} />,
    document.getElementById('update-notification'),
  );
};

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

export const register = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      // if (!isLocalhost) {
      registerValidSW();
      // }
    });
  }
};

const registerValidSW = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js',
    );
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          console.log(
            'New content is available and will be used when all ' +
              'tabs for this page are closed. See http://bit.ly/CRA-PWA.',
          );
          displayUpdateNotification(newWorker);
        }
      });
    });
  } catch (registrationError) {
    console.log('SW registration failed: ', registrationError);
  }
};
