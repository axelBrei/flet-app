import React from 'react';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from 'components/navigation/HomeScreen';
import {NavigationDrawer} from 'components/ui/NavigationDrawer';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

const {Navigator, Screen} = createDrawerNavigator();

export default () => {
  const {isMobile} = useWindowDimension();
  return (
    <Navigator
      openByDefault={!isMobile}
      drawerType={isMobile ? 'front' : 'permanent'}
      drawerContent={NavigationDrawer}
      drawerStyle={{
        paddingHorizontal: 0,
        maxWidth: scaleDp(isMobile ? 250 : 300),
        minWidth: scaleDp(isMobile ? 200 : 200),
        width: isMobile ? '60%' : '25%',
        backgroundColor: theme.backgroundColor,
        border: 0,
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen
        name={routes.homeScreen}
        component={HomeScreen}
        options={{
          title: 'Realizar un envío',
        }}
      />
      <Screen
        name={routes.lastShippmentsScreen}
        component={HomeScreen}
        options={{
          title: 'Mis pedidos',
        }}
      />
      <Screen
        name={routes.profileScreen}
        component={HomeScreen}
        options={{
          title: 'Mi cuenta',
        }}
      />
      <Screen
        name={routes.plannedShippments}
        component={HomeScreen}
        options={{
          title: 'Viajes planeados',
        }}
      />
    </Navigator>
  );
};
