import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

export default () => {

    return (
        <View style={styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        height: Platform.select({
            native: '100%',
            web: '100vh',
        }),
        width: Platform.select({
            native: '100%',
            web: '100vw',
        }),
    },
});
