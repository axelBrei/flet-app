import React from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, Text} from 'react-native';
import { routes } from 'constants/config/routes';
import {Screen} from 'components/ui/Screen';

export default ({navigation}) => {

    return (
        <Screen>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(routes.profileScreen)}>
                <Text>Hola</Text>
            </TouchableOpacity>
        </Screen>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        width: 350,
        borderRadius: 10,
        height: 40,
        backgroundColor: '#d22b40'
    }
});
