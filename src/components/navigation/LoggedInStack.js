import React, {useMemo} from 'react';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationDrawer} from 'components/ui/NavigationDrawer';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import HomeScreen from 'components/navigation/HomeScreen';
import OrderShippmentDetailsScreen from 'components/navigation/NewShipmentDetailsScreen';
import {TransitionPresets} from '@react-navigation/stack';
import ShipmentStack from 'components/navigation/ShipmentStack';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import {DriverStack} from 'components/navigation/DriverStack';

const {Navigator, Screen} = createDrawerNavigator();

export default () => {
  const {isMobile} = useWindowDimension();
  const userData = useSelector(selectUserData);
  // TODO: change isDriver condition to a real one
  const isDriver = useMemo(() => userData?.user.includes('aa'));

  return (
    <Navigator
      // initialRouteName={
      //   isDriver ? routes.dirverHomeScreen : routes.shipmentStack
      // }
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
        ...(isMobile && TransitionPresets.SlideFromRightIOS),
      }}>
      <Screen
        name={routes.dirverHomeScreen}
        component={DriverStack}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={routes.shipmentStack}
        component={ShipmentStack}
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
