import React, {useState, useCallback, useEffect} from 'react';
import {nameToShow as appName} from '../package.json';
import {Platform, Linking} from 'react-native';
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
import {AppText} from 'components/ui/AppText';
import {fonts} from 'constants/fonts';
import {configureAuthInterceptor} from 'constants/network';

axios.defaults.withCredentials = false;
configureAuthInterceptor(store);

const App = () => {
  const dispatch = store.dispatch;
  const {rem, width, height, isMobile} = useWindowDimension();

  const onStateChange = useCallback(
    (state) => dispatch(changeNavigationState(state)),
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
              ...(process.env.NODE_ENV !== 'production' && {
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
              scale: (size) => size * rem,
              screenWidth: width,
              screenHeight: height,
              isMobile,
            }}>
            <MainNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
