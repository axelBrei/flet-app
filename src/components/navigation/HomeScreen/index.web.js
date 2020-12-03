import React, {useLayoutEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {Container} from 'components/ui/Container';
import DirectionsIcon from 'resources/assets/directions.svg';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileHomeScreen from 'components/navigation/HomeScreen/index.native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {Card} from 'components/ui/Card';
import {theme} from 'constants/theme';
import styled from 'styled-components';
import InputFiled from 'components/ui/InputField';

const HomeScreen = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MainButton label="Registrarme" height={30} />,
    });
  }, [navigation]);

  return (
    <ScreenComponent>
      <Card style={{flex: 1}}>
        <Container alignItems="center" justifyContent="center">
          <AppText bold italic fontSize={22} width="100%">
            Gestioná tus envios, gestioná tu vida
          </AppText>
          <DirectionsIcon height={scaleDp(250)} width={scaleDp(250)} />
        </Container>
      </Card>
      <LoginContainer direction="column">
        <AppText width="100%" alternative>
          Iniciar sesión
        </AppText>
        <InputFiled icon="account-outline" label="Mail" />
        <InputFiled icon="lock-outline" label="Contraseña" />
        <Button label="Ingresar" inverted />
        <AppText alternative fontSize={10} onPress={() => {}}>
          ¿Olvidaste tu contraseña?
        </AppText>
      </LoginContainer>
    </ScreenComponent>
  );
};
export default WithMobileSupport(HomeScreen, MobileHomeScreen);

const ScreenComponent = styled(Screen)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: ${scaleDpTheme(15)};
  padding-right: ${scaleDpTheme(15)};
  padding-top: ${scaleDpTheme(20)};
  flex: 1;
`;

const LoginContainer = styled(Container)`
  width: ${scaleDpTheme(300)};
  background-color: ${theme.primaryLightColor};
  box-shadow: 1px 1px 8px ${(props) => props.theme.colors.backdropColor};
  border-radius: 7px;
  padding-left: ${scaleDpTheme(20)};
  padding-right: ${scaleDpTheme(20)};
  padding-top: ${scaleDpTheme(30)};
  padding-bottom: ${scaleDpTheme(60)};
  margin-left: ${scaleDpTheme(25)};
  align-items: center;
`;

const Button = styled(MainButton)`
  margin-top: ${scaleDpTheme(25)};
  margin-top: ${scaleDpTheme(15)};
`;
