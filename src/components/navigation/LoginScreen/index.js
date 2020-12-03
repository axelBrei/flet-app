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
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';

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
      <FloatingBackgroundOval />
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
  padding: ${scaleDpTheme(15)};
  align-items: center;
`;

const Title = styled(AppText)`
  margin-bottom: 55%;
  margin-top: 20%;
  z-index: 2;
  font-size: ${scaleDpTheme(30)};
  color: ${theme.white};
`;
