import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from 'components/navigation/MainNavigator';
import { linkingConfig } from 'constants/config/linking';

const App = () => {
  return <NavigationContainer linking={linkingConfig}>
     <MainNavigator />
   </NavigationContainer>;
};

export default App;
