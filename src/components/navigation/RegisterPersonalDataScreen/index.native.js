import React from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import styled from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterPersonalDataScreen/RegisterForm';
import {AppText} from 'components/ui/AppText';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';
import {theme} from 'constants/theme';

export default () => {
  return (
    <Screen>
      <FloatingBackgroundOval />
      <Title bold>{'¡Hola!\nGracias por querer\nformar parte'}</Title>
      <RegisterForm />
    </Screen>
  );
};

const Screen = styled(ScreenComponent)`
  flex: 1;
  align-items: center;
  padding-left: ${scaleDpTheme(15)};
  padding-right: ${scaleDpTheme(15)};
`;

const Title = styled(AppText)`
  margin-top: 20%;
  z-index: 2;
  font-size: ${scaleDpTheme(30)};
  text-align: center;
  color: ${theme.white};
  margin-bottom: ${scaleDpTheme(100)};
`;
