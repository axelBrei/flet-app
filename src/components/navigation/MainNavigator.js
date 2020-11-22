import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import HomeScreen from 'components/navigation/HomeScreen';
import {RegisterStack} from 'components/navigation/RegisterStack';

const {Navigator, Screen} = createStackNavigator();
export default () => {
  return (
    <Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={{
        title: '',
        animationEnabled: true,
      }}>
      <Screen
        name={routes.homeScreen}
        component={HomeScreen}
        options={{
          headerShown: Platform.OS === 'web',
        }}
      />
      <Screen
        name={routes.registerStack}
        component={RegisterStack}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};
