import React from 'react';
import {MainButton} from 'components/ui/MainButton';
import {View, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scaleDp} from 'helpers/responsiveHelper';
import {routes} from 'constants/config/routes';

export const LoginButtons = ({orientation}) => {
  const navigation = useNavigation();

  const navigateToRegister = () =>
    navigation.navigate(routes.registerStack, {
      screen: routes.registerPersonalDataScreen,
    });
  const navigateToLogin = () =>
    navigation.navigate(routes.registerStack, {
      screen: routes.registerPersonalDataScreen,
    });

  return (
    <View style={[{flexDirection: orientation}, styles.container]}>
      <MainButton
        inverted
        style={styles.button}
        label="Iniciar sesion"
        onPress={navigateToLogin}
      />
      <MainButton
        style={styles.button}
        label="Registrarme"
        onPress={navigateToRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: scaleDp(Platform.OS === 'web' ? 100 : 270),
    height: scaleDp(Platform.OS === 'web' ? 25 : 45),
  },
});
