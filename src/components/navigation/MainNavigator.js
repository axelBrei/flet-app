import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'components/navigation/HomeScreen';
import ProfileScreen from 'components/navigation/ProfileScreen';
import {routes} from 'constants/config/routes';

const {Navigator, Screen} = createStackNavigator();
export default () => {
    return <Navigator>
        <Screen name={routes.homeScreen} component={HomeScreen}/>
        <Screen name={routes.profileScreen} component={ProfileScreen}/>
    </Navigator>
}
