import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

import RegisterScreen from 'components/navigation/RegisterScreen';
import RegisterDriverDataScreen from 'components/navigation/RegisterDriverDataScreen';
import RegisterDriverVehiculeDataScreen from 'components/navigation/RegisterDriverVehiculeDataScreen';

const {Navigator, Screen} = createStackNavigator();
export const RegisterStack = ({route}) => {
  const {isMobile} = useWindowDimension();
  return (
    <Navigator
      initialRouteName={routes.registerPersonalDataScreen}
      screenOptions={{
        ...navigationConfig,
        animationEnabled: true,
        title: '',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Screen
        name={routes.registerScreen}
        component={RegisterScreen}
        initialParams={route.params}
        options={{
          headerTransparent: isMobile,
        }}
      />
      <Screen
        name={routes.registerDriverDataScreen}
        component={RegisterDriverDataScreen}
        initialParams={route.params}
        options={{
          headerTransparent: isMobile,
        }}
      />
      <Screen
        name={routes.registerDriverVehiculeScreen}
        component={RegisterDriverVehiculeDataScreen}
        options={{
          headerTransparent: false,
        }}
      />
    </Navigator>
  );
};
