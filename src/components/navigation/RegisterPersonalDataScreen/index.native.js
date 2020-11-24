import React from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import styled from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterPersonalDataScreen/RegisterForm';
import {AppText} from 'components/ui/AppText';

export default () => {
  return (
    <Screen>
      <AppText bold fontSize={20}>
        Bienvenido!
      </AppText>
      <AppText fontSize={16} italic style={{paddingBottom: scaleDp(20)}}>
        Ingresá tus datos para obtener tu cuenta
      </AppText>
      <RegisterForm />
    </Screen>
  );
};

const Screen = styled(ScreenComponent)`
  flex: 1;
  align-items: center;
  padding-top: ${scaleDpTheme(10)};
`;
