import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from 'components/navigation/MainNavigator';
import {linkingConfig} from 'constants/config/linking';
import {ThemeProvider} from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';

const App = () => {
  const {rem, width, height} = useWindowDimension();
  return (
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
  );
};

export default App;
