import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import BalanceMainScreen from 'components/navigation/BalanceMainScreen';
import {navigationConfig} from 'constants/config/navigationConfig';
import {theme} from 'constants/theme';

const {Navigator, Screen} = createStackNavigator();
export default () => {
  return (
    <Navigator screenOptions={navigationConfig({})}>
      <Screen
        name={routes.balanceMainScreen}
        component={BalanceMainScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={routes.balanceLastMovements}
        options={{title: 'Últimos movimientos'}}
        getComponent={() =>
          require('components/navigation/BalanceLastMovementsScreen').default
        }
      />
    </Navigator>
  );
};
