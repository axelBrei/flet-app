import React from 'react';
import ReactDOM from 'react-dom';

const ServiceWorkerUpdateButton = ({serviceWorker}) => {
  const onClick = e => {
    e.preventDefault();
    serviceWorker.postMessage({action: 'skipWaiting'});
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

export const displayUpdateNotification = serviceWorker => {
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

const registerValidSW = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js',
    );
    // registration.addEventListener('updatefound', e => {
    //   const newWorker = registration.installing;
    //   console.log('target', e.target);
    //   newWorker.addEventListener('statechange', () => {
    //     if (newWorker.state === 'installed') {
    //       console.log(registration, newWorker);
    //       displayUpdateNotification(newWorker);
    //     }
    //   });
    // });
  } catch (registrationError) {
    console.log('SW registration failed: ', registrationError);
  }
};

export const register = () => {
  window.addEventListener('load', async () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    // if (!isLocalhost) {
    registerValidSW();
    // }
  });
};
