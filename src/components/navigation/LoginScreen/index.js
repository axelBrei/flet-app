import React from 'react';
import {Screen} from 'components/ui/Screen';
import {Card} from 'components/ui/Card';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {
  loginFormikConfig,
  LOGIN_FIELDS as FIELDS,
} from 'components/navigation/LoginScreen/loginFormikConfig';

export const LoginScreen = () => {
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
    <Screen style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Card onlyWeb>
        <AppText bold fontSize={20}>
          Ingresar como usuario
        </AppText>
        <InputField
          label="Usuario"
          value={values[FIELDS.USERNAME]}
          onChangeText={_setFieldValue(FIELDS.USERNAME)}
          error={
            submitCount > 0 &&
            touched[FIELDS.USERNAME] &&
            errors[FIELDS.USERNAME]
          }
          onBlur={_setFieldTouched(FIELDS.USERNAME)}
        />
        <InputField
          secureTextEntry
          label="Contaseña"
          value={values[FIELDS.PASSWORD]}
          onChangeText={_setFieldValue(FIELDS.PASSWORD)}
          error={
            submitCount > 0 &&
            touched[FIELDS.PASSWORD] &&
            errors[FIELDS.PASSWORD]
          }
          onBlur={_setFieldTouched(FIELDS.PASSWORD)}
        />
        <MainButton label="Ingresar" onPress={handleSubmit} />
      </Card>
    </Screen>
  );
};

export default LoginScreen;
