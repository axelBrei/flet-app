import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {
  loginFormikConfig,
  LOGIN_FIELDS as FIELDS,
} from 'components/navigation/LoginScreen/loginFormikConfig';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {TextLink} from 'components/ui/TextLink';

export const LoginScreen = () => {
  const onPressForgetPassword = () => {};
  const onSubmit = (values) => {
    console.log(values);
  };

  const {
    values,
    _setFieldTouched,
    _setFieldValue,
    touched,
    submitCount,
    errors,
    handleSubmit,
  } = useFormikCustom(loginFormikConfig(onSubmit));
  return (
    <ScreenComponent>
      <FloatingBall />
      <Title bold>Iniciar sesion</Title>
      <InputField
        icon="account-outline"
        label="Usuario"
        value={values[FIELDS.USERNAME]}
        onChangeText={_setFieldValue(FIELDS.USERNAME)}
        error={
          submitCount > 0 && touched[FIELDS.USERNAME] && errors[FIELDS.USERNAME]
        }
        onBlur={_setFieldTouched(FIELDS.USERNAME)}
      />
      <InputField
        icon="lock-outline"
        secureTextEntry
        label="Contaseña"
        value={values[FIELDS.PASSWORD]}
        onChangeText={_setFieldValue(FIELDS.PASSWORD)}
        error={
          submitCount > 0 && touched[FIELDS.PASSWORD] && errors[FIELDS.PASSWORD]
        }
        onBlur={_setFieldTouched(FIELDS.PASSWORD)}
      />
      <MainButton label="Ingresar" onPress={handleSubmit} />
      <TextLink onPress={onPressForgetPassword}>Olvide mi contraseña</TextLink>
    </ScreenComponent>
  );
};

export default LoginScreen;

const ScreenComponent = styled(Screen)`
  flex: 1;
  padding: ${scaleDpTheme(15)};
  align-items: center;
`;

const Title = styled(AppText)`
  margin-bottom: 35%;
  margin-top: 40%;
  font-size: ${scaleDpTheme(30)};
  color: white;
`;

const FloatingBall = styled(View)`
  position: absolute;
  top: ${scaleDpTheme(-350)};
  background-color: ${theme.primaryLightColor};
  min-height: ${scaleDpTheme(600)};
  min-width: ${scaleDpTheme(600)};
  border-radius: ${scaleDpTheme(600)};
`;
