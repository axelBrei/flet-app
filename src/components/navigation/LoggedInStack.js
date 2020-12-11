import React from 'react';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from 'components/navigation/HomeScreen';

const {Navigator, Screen} = createDrawerNavigator();

export default () => {
  const {isMobile} = useWindowDimension();
  return (
    <Navigator
      openByDefault={!isMobile}
      drawerType={isMobile ? 'front' : 'permanent'}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={routes.homeScreen} component={HomeScreen} />
    </Navigator>
  );
};
