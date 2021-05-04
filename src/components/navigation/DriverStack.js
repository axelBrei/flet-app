import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import useBackgroundLocation from 'components/Hooks/useBackgroundLocation';
import DriverHomeScreen from 'components/navigation/DriverHome/index';
import DriverNewShipmentScreen from 'components/navigation/DriverNewShipmentScreen';
import DriverDeliveryConfirmation from 'components/navigation/ShipmentDeliveryConfirmationScreen';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  selectPendingShipmentError,
  updateDriverLocation,
} from 'redux-store/slices/driverShipmentSlice';
import {useUserData} from 'components/Hooks/useUserData';
import {
  receiveUpdatePositionSuccess,
  selectOnlineStatus,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import {Platform} from 'react-native';

const {Navigator, Screen} = createStackNavigator();

const {COURRIER_CONFIRMED, ON_PROCESS, DELIVERED} = SHIPMENT_STATE;
export const DriverStack = ({navigation}) => {
  const dispatch = useDispatch();
  const {courrier} = useUserData();
  const {isMobile} = useWindowDimension();
  const {status} = useSelector(selectDriverShipmentData) || {};
  const currentShipmentError = useSelector(selectPendingShipmentError);
  const isOnline = useSelector(selectOnlineStatus);

  const {enable, disable, hasLocationPermission} = useBackgroundLocation(
    currentPosition => {
      if (currentPosition?.latitude && Platform.OS === 'web') {
        dispatch(updatePosition(currentPosition));
      }
      dispatch(receiveUpdatePositionSuccess({currentPosition}));
    },
    {
      interval: 10 * 1000,
      fastestInterval: 5 * 1000,
      activitiesInterval: 10 * 1000,
      url: 'courrier/position',
      body: {
        latitude: '@latitude',
        longitude: '@longitude',
        vehicle_id: courrier.vehicle?.[0]?.id,
      },
    },
  );

  useEffect(() => {
    if (isOnline && hasLocationPermission()) {
      enable();
    } else if (!isOnline) {
      disable();
    }
  }, [isOnline, enable, disable]);

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
