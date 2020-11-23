import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import MainNavigator from 'components/navigation/MainNavigator';
import {linkingConfig} from 'constants/config/linking';
import {ThemeProvider} from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'redux-store/index';

const App = () => {
  const {rem, width, height} = useWindowDimension();

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.location.addListener;
    }
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer linking={linkingConfig}>
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
