import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import LastShipmentsScreen from 'components/navigation/LastShipmentsScreen';
import LastShipmentDetailScreen from 'components/navigation/LastShipmentDetailScreen';
import {navigationConfig} from 'constants/config/navigationConfig';
import dayjs from 'dayjs';
import {capitallize} from 'helpers/stringHelper';

const {Navigator, Screen} = createStackNavigator();

const LastShipmentStack = () => {
  return (
    <Navigator>
      <Screen
        name={routes.lastShippmentsScreen}
        component={LastShipmentsScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={routes.lastShipmentsDetailScreen}
        component={LastShipmentDetailScreen}
        options={({route}) => {
          const date = dayjs(route.params?.shipment?.date).format(
            'ddd DD MMM YYYY - HH:MM[hs]',
          );
          return navigationConfig({
            title: capitallize(date),
            headerTransparent: true,
            headerTitle: capitallize(date),
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 20,
            },
          });
        }}
      />
    </Navigator>
  );
};
export default LastShipmentStack;
