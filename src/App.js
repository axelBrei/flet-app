import React, {useState, useCallback, useEffect, useRef} from 'react';
import {nameToShow as appName} from '../package.json';
import {Platform, Linking, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from 'components/navigation/MainNavigator';
import {linkingConfig} from 'constants/config/linking';
import {ThemeProvider} from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'redux-store/index';
import {changeNavigationState} from 'redux-store/slices/navigationSlice';
import axios from 'axios';
import {fonts} from 'constants/fonts';
import {configureAuthInterceptor} from 'constants/network';
import BodyLockProvider from 'components/Contexts/BodyLockContext/index';
import {useHeaderHeight} from '@react-navigation/stack';
import NotificationProvider from 'components/Contexts/NotificationContext';
import ErrorBoundary from 'components/ui/ErrorBoundary/index';
import analytics from '@react-native-firebase/analytics';

axios.defaults.withCredentials = false;
configureAuthInterceptor(store);

// gets the current screen from navigation state
const getCurrentRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const {routes, index} = navigationState || {};
  const route = routes[index];
  // dive into nested navigators
  if (route.state) {
    return getCurrentRouteName(route.state || route);
  }
  return route.name;
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const App = () => {
  const dispatch = store.dispatch;
  const routeNameRef = useRef(null);
  const {rem, width, height, isMobile} = useWindowDimension();
  let headerHeight = 0;
  try {
    headerHeight = useHeaderHeight?.();
  } catch (e) {}

  const onStateChange = useCallback(
    state => {
      Platform.OS === 'web' && dispatch(changeNavigationState(state));
      const previousRouteName = routeNameRef.current;
      const currentRouteName = getCurrentRouteName(state);
      if (previousRouteName !== currentRouteName) {
        analytics().logScreenView(
          {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          },
          {
            previous_screen_name: previousRouteName,
            previous_screen_class: previousRouteName,
          },
        );
        routeNameRef.current = currentRouteName;
      }
    },
    [dispatch, routeNameRef],
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer
          onStateChange={onStateChange}
          {...Platform.select({
            web: {
              linking: linkingConfig,
              ...(process.env.NODE_ENV !== 'development' && {
                initialState: store.getState()?.navigation?.state,
              }),
              documentTitle: {
                formatter: (options, route) => {
                  if (options?.title) {
                    return `${appName} - ${options?.title}`;
                  }
                  return appName;
                },
              },
            },
            native: {},
          })}>
          <ThemeProvider
            theme={{
              colors: theme,
              fonts,
              scale: size => size * rem,
              screenWidth: width,
              screenHeight: height,
              isMobile,
              headerHeight: headerHeight,
            }}>
            <BodyLockProvider>
              <ErrorBoundary>
                <NotificationProvider>
                  <MainNavigator />
                </NotificationProvider>
              </ErrorBoundary>
            </BodyLockProvider>
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
