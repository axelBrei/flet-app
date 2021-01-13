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
import {scaleDp} from 'helpers/responsiveHelper';

const {Navigator, Screen} = createStackNavigator();

const renderPublicRoutes = (width, isMobile) => (
  <>
    <Screen
      name={routes.landingScreen}
      component={LandingScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name={routes.loginScreen}
      component={LoginScreen}
      options={{
        headerStyle: {
          backgroundColor: theme.primaryLightColor,
          height: scaleDp(60),
        },
        headerRightContainerStyle: {
          paddingRight: scaleDp(15),
          paddingVertical: scaleDp(5),
        },
        headerTitleStyle: {
          width: 'auto',
          fontSize: scaleDp(16),
        },
        headerShown: true,
        headerTitle: isMobile ? '' : 'Iniciar sesión',
        headerTransparent: isMobile,
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
  const {width, isMobile} = useWindowDimension();
  const userData = useSelector(selectUserData);

  return (
    <Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={navigationConfig({
        title: '',
        headerShown: width <= 800,
      })}>
      {userData ? renderPrivateRoutes() : renderPublicRoutes(width, isMobile)}
    </Navigator>
  );
};
