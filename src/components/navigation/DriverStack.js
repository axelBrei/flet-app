import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import DriverHomeScreen from 'components/navigation/DriverHome';
import DriverNewShipmentScreen from 'components/navigation/DriverNewShipmentScreen';
import {navigationConfig} from 'constants/config/navigationConfig';

const {Navigator, Screen} = createStackNavigator();

export const DriverStack = () => {
  return (
    <Navigator {...navigationConfig()}>
      <Screen
        name={routes.dirverHomeScreen}
        component={DriverHomeScreen}
        options={{headerTransparent: true, headerShown: false}}
      />
      <Screen
        name={routes.driverNewShipmentScreen}
        component={DriverNewShipmentScreen}
        options={{headerTransparent: true, headerShown: false}}
      />
    </Navigator>
  );
};
