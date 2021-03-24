import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import {View, StyleSheet, Platform} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import LandingDelivery from 'resources/images/landing_deliveries.svg';
import {theme} from 'constants/theme';
import {routes} from 'constants/config/routes';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {AppLogo} from 'components/ui/AppLogo';
import {MainButton} from 'components/ui/MainButton';
import {TextLink} from 'components/ui/TextLink';

export default ({navigation}) => {
  const {height, widthWithPadding} = useWindowDimension();

  const navigateToRegister = useCallback(
    () => navigation.navigate(routes.registerStack),
    [navigation],
  );
  const navigateToLogin = useCallback(
    () => navigation.navigate(routes.loginScreen),
    [navigation],
  );

  const onNavigateToDriverRegister = useCallback(() => {
    navigation.navigate(routes.registerStack, {driver: true});
  }, [navigation]);

  return (
    <ScreenComponent>
      <AppLogo color={theme.primaryColor} />
      <LogoDisclaimer>Una app, un mundo de envíos</LogoDisclaimer>
      <LandingDelivery width={widthWithPadding} height={height * 0.35} />
      <ButtonContainer>
        <Button label="Ingresar" onPress={navigateToLogin} />
        <Button label="Registrarme" inverted onPress={navigateToRegister} />
      </ButtonContainer>
      <DriveWithUs
        color={theme.primaryDarkColor}
        bold
        onPress={onNavigateToDriverRegister}>
        Manejá con nosotros
      </DriveWithUs>
    </ScreenComponent>
  );
};

// STYLES
const ScreenComponent = styled(Screen)`
  flex-direction: column;
  align-items: center;
  background-color: ${theme.backgroundColor};
  ${Platform.OS === 'web'
    ? css`
        overflow-x: hidden;
      `
    : ''}
`;

const LogoDisclaimer = styled(AppText)`
  color: ${theme.primaryColor};
  font-weight: bold;
  font-size: 18px;
`;

const ButtonContainer = styled(View)`
  flex: 0.7;
  align-items: center;
  justify-content: center;
`;

const Button = styled(MainButton)`
  width: ${(props) => `${props.theme.screenWidth - 40}px`};
`;

const DriveWithUs = styled(TextLink)`
  margin-bottom: 15px;
`;
