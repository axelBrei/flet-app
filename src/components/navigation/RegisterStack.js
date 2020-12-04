import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

import RegisterScreen from 'components/navigation/RegisterScreen';
import RegisterDriverDataScreen from 'components/navigation/RegisterDriverDataScreen';

const {Navigator, Screen} = createStackNavigator();
export const RegisterStack = () => {
  const {isMobile} = useWindowDimension();
  return (
    <Navigator
      // initialRouteName={routes.registerPersonalDataScreen}
      initialRouteName={routes.registerDriverDataScreen}
      screenOptions={{
        ...navigationConfig,
        animationEnabled: true,
        title: '',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Screen
        name={routes.registerScreen}
        component={RegisterScreen}
        options={{
          headerTransparent: isMobile,
        }}
      />
      <Screen
        name={routes.registerDriverDataScreen}
        component={RegisterDriverDataScreen}
        options={{
          headerTransparent: isMobile,
        }}
      />
    </Navigator>
  );
};
