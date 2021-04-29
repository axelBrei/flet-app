import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import ProfileScreen from 'components/navigation/ProfileScreen';
import {navigationConfig} from 'constants/config/navigationConfig';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  const {isMobile} = useWindowDimension();
  return (
    <Navigator
      screenOptions={navigationConfig({
        headerTransparent: !isMobile,
        headerBackTitle: 'Volver',
        headerBackTitleVisible: !isMobile,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      })}>
      <Screen
        name={routes.profileScreen}
        component={ProfileScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Screen
        name={routes.userAddressUpdateScreen}
        options={{
          title: isMobile ? 'Mis direcciones' : '',
        }}
        getComponent={() =>
          require('components/navigation/UserAddressUpdateScreen').default
        }
      />
      <Screen
        name={routes.profileVehicleStack}
        options={{headerShown: false}}
        getComponent={() =>
          require('components/navigation/CourrierVehiclesStack').default
        }
      />
    </Navigator>
  );
};
