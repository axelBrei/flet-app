import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';

import RegisterPersonalDataScreen from 'components/navigation/RegisterPersonalDataScreen';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

const {Navigator, Screen} = createStackNavigator();
export const RegisterStack = () => {
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
        name={routes.registerPersonalDataScreen}
        component={RegisterPersonalDataScreen}
        options={{
          headerTransparent: isMobile,
        }}
      />
    </Navigator>
  );
};
