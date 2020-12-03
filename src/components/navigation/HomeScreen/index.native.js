import React, {useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import Directions from 'resources/assets/directions.svg';
import {routes} from 'constants/config/routes';
import {useNavigation} from '@react-navigation/native';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';

export default () => {
  const navigation = useNavigation();
  const navigateToRegister = () =>
    navigation.navigate(routes.registerStack, {
      screen: routes.registerPersonalDataScreen,
    });
  const navigateToLogin = () => navigation.navigate(routes.loginScreen);
  return (
    <Screen style={styles.screen}>
      <FloatingBackgroundOval />
      <View style={styles.textContainer}>
        <AppText bold fontSize={30} color={theme.white}>
          Bienvenido a FletApp
        </AppText>
        <AppText italic fontSize={20} color={theme.white}>
          Gestioná tus envios, gestioná tu vida
        </AppText>
        <Directions width={scaleDp(250)} />
      </View>
      <View style={styles.buttonsContainer}>
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.white,
    alignItems: 'center',
    ...Platform.select({
      web: {overflowX: 'hidden'},
    }),
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: scaleDp(100),
  },
  textContainer: {
    marginTop: scaleDp(90),
    alignItems: 'center',
  },
  button: {
    width: scaleDp(270),
    height: scaleDp(45),
  },
});
