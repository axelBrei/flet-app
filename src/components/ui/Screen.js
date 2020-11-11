import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export const Screen = ({children}) => {


    return (
        <View style={styles.screen}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#efefef'
    }
})
