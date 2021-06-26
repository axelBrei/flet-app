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
import {Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {resources} from 'resources';
import {AppText} from 'components/ui/AppText';
import styled from 'styled-components';
import {applyShadow} from 'helpers/uiHelper';

const getIconForRoute = routeName => {
  switch (routeName.toLowerCase()) {
    case 'envio':
      return {icon: resources.shipmentIcon}; //'package-variant';
    case 'courrier':
      return {icon: resources.courrierDeliverIcon, size: 30}; //'truck-fast';
    case 'pedidos':
      return {icon: resources.lastShipmentsIcon, size: 34}; //'truck';
    case routes.balanceStack:
      return {icon: resources.balanceIcon}; //'wallet';
    case routes.profileStack:
      return {icon: resources.accountIcon, size: 24}; //'account';
    default:
      return {icon: resources.shipmentIcon}; // 'account-question';
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
          backgroundColor: theme.white,
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          ...applyShadow(false),
          elevation: 10,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          ...Platform.select({
            android: {height: 60},
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
        tabBarIcon: ({focused, color, size}) => {
          const {icon, size: iconSize = size} = getIconForRoute(route?.name);
          return (
            <TabBarIcon
              source={icon}
              resizeMode={'contain'}
              size={iconSize}
              tintColor={focused ? theme.primaryDarkColor : theme.fontColor}
            />
          );
        },
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
        options={({route}) => {
          const {index, routeNames} = {...route.state};
          return {
            tabBarVisible: !routeNames?.[index]
              ?.toLowerCase()
              ?.includes('chat'),
          };
        }}
        initialParams={{
          title: 'Enviar',
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
          initialParams={{title: 'Últimos pedidos'}}
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
          title: 'Cuenta',
        }}
      />
    </Navigator>
  );
};

const TabBarIcon = styled.Image`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;
