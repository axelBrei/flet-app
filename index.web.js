import React from 'react';
import { AppRegistry } from 'react-native';
import ReactDOM from 'react-dom';
import App from './src/App';
import { name as appName } from './package.json';
// ReactDOM.render(
//     <App />,
//   document.getElementById('react-root'),
// );

AppRegistry.registerComponent(appName, () => App)
AppRegistry.runApplication(
    appName,
    { rootTag: document.getElementById('react-root') }
    );
