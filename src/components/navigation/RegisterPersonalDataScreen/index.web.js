import React, {useCallback} from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import {View, Platform} from 'react-native';
import styled from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterPersonalDataScreen/RegisterForm';
import MyAppSvg from 'resources/assets/my_app.svg';
import {AppText} from 'components/ui/AppText';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from 'components/navigation/RegisterPersonalDataScreen/index.native';

const RegisterScreen = () => {
  return (
    <Screen>
      <Container
        justifyContent="space-between"
        alignItems="flex-start"
        style={{flex: 1, width: '100%'}}>
        <Container direction="column">
          <AppText bold fontSize={20}>
            Bienvenido!
          </AppText>
          <AppText fontSize={16}>Gracias por formar parte de Flepi</AppText>
          <MyAppSvg
            style={{
              height: scaleDp(300),
              width: scaleDp(300),
            }}
          />
        </Container>
        <Container direction="column">
          <AppText italic>Ingresá tus datos para obtener tu cuenta</AppText>
          <RegisterForm />
        </Container>
      </Container>
    </Screen>
  );
};

export default WithMobileSupport(RegisterScreen, MobileScreen);

const Screen = styled(ScreenComponent)`
  flex: 1;
  width: 100%;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
  justify-content: center;
`;

const Container = styled(View)`
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  padding: ${scaleDpTheme(10)};
`;
