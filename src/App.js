import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import MainNavigator from 'components/navigation/MainNavigator';
import {linkingConfig} from 'constants/config/linking';
import {ThemeProvider} from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {Provider} from 'react-redux';
import store from 'redux-store/index';

const App = () => {
  const {rem, width, height} = useWindowDimension();

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.location.addListener;
    }
  });
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
