import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import LandingScreen from 'components/navigation/LandingScreen';
import {RegisterStack} from 'components/navigation/RegisterStack';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import LoginScreen from 'components/navigation/LoginScreen';
import {navigationConfig} from 'constants/config/navigationConfig';
import {theme} from 'constants/theme';
import LoggedInStack from 'components/navigation/LoggedInStack';

const {Navigator, Screen} = createStackNavigator();
export default () => {
  const {width} = useWindowDimension();
  return (
    <Navigator
      // initialRouteName={routes.homeScreen}
      initialRouteName={routes.loggedStack}
      screenOptions={{
        ...navigationConfig,
        title: '',
        animationEnabled: true,
        headerShown: width <= 800,
      }}>
      <Screen
        name={routes.landingScreen}
        component={LandingScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.white,
          },
          headerShown: Platform.OS === 'web' && width >= 800,
        }}
      />
      <Screen
        name={routes.loginScreen}
        component={LoginScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Screen
        name={routes.registerStack}
        component={RegisterStack}
        options={{headerShown: false}}
      />
      <Screen
        name={routes.loggedStack}
        component={LoggedInStack}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};
