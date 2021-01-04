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
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';

const {Navigator, Screen} = createStackNavigator();

const renderPublicRoutes = (width) => (
  <>
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
  </>
);

const renderPrivateRoutes = () => (
  <Screen
    name={routes.loggedStack}
    component={LoggedInStack}
    options={{headerShown: false, gestureEnabled: false}}
  />
);

export default () => {
  const {width} = useWindowDimension();
  const userData = useSelector(selectUserData);

  return (
    <Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={navigationConfig({
        title: '',
        headerShown: width <= 800,
      })}>
      {userData ? renderPrivateRoutes() : renderPublicRoutes(width)}
    </Navigator>
  );
};
