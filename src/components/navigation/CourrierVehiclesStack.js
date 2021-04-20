import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import CourrierVehicleListScreen from 'components/navigation/CourrierVehicleListScreen';

const {Navigator, Screen} = createStackNavigator();
export default () => {
  return (
    <Navigator screenOptions={navigationConfig({})}>
      <Screen
        name={routes.profilevehicleListScreen}
        options={{title: 'Mis vehiculos'}}
        component={CourrierVehicleListScreen}
      />
      <Screen
        name={routes.vehicleDetailScreen}
        options={{title: 'Detalle del vehículo'}}
        getComponent={() =>
          require('components/navigation/VehicleDetailScreen').default
        }
      />
    </Navigator>
  );
};
