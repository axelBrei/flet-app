import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';

import RegisterPersonalDataScreen from 'components/navigation/RegisterPersonalDataScreen';

const {Navigator, Screen} = createStackNavigator();
export const RegisterStack = () => (
  <Navigator
    initialRouteName={routes.registerPersonalDataScreen}
    screenOptions={{
      ...navigationConfig,
      animationEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <Screen
      name={routes.registerPersonalDataScreen}
      component={RegisterPersonalDataScreen}
      options={{
        title: 'Datos personales',
      }}
    />
  </Navigator>
);
