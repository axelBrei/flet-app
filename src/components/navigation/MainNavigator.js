import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import HomeScreen from 'components/navigation/HomeScreen';
import {RegisterStack} from 'components/navigation/RegisterStack';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import LoginScreen from 'components/navigation/LoginScreen';
import {navigationConfig} from 'constants/config/navigationConfig';

const {Navigator, Screen} = createStackNavigator();
export default () => {
  const {width} = useWindowDimension();
  return (
    <Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={{
        ...navigationConfig,
        title: '',
        animationEnabled: true,
      }}>
      <Screen
        name={routes.homeScreen}
        component={HomeScreen}
        options={{
          headerShown: Platform.OS === 'web' && width >= 450,
        }}
      />
      <Screen
        name={routes.loginScreen}
        component={LoginScreen}
        options={{
          title: 'Ingreso',
        }}
      />
      <Screen
        name={routes.registerStack}
        component={RegisterStack}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};
