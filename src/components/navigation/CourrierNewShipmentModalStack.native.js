import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {theme} from 'constants/theme';
import {setOpacityToColor} from 'helpers/colorHelper';

const {Navigator, Screen} = createStackNavigator();

const CourrierNewShipmentModalStackNative = ({navigation}) => {
  return (
    <Navigator
      mode={'modal'}
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: {
          height: 60,
        },
      }}>
      <Screen
        name={routes.driverStack}
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
        getComponent={() =>
          require('components/navigation/DriverStack').DriverStack
        }
        listeners={{
          focus: () => navigation.setOptions({tabBarVisible: true}),
          blur: () => navigation.setOptions({tabBarVisible: false}),
        }}
      />
      <Screen
        name={routes.newShipmentModalScreen}
        options={{
          gestureEnabled: false,
          cardStyle: {
            backgroundColor: setOpacityToColor('#000000', 0.3),
            paddingTop: 10,
          },
          title: null,
          headerStyle: {
            height: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: theme.backgroundColor,
            borderBottomWidth: 0,
            shadowColor: theme.backgroundColor,
          },
          headerLeft: null,
          headerRight: null,
          headerTitleAlign: 'left',
        }}
        listeners={{
          focus: () => navigation.setOptions({tabBarVisible: false}),
          blur: () => navigation.setOptions({tabBarVisible: true}),
        }}
        getComponent={() =>
          require('components/navigation/NewShipmentModalScreen').default
        }
      />
    </Navigator>
  );
};
export default CourrierNewShipmentModalStackNative;
