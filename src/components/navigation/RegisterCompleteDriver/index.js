import React from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import RegisterImage from 'resources/images/review-docs.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {routes} from 'constants/config/routes';

export default ({navigation}) => {
  const {widthWithPadding, height} = useWindowDimension();
  const goToLogin = () => navigation.navigate(routes.landingScreen);
  return (
    <Screen>
      <ScreenComponent>
        <Title size={18} textAlign="center">
          Estaremos analizando los datos subidos para verificar tu identidad
        </Title>
        <AppText textAlign="center">
          Tené en cuenta que esto puede demorar algunos dias
        </AppText>
        <ButtonContainer>
          <RegisterImage width={414} height={height * 0.4} />
          <Button label="Ir al inicio" onPress={goToLogin} />
        </ButtonContainer>
      </ScreenComponent>
    </Screen>
  );
};

const ScreenComponent = styled.View`
  padding: 20px;
  flex: 1;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding: 20px 0;
      width: 414px;
      align-self: center;
    `}
`;

const ButtonContainer = styled.View`
  justify-content: space-between;
  padding: 20px 0;

  ${({theme}) =>
    theme.isMobile &&
    css`
      flex: 1;
    `}
`;

const Button = styled(MainButton)`
  width: 100%;
  align-self: flex-end;
`;
