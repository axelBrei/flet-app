import React, {useCallback} from 'react';
import InputField from 'components/ui/InputField';
import {
  personalDataFormikConfig,
  REGISTER_PERSONAL_DATA_FIELDS as FIELDS,
} from 'components/navigation/RegisterScreen/formikConfig';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch} from 'react-redux';
import {routes} from 'constants/config/routes';
import {
  updateRegisterData,
  registerUser,
} from 'redux-store/slices/registerSlice';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {useRoute} from '@react-navigation/native';
import styled, {css} from 'styled-components';

export const RegisterForm = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const isDriverRegistrations = route.params?.driver;

  const _onSubmit = useCallback(
    (values) => {
      dispatch(
        (isDriverRegistrations ? updateRegisterData : registerUser)(values),
      );
      navigation.navigate(
        isDriverRegistrations
          ? routes.registerDriverDataScreen
          : // TODO: replace landing screen for home screen
            routes.landingScreen,
      );
    },
    [isDriverRegistrations, dispatch, navigation],
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    _setFieldValue,
    _setFieldTouched,
  } = useFormikCustom(personalDataFormikConfig(_onSubmit));
  return (
    <>
      <InputField
        label="Nombre"
        icon="account-outline"
        value={values[FIELDS.NAME]}
        onChangeText={_setFieldValue(FIELDS.NAME)}
        onBlur={_setFieldTouched(FIELDS.NAME)}
        error={touched[FIELDS.NAME] && errors[FIELDS.NAME]}
      />
      <InputField
        label="Apellido"
        icon="account-outline"
        value={values[FIELDS.LAST_NAME]}
        onChangeText={_setFieldValue(FIELDS.LAST_NAME)}
        onBlur={_setFieldTouched(FIELDS.LAST_NAME)}
        error={touched[FIELDS.LAST_NAME] && errors[FIELDS.LAST_NAME]}
      />
      <InputField
        label="Teléfono"
        icon="phone-outline"
        value={values[FIELDS.PHONE]}
        onChangeText={_setFieldValue(FIELDS.PHONE)}
        onBlur={_setFieldTouched(FIELDS.PHONE)}
        error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
      />
      <InputField
        label="Email"
        icon="email-outline"
        value={values[FIELDS.MAIL]}
        onChangeText={_setFieldValue(FIELDS.MAIL)}
        onBlur={_setFieldTouched(FIELDS.MAIL)}
        error={touched[FIELDS.MAIL] && errors[FIELDS.MAIL]}
      />
      <InputField
        label="Contraseña"
        icon="lock-outline"
        value={values[FIELDS.PASSWORD]}
        onChangeText={_setFieldValue(FIELDS.PASSWORD)}
        onBlur={_setFieldTouched(FIELDS.PASSWORD)}
        error={touched[FIELDS.PASSWORD] && errors[FIELDS.PASSWORD]}
      />
      {/*<Checkbox*/}
      {/*  text="Quiero ser un conductor"*/}
      {/*  isChecked={values[FIELDS.DRIVER]}*/}
      {/*  onPress={_setFieldValue(FIELDS.DRIVER)}*/}
      {/*/>*/}
      <Button label="Siguiente" onPress={handleSubmit} />
    </>
  );
};

const Button = styled(MainButton)`
  height: ${(props) => props.theme.scale(40)}px;
  width: 90%;
  margin-top: ${(props) => props.theme.scale(20)}px;
`;
