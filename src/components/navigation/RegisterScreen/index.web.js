import React, {useCallback} from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import {View, Platform} from 'react-native';
import styled, {css} from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterScreen/RegisterForm';
import MyAppSvg from 'resources/assets/my_app.svg';
import {AppText} from 'components/ui/AppText';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from 'components/navigation/RegisterScreen/index.native';

const RegisterScreen = ({navigation}) => {
  return (
    <Screen>
      <AppText bold fontSize={20} textAlign="center">
        ¡Hola! Gracias por querer formar parte
      </AppText>
      <Container dir="row">
        <MyAppSvg
          style={{
            height: scaleDp(250),
            width: scaleDp(300),
          }}
        />
        <FormContainer>
          <RegisterForm navigation={navigation} />
        </FormContainer>
      </Container>
    </Screen>
  );
};

export default WithMobileSupport(RegisterScreen, MobileScreen);

const Screen = styled(ScreenComponent)`
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: ${scaleDpTheme(30)};
`;

const Container = styled(View)`
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  padding: ${scaleDpTheme(10)};
`;

const FormContainer = styled(View)`
  flex-direction: column;
  flex: 1;
  width: 40%;
  min-width: ${scaleDpTheme(200)};
  margin-left: ${scaleDpTheme(15)};
  padding-top: ${scaleDpTheme(10)};
`;
