import React, {useState, useCallback, useEffect} from 'react';
import {Platform, Linking} from 'react-native';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import MainNavigator from 'components/navigation/MainNavigator';
import {linkingConfig} from 'constants/config/linking';
import {ThemeProvider} from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'redux-store/index';
import {
  selectSavedNavigationState,
  changeNavigationState,
} from 'redux-store/slices/navigationSlice';

const App = () => {
  const dispatch = store.dispatch;
  const {rem, width, height} = useWindowDimension();
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreState = useCallback(async () => {
    const initialURL = await Linking.getInitialURL();
    console.log('initialURL', initialURL, process.env.NODE_ENV);
    if (initialURL === null || process.env.NODE_ENV === 'development') {
      const state = store.getState().navigation?.state || undefined;
      if (state !== undefined) {
        setInitialState(state);
      }
    }
    setIsReady(true);
  }, [store, setInitialState]);

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
          linking={linkingConfig}
          {...Platform.select({
            web: {
              initialState: initialState,
              onStateChange,
            },
          })}>
          <ThemeProvider
            theme={{
              colors: theme,
              scale: (size) => size * rem,
              screenWidth: width,
              screenHeight: height,
            }}>
            <MainNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
