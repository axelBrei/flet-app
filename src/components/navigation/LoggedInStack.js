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
import ShipmentIcon from 'resources/icons/shipmentIcon.svg';
import CourrierDeliverIcon from 'resources/icons/courrierDeliverIcon.svg';
import LastShipmentsIcon from 'resources/icons/historyIcon.svg';
import BalanceIcon from 'resources/icons/balanceIcon.svg';
import ProfileIcon from 'resources/icons/accountIcon.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const getIconForRoute = routeName => {
  switch (routeName.toLowerCase()) {
    case 'envio':
      return {Icon: ShipmentIcon}; //'package-variant';
    case 'courrier':
      return {Icon: CourrierDeliverIcon, size: 30}; //'truck-fast';
    case 'pedidos':
      return {Icon: LastShipmentsIcon, size: 34}; //'truck';
    case routes.balanceStack:
      return {Icon: BalanceIcon}; //'wallet';
    case routes.profileStack:
      return {Icon: ProfileIcon, size: 24}; //'account';
    default:
      return {Icon: ShipmentIcon}; // 'account-question';
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
  const {bottom} = useSafeAreaInsets();
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
            android: {height: 60 + bottom},
            ios: {height: 50 + bottom},
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
          const {Icon, size: iconSize = size} = getIconForRoute(route?.name);
          return (
            <Icon
              color={focused ? theme.primaryDarkColor : theme.fontColor}
              fill={focused ? theme.primaryDarkColor : theme.fontColor}
              height={iconSize}
              width={iconSize}
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
              headerLeft: null,
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
            headerLeft: null,
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
            headerLeft: null,
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
          headerLeft: null,
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
