import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

import HomeScreen from 'components/navigation/HomeScreen/index';
import NewShipmentConfirmationScreen from 'components/navigation/NewShipmentConfirmationScreen';
import ShipmentScreen from 'components/navigation/ShipmentScreen';
import {useSelector} from 'react-redux';
import {selectCurrentShipment} from 'redux-store/slices/shipmentSlice';
import ShipmentFinishedScreen from 'components/navigation/ShipmentFinishedScreen';
import NewShipmentPackageDescriptionScreen from 'components/navigation/NewShipmentPackageInfoScreen';

const {Navigator, Screen} = createStackNavigator();

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const currentShipment = useSelector(selectCurrentShipment);

  useEffect(() => {
    const {status} = currentShipment;
    console.log(status);
  }, [currentShipment]);

  return (
    <Navigator
      screenOptions={navigationConfig({
        headerTransparent: !isMobile,
        headerBackTitle: 'Volver',
        headerTintColor: isMobile ? theme.fontColor : theme.primaryDarkColor,
        headerBackTitleVisible: !isMobile,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.fontColor,
        },
      })}>
      {currentShipment.shipmentId || currentShipment.id ? (
        <>
          <Screen
            name={routes.shipmentScreen}
            component={ShipmentScreen}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name={routes.shipmentFinishedScreen}
            component={ShipmentFinishedScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Screen
            name={routes.homeScreen}
            component={HomeScreen}
            options={{
              title: 'Realizar un envío',
              headerShown: false,
            }}
          />
          <Screen
            name={routes.newShipmentPackageDetailScreen}
            component={NewShipmentPackageDescriptionScreen}
            options={{
              title: '',
              headerTitle: 'Nuevo Pedido',
              headerStyle: {
                backgroundColor: theme.white,
                shadowColor: 'transparent',
              },
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
            name={routes.paymentScreen}
            getComponent={() =>
              require('components/navigation/PaymentScreen').default
            }
          />
        </>
      )}
    </Navigator>
  );
};
