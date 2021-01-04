import React, {useState, useCallback, useEffect} from 'react';
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

axios.defaults.withCredentials = false;

const App = () => {
  const dispatch = store.dispatch;
  const {rem, width, height, isMobile} = useWindowDimension();
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreState = useCallback(async () => {
    const initialURL = await Linking.getInitialURL();
    if (initialURL === null || process.env.NODE_ENV === 'development') {
      const state = store.getState().navigation?.state || undefined;
      if (state !== undefined) {
        setInitialState(state);
      }
    }
    setIsReady(true);
  }, [setInitialState]);

  useEffect(() => {
    Platform.OS === 'web' && restoreState();
  }, [restoreState]);

  const onStateChange = useCallback(
    (state) => dispatch(changeNavigationState(state)),
    [dispatch],
  );

  if (Platform.OS === 'web' && !isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer
          {...Platform.select({
            web: {
              linking: linkingConfig,
              initialState: initialState,
              onStateChange,
            },
            native: {},
          })}>
          <ThemeProvider
            theme={{
              colors: theme,
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
