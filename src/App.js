import React, {useState, useCallback, useEffect} from 'react';
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

axios.defaults.withCredentials = false;
configureAuthInterceptor(store);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

console.log(linkingConfig);
const App = () => {
  const dispatch = store.dispatch;
  const {rem, width, height, isMobile} = useWindowDimension();
  let headerHeight = 0;
  try {
    headerHeight = useHeaderHeight?.();
  } catch (e) {}

  const onStateChange = useCallback(
    state => dispatch(changeNavigationState(state)),
    [dispatch],
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer
          {...Platform.select({
            web: {
              linking: linkingConfig,
              onStateChange,
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
              <MainNavigator />
            </BodyLockProvider>
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
