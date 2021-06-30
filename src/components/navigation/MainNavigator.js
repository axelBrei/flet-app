import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import LandingScreen from 'components/navigation/LandingScreen';
import PageNotFound from 'components/navigation/PageNotFound';
import RegisterStack from 'components/navigation/RegisterStack';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import LoginScreen from 'components/navigation/LoginScreen';
import {navigationConfig} from 'constants/config/navigationConfig';
import {theme} from 'constants/theme';
import LoggedInStack from 'components/navigation/LoggedInStack';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import crashlytics from 'services/FirebaseWebService/crashlytics';
import {AppLogo} from 'components/ui/AppLogo';

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
          height: 'auto',
          minHeight: 100,
        },
        headerTransparent: true,
        headerTitle: () => <AppLogo color={theme.primaryColor} />,
      }}
    />
    <Screen
      name={routes.recoverPasswordScreen}
      options={{
        headerShown: true,
        headerTitle: () => <AppLogo color={theme.primaryColor} />,
      }}
      getComponent={() =>
        require('components/navigation/RecoverPasswordScreen').default
      }
    />
    <Screen
      name={routes.recoverPasswordResultScreen}
      options={{
        headerShown: true,
        headerTitle: () => <AppLogo color={theme.primaryColor} />,
      }}
      getComponent={() =>
        require('components/navigation/RecoverPasswordResultScreen').default
      }
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

  useEffect(() => {
    userData?.id && crashlytics.logUser(userData);
  }, [userData]);

  return (
    <Navigator
      initialRouteName={!!userData ? routes.loggedStack : routes.landingScreen}
      screenOptions={navigationConfig({
        title: '',
        headerShown: width <= 800,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          alignSelf: 'center',
        },
        cardStyle: {
          backgroundColor: theme.white,
          paddingBottom: Platform.select({
            web: () => (navigator.platform.includes('iPhone') ? 25 : 0),
          })?.(),
        },
      })}>
      {userData ? renderPrivateRoutes() : renderPublicRoutes(width, isMobile)}
      <Screen
        name={routes.registerStack}
        component={RegisterStack}
        options={({navigation}) => ({
          headerTitle: () => <AppLogo color={theme.primaryColor} />,
          headerStyle: {
            backgroundColor: theme.white,
          },
          headerTintColor: theme.primaryDarkColor,
          headerShown: true,
        })}
      />
      <Screen
        name="pagina-inexistente"
        component={PageNotFound}
        options={{
          title: 'Página inexistente',
        }}
      />
    </Navigator>
  );
};
