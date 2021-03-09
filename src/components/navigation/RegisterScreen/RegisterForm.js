import React, {useCallback, useEffect} from 'react';
import InputField from 'components/ui/InputField';
import {
  personalDataFormikConfig,
  REGISTER_PERSONAL_DATA_FIELDS as FIELDS,
} from 'components/navigation/RegisterScreen/formikConfig';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {routes} from 'constants/config/routes';
import {
  registerUser,
  selectIsLoadingRegister,
  selectRegisterError,
} from 'redux-store/slices/registerSlice';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {useRoute} from '@react-navigation/native';
import styled, {css} from 'styled-components';
import {Loader} from 'components/ui/Loader';

export const RegisterForm = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingRegister);
  const error = useSelector(selectRegisterError);
  const isDriverRegistrations = route.params?.driver;

  const _onSubmit = useCallback(
    (values) => {
      dispatch(registerUser(values, !isDriverRegistrations));
    },
    [isDriverRegistrations, dispatch, navigation],
  );

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    _setFieldValue,
    _setFieldTouched,
  } = useFormikCustom(personalDataFormikConfig(_onSubmit));

  useEffect(() => {
    if (isSubmitting && !isLoading && !error) {
      navigation.navigate(
        isDriverRegistrations
          ? routes.registerDriverDataScreen
          : routes.homeScreen,
      );
    }
  }, [isLoading, error, isSubmitting]);

  return (
    <>
      <InputField
        label="Nombre"
        icon="account-outline"
        value={values[FIELDS.NAME]}
        onChangeText={_setFieldValue(FIELDS.NAME)}
        onBlur={_setFieldTouched(FIELDS.NAME)}
        error={touched[FIELDS.NAME] && errors[FIELDS.NAME]}
        disabled={isLoading}
      />
      <InputField
        label="Apellido"
        icon="account-outline"
        value={values[FIELDS.LAST_NAME]}
        onChangeText={_setFieldValue(FIELDS.LAST_NAME)}
        onBlur={_setFieldTouched(FIELDS.LAST_NAME)}
        error={touched[FIELDS.LAST_NAME] && errors[FIELDS.LAST_NAME]}
        disabled={isLoading}
      />
      <InputField
        label="Teléfono"
        icon="phone-outline"
        keyboardType="phone-pad"
        value={values[FIELDS.PHONE]}
        onChangeText={_setFieldValue(FIELDS.PHONE)}
        onBlur={_setFieldTouched(FIELDS.PHONE)}
        error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
        disabled={isLoading}
      />
      <InputField
        label="Email"
        icon="email-outline"
        keyboardType="email-address"
        value={values[FIELDS.MAIL]}
        onChangeText={_setFieldValue(FIELDS.MAIL)}
        onBlur={_setFieldTouched(FIELDS.MAIL)}
        error={touched[FIELDS.MAIL] && errors[FIELDS.MAIL]}
        disabled={isLoading}
      />
      <InputField
        label="Contraseña"
        icon="lock-outline"
        secureTextEntry
        value={values[FIELDS.PASSWORD]}
        onChangeText={_setFieldValue(FIELDS.PASSWORD)}
        onBlur={_setFieldTouched(FIELDS.PASSWORD)}
        error={touched[FIELDS.PASSWORD] && errors[FIELDS.PASSWORD]}
        disabled={isLoading}
      />
      <Loader loading={isLoading}>
        <Button label="Siguiente" onPress={handleSubmit} />
      </Loader>
    </>
  );
};

const Button = styled(MainButton)`
  height: ${(props) => props.theme.scale(40)}px;
  width: 90%;
  margin-top: ${(props) => props.theme.scale(20)}px;
`;
