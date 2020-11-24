import React, {useLayoutEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {Container} from 'components/ui/Container';
import DirectionsIcon from 'resources/assets/directions.svg';
import {LoginButtons} from 'components/navigation/HomeScreen/LoginButtons';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileHomeScreen from 'components/navigation/HomeScreen/index.native';
import {scaleDp} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';

const HomeScreen = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LoginButtons orientation="row" />,
    });
  }, [navigation]);

  return (
    <Screen>
      <Container direction="row">
        <DirectionsIcon height={scaleDp(200)} width={scaleDp(200)} />
        <Container style={{paddingTop: scaleDp(40), paddingLeft: scaleDp(15)}}>
          <AppText bold italic fontSize={25}>
            Somos Flepi
          </AppText>
          <AppText fontSize={17}>
            La empresa de encomiendas en tu bolsillo
          </AppText>
        </Container>
      </Container>
    </Screen>
  );
};
export default WithMobileSupport(HomeScreen, MobileHomeScreen);
