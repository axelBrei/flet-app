import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {useNavigation} from '@react-navigation/native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {AppLogo} from 'components/ui/AppLogo';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {routes} from 'constants/config/routes';

export const Header = () => {
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
    <HeaderContainer>
      <AppLogo size={16} />
      <Container dir="row" alignItems="center" justifyContent="space-between">
        <MainButton
          inverted
          label="Registrarme"
          height={30}
          width={85}
          onPress={navigateToRegister}
        />
        <AppText
          padding="0px 15"
          fontSize={15}
          width={120}
          textAlign="center"
          color={theme.white}
          bold
          onPress={navigateToLogin}>
          Ingresar
        </AppText>
      </Container>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Container)`
  flex-direction: row;
  width: 100%;
  height: ${scaleDpTheme(60)};
  background-color: ${theme.primaryLightColor};
  padding-left: ${scaleDpTheme(15)};
  justify-content: space-between;
  align-items: center;
`;
