import React, {useCallback, useLayoutEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {Container} from 'components/ui/Container';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileHomeScreen from 'components/navigation/LandingScreen/index.native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {MainButton} from 'components/ui/MainButton';
import {routes} from 'constants/config/routes';
import styled from 'styled-components';
import ShipmentBoxes from 'resources/assets/logistics.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {AppText} from 'components/ui/AppText';
import {Benefits} from 'components/navigation/LandingScreen/Benefits';
import {Footer} from 'components/navigation/LandingScreen/Footer';
import {VehicleSizes} from 'components/navigation/LandingScreen/VehicleSizes';
import {Header} from 'components/navigation/LandingScreen/Header';

const strings = {
  bannerTitle: 'Despreocupate,\nnosotros lo llevamos',
  bannerSubtitle:
    'No pierdas tiempo buscando un flete, en FletApp los \ntenemos disponibles cuando los necesites y en donde \nquiera que estes.',
  driverTitle: '¿Sos conductor?',
  driverSubtitle: 'Empeza hoy a generar ingresos de tu tiempo libre',
  driveWithUs: 'Conducí con nosotros',
};

const HomeScreen = ({navigation, route}) => {
  const {width, height} = useWindowDimension();
  const scale = React.useMemo(() => {
    if (width >= 1300) return 1.3;
    return 1;
  }, [width]);

  const _scaleDp = React.useCallback((dp) => scaleDp(dp * scaleDp()), [scale]);
  const scaleFont = React.useCallback((dp) => dp * scale, [scale]);

  useLayoutEffect(() => {
    const navigateToRegister = () => navigation.navigate(routes.registerStack);

    navigation.setOptions({
      headerRight: () => (
        <Container dir="row" alignItems="center" justifyContent="space-between">
          <MainButton
            inverted
            label="Registrarme"
            height={30}
            width={85}
            onPress={navigateToRegister}
          />
          <AppText
            padding={`0px ${scaleDp(15)}`}
            fontSize={12}
            onPress={() => navigation.navigate(routes.loginScreen)}>
            Ingresar
          </AppText>
        </Container>
      ),
    });
  }, [navigation]);

  const navigateToRegisterDriver = useCallback(
    () =>
      navigation.navigate(routes.registerStack, {
        driver: true,
      }),
    [navigation],
  );

  return (
    <ScreenComponent scrollable>
      <Header />
      <BaseContainer>
        <BannerContainer>
          <Container padding={`0px ${scaleDpTheme(25)}`}>
            <AppText bold fontSize={scaleFont(32)}>
              {strings.bannerTitle}
            </AppText>
            <AppText padding="15px 0" fontSize={scaleFont(13)}>
              {strings.bannerSubtitle}
            </AppText>
            <Container padding="20px 0px">
              <AppText bold fontSize={scaleFont(16)}>
                {strings.driverTitle}
              </AppText>
              <AppText>{strings.driverSubtitle}</AppText>
              <Button
                label={strings.driveWithUs}
                onPress={navigateToRegisterDriver}
              />
            </Container>
          </Container>
          <ShipmentBoxes width={_scaleDp(220)} height={_scaleDp(230)} />
        </BannerContainer>

        <Benefits scaleFont={scaleFont} scale={_scaleDp} />
        <VehicleSizes />
      </BaseContainer>
      <Footer />
    </ScreenComponent>
  );
};

export default WithMobileSupport(HomeScreen, MobileHomeScreen);

const ScreenComponent = styled(Screen)`
  flex: 1;
`;

const BaseContainer = styled(Container)`
  width: 100%;
  align-self: center;
  align-items: center;
  max-width: 1000px;
  padding-top: ${scaleDpTheme(20)};
`;

const BannerContainer = styled(Container)`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Button = styled(MainButton)`
  margin-left: 0;
  margin-top: ${scaleDpTheme(15)};
  width: ${scaleDpTheme(180)};
  height: ${scaleDpTheme(35)};
`;
