import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

import HomeScreen from 'components/navigation/HomeScreen/index';
import NewShipmentDetailsScreen from 'components/navigation/NewShipmentDetailsScreen';
import NewShipmentConfirmationScreen from 'components/navigation/NewShipmentConfirmationScreen';
import ShipmentScreen from 'components/navigation/ShipmentScreen';

const {Navigator, Screen} = createStackNavigator();
export default () => {
  const {isMobile} = useWindowDimension();
  return (
    <Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={navigationConfig({
        headerTransparent: !isMobile,
        headerBackTitle: 'Volver',
        headerTintColor: isMobile ? theme.fontColor : theme.primaryDarkColor,
        headerBackTitleVisible: !isMobile,
      })}>
      <Screen
        name={routes.homeScreen}
        component={HomeScreen}
        options={{
          title: 'Realizar un envío',
          headerShown: false,
        }}
      />
      <Screen
        name={routes.newShipmentDetailScreen}
        component={NewShipmentDetailsScreen}
        options={{
          title: '',
        }}
      />
      <Screen
        name={routes.newShipmentConfirmationScreen}
        component={NewShipmentConfirmationScreen}
        options={{
          title: '',
        }}
      />
      <Screen
        name={routes.shipmentScreen}
        component={ShipmentScreen}
        options={{
          headerShown: isMobile,
        }}
      />
    </Navigator>
  );
};
