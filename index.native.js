import {AppRegistry, Platform, LogBox, View} from 'react-native';
import App from './src/App';
import React from 'react';
import {name as appName} from './package.json';
import 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import {theme} from 'constants/theme';

if (Platform.OS === 'android') {
  BackgroundGeolocation.checkStatus(({isRunning}) => {
    if (isRunning) {
      BackgroundGeolocation.start();
    }
  });
}
LogBox.ignoreLogs(["Accessing the 'state' property of the 'route'"]);

analytics().setAnalyticsCollectionEnabled(true);

const SafeAreaComponent = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => SafeAreaComponent);
