import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import React from 'react';
import {name as appName} from './package.json';
import 'react-native-gesture-handler';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';

if (Platform.OS === 'android') {
  BackgroundGeolocation.checkStatus(({isRunning}) => {
    if (isRunning) {
      BackgroundGeolocation.start();
    }
  });
}

AppRegistry.registerComponent(appName, () => App);
