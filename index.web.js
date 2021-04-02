import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './package.json';
import WebFont from 'webfontloader';

Object.assign(process.env, {
  REACT_APP_SC_ATTR: 'data-styled-fletapp',
  SC_ATTR: 'data-styled-fletapp',
  REACT_APP_SC_DISABLE_SPEEDY: 1,
});

// Generate required css
import iconFont from './node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: MaterialCommunityIcons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

// Load custom fonts
WebFont.load({
  google: {
    families: ['Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700'],
  },
});

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('react-root'),
});

const disableIosTextFieldZoom = () => {
  const el = document.querySelector('meta[name=viewport]');

  if (el !== null) {
    let content = el.getAttribute('content');
    let re = /maximum\-scale=[0-9\.]+/g;

    if (re.test(content)) {
      content = content.replace(re, 'maximum-scale=1.0');
    } else {
      content = [content, 'maximum-scale=1.0'].join(', ');
    }

    el.setAttribute('content', content);
  }
};

const checkIsIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (checkIsIOS()) {
  disableIosTextFieldZoom();
}

// PWA
if (process.env.NODE_ENV !== 'development') {
  require('service-worker.js').register();
}
