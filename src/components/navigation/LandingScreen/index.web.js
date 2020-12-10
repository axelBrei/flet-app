import React, {useCallback, useLayoutEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {Container} from 'components/ui/Container';
import DirectionsIcon from 'resources/assets/directions.svg';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileHomeScreen from 'components/navigation/LandingScreen/index.native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {Card} from 'components/ui/Card';
import {theme} from 'constants/theme';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {routes} from 'constants/config/routes';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  loginFormikConfig,
  LOGIN_FIELDS as FIELDS,
} from 'components/navigation/LoginScreen/loginFormikConfig';
import {TextLink} from 'components/ui/TextLink';

const HomeScreen = ({navigation, route}) => {
  useLayoutEffect(() => {
    const navigateToRegister = () => navigation.navigate(routes.registerStack);
    const navigateToRegisterDriver = () =>
      navigation.navigate(routes.registerStack, {
        driver: true,
      });
    navigation.setOptions({
      headerRight: () => (
        <Container
          dir="row"
          alignItems="center"
          width={`${scaleDp(330)}px`}
          justifyContent="space-between">
          <TextLink fontSize={12} onPress={navigateToRegisterDriver}>
            Quiero ser conductor
          </TextLink>
          <MainButton
            label="Registrarme"
            height={30}
            onPress={navigateToRegister}
          />
        </Container>
      ),
    });
  }, [navigation]);

  const onSubmitLogin = useCallback(() => {}, []);

  const {
    values,
    _setFieldTouched,
    _setFieldValue,
    touched,
    submitCount,
    errors,
    handleSubmit,
  } = useFormikCustom(loginFormikConfig(onSubmitLogin));

  return (
    <ScreenComponent>
      <Card style={{flex: 1}}>
        <Container alignItems="center" justifyContent="center">
          <AppText bold italic fontSize={22} width="100%">
            Gestioná tus envios, gestioná tu vidaa
          </AppText>
          <DirectionsIcon height={scaleDp(250)} width={scaleDp(250)} />
        </Container>
      </Card>
      <LoginContainer dir="column">
        <AppText width="100%" alternative>
          Iniciar sesión
        </AppText>
        <InputField
          value={values[FIELDS.USERNAME]}
          onChangeText={_setFieldValue(FIELDS.USERNAME)}
          onBlur={_setFieldTouched(FIELDS.USERNAME)}
          error={
            submitCount > 0 &&
            touched[FIELDS.USERNAME] &&
            errors[FIELDS.USERNAME]
          }
          icon="account-outline"
          label="Mail"
        />
        <InputField
          value={values[FIELDS.PASSWORD]}
          onChangeText={_setFieldValue(FIELDS.PASSWORD)}
          onBlur={_setFieldTouched(FIELDS.PASSWORD)}
          error={
            submitCount > 0 &&
            touched[FIELDS.PASSWORD] &&
            errors[FIELDS.PASSWORD]
          }
          icon="lock-outline"
          label="Contraseña"
        />
        <Button label="Ingresar" inverted onPress={handleSubmit} />
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
