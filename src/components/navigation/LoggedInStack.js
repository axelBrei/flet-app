import React, {useMemo} from 'react';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationDrawer} from 'components/ui/NavigationDrawer';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {TransitionPresets} from '@react-navigation/stack';
import ShipmentStack from 'components/navigation/ShipmentStack';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import {DriverStack} from 'components/navigation/DriverStack';
import {Platform} from 'react-native';
import PageNotFound from 'components/navigation/PageNotFound';
import {Icon} from 'components/ui/Icon';
import ProfileScreen from 'components/navigation/ProfileScreen';

const getIconForRoute = routeName => {
  switch (routeName.toLowerCase()) {
    case 'envio':
      return 'home';
    case 'courrier':
      return 'handshake';
    case 'ultimospedidos':
      return 'truck';
    case 'perfil':
      return 'account';
    default:
      return 'account-question';
  }
};

export default () => {
  const {isMobile, isPWA, width} = useWindowDimension();
  const userData = useSelector(selectUserData);

  const {Navigator, Screen} = useMemo(
    () =>
      Platform.OS === 'web' && width > 800
        ? createDrawerNavigator()
        : createBottomTabNavigator(),
    [width],
  );

  const shouldDisplayDriverScreen = useMemo(
    () =>
      process.env.NODE_ENV === 'development' || Platform.OS !== 'web' || isPWA,
    [isPWA],
  );
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
      tabBarOptions={{
        activeTintColor: theme.primaryDarkColor,
        inactiveTintColor: theme.fontColor,
        keyboardHidesTabBar: true,
        style: {
          paddingVertical: 10,

          ...Platform.select({
            web: {height: 75, paddingBottom: 15},
          }),
        },
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => (
          <Icon
            name={getIconForRoute(route?.name)}
            size={32}
            color={focused ? theme.primaryDarkColor : theme.fontColor}
          />
        ),
        ...(isMobile && TransitionPresets.SlideFromRightIOS),
      })}>
      {userData?.isDriver && shouldDisplayDriverScreen && (
        <Screen
          name={routes.driverStack}
          component={DriverStack}
          options={{
            headerShown: false,
            title: 'Trabajo',
          }}
        />
      )}
      <Screen
        name={routes.shipmentStack}
        component={ShipmentStack}
        options={{
          title: 'Inicio',
        }}
      />
      <Screen
        name={routes.lastShippmentsScreen}
        getComponent={() =>
          require('components/navigation/LastShipmentsScreen').default
        }
        options={{
          title: 'Mis pedidos',
          headerShown: false,
        }}
      />
      <Screen
        name={routes.profileScreen}
        component={ProfileScreen}
        options={{
          title: 'Mi perfil',
        }}
      />
    </Navigator>
  );
};

// <Screen
//   name={routes.profileScreen}
//   component={HomeScreen}
//   options={{
//     title: 'Mi cuenta',
//   }}
// />
// <Screen
//   name={routes.plannedShippments}
//   component={HomeScreen}
//   options={{
//     title: 'Viajes planeados',
//   }}
// />
