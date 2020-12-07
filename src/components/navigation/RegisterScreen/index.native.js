import React from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterScreen/RegisterForm';
import {AppText} from 'components/ui/AppText';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';
import {theme} from 'constants/theme';

export default ({navigation}) => {
  return (
    <Screen>
      <FloatingBackgroundOval />
      <Title bold>{'¡Hola!\nGracias por querer\nformar parte'}</Title>
      <RegisterForm navigation={navigation} />
    </Screen>
  );
};

const Screen = styled(ScreenComponent)`
  align-items: center;
  padding-left: ${scaleDpTheme(15)};
  padding-right: ${scaleDpTheme(15)};
`;

const Title = styled(AppText)`
  margin-top: ${scaleDpTheme(50)};
  z-index: 2;
  font-size: ${scaleDpTheme(30)};
  text-align: center;
  color: ${theme.fontColor};
  margin-bottom: ${scaleDpTheme(80)};
`;
