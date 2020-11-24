import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {RadioGroup} from 'components/ui/RadioGroup';
import {LoginButtons} from 'components/navigation/HomeScreen/LoginButtons';
import {AppText} from 'components/ui/AppText';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import Directions from 'resources/assets/directions.svg';

export default ({navigation}) => {
  return (
    <Screen style={styles.screen}>
      <View style={styles.floatingBall} />
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
        <LoginButtons orientation="column" />
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
  floatingBall: {
    position: 'absolute',
    top: scaleDp(-350),
    backgroundColor: theme.primaryLightColor,
    minHeight: scaleDp(600),
    minWidth: scaleDp(600),
    borderRadius: scaleDp(300),
  },
});
