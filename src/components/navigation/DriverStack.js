import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

import DriverHomeScreen from 'components/navigation/DriverHome/index';
import DriverNewShipmentScreen from 'components/navigation/DriverNewShipmentScreen';
import DriverDeliveryConfirmation from 'components/navigation/ShipmentDeliveryConfirmationScreen';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  selectPendingShipmentError,
} from 'redux-store/slices/driverShipmentSlice';

const {Navigator, Screen} = createStackNavigator();

const {COURRIER_CONFIRMED, ON_PROCESS, DELIVERED} = SHIPMENT_STATE;
export const DriverStack = ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const {status} = useSelector(selectDriverShipmentData) || {};
  const currentShipmentError = useSelector(selectPendingShipmentError);

  return (
    <Navigator
      screenOptions={navigationConfig({
        headerLeft: () => null,
      })}>
      {!currentShipmentError &&
      [COURRIER_CONFIRMED, ON_PROCESS].includes(status) ? (
        <Screen
          name={routes.driverShipmentScreen}
          component={DriverNewShipmentScreen}
          options={{headerTransparent: true, headerShown: false}}
        />
      ) : (
        status !== DELIVERED && (
          <Screen
            name={routes.driverHomeScreen}
            component={DriverHomeScreen}
            options={{headerTransparent: true, headerShown: false}}
          />
        )
      )}
      {status === DELIVERED && (
        <Screen
          name={routes.driverShipmentDeliveryConfirmationScreen}
          component={DriverDeliveryConfirmation}
          options={{
            title: 'Confimacion de envío',
            headerShown: false,
          }}
        />
      )}
    </Navigator>
  );
};
