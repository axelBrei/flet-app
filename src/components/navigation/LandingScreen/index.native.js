import React, {useCallback} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import Directions from 'resources/assets/directions.svg';
import {routes} from 'constants/config/routes';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';
import {useNavigation} from 'components/Hooks/useNavigation';

export default () => {
  const navigation = useNavigation();
  const navigateToRegister = useCallback(
    () => navigation.navigate(routes.registerStack),
    [navigation],
  );
  const navigateToLogin = useCallback(
    () => navigation.navigate(routes.loginScreen),
    [navigation],
  );
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
    ...Platform.select({
      native: {flex: 1},
    }),
    justifyContent: 'flex-end',
    marginBottom: scaleDp(20),
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
