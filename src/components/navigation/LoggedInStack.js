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
import ProfileStack from 'components/navigation/ProfileStack';
import {AppText} from 'components/ui/AppText';

const getIconForRoute = routeName => {
  switch (routeName.toLowerCase()) {
    case 'envio':
      return 'package-variant';
    case 'courrier':
      return 'truck-fast';
    case 'pedidos':
      return 'truck';
    case routes.balanceStack:
      return 'wallet';
    case routes.profileStack:
      return 'account';
    default:
      return 'account-question';
  }
};

const titlesMappings = {
  courrier: '',
  envio: '',
  balance: '',
  usuario: '',
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
          paddingVertical: 5,
          ...Platform.select({
            android: {height: 55},
            web: {height: 80, paddingBottom: 15},
          }),
        },
      }}
      screenOptions={({navigation, route}) => ({
        headerShown: false,
        tabBarLabel: props => (
          <AppText fontSize={11} color={props.color}>
            {route.params.title}
          </AppText>
        ),
        tabBarIcon: ({focused, color, size}) => (
          <Icon
            name={getIconForRoute(route?.name)}
            size={32}
            color={focused ? theme.primaryDarkColor : theme.fontColor}
          />
        ),
        drawerLabel: props => (
          <AppText {...props} fontSize={16}>
            {route.params.title}
          </AppText>
        ),
        ...(isMobile && TransitionPresets.SlideFromRightIOS),
      })}>
      {isMobile && userData?.isDriver && shouldDisplayDriverScreen && (
        <Screen
          name={routes.driverStack}
          getComponent={() =>
            require('components/navigation/DriverStack').DriverStack
          }
          initialParams={{title: 'Conducir'}}
          options={({route}) => {
            const {index, routeNames} = {...route.state};
            return {
              headerShown: false,
              tabBarVisible: !routeNames?.[index]
                ?.toLowerCase()
                ?.includes('chat'),
            };
          }}
        />
      )}
      <Screen
        name={routes.shipmentStack}
        component={ShipmentStack}
        initialParams={{
          title: userData?.isDriver ? 'Enviar' : 'Inicio',
        }}
      />
      {userData?.isDriver ? (
        <Screen
          name={routes.balanceStack}
          getComponent={() =>
            require('components/navigation/BalanceStack').default
          }
          initialParams={{
            title: 'Balance',
          }}
        />
      ) : (
        <Screen
          name={routes.lastShipmentStack}
          getComponent={() =>
            require('components/navigation/LastShipmentsStack').default
          }
          initialParams={{title: 'Mis pedidos'}}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Screen
        name={routes.profileStack}
        getComponent={() =>
          require('components/navigation/ProfileStack').default
        }
        initialParams={{
          title: 'Mi cuenta',
        }}
      />
    </Navigator>
  );
};
