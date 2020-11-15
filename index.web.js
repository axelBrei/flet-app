import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './package.json';

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

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('react-root'),
});
