import React, {useCallback} from 'react';
import InputField from 'components/ui/InputField';
import {
  personalDataFormikConfig,
  REGISTER_PERSONAL_DATA_FIELDS as FIELDS,
} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';
import {MainButton} from 'components/ui/MainButton';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {routes} from 'constants/config/routes';
import {saveRegisterData} from 'redux-store/slices/registerSlice';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components';

export const RegisterForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      navigation.navigate(routes.registerAccountDataScreen);
      dispatch(
        saveRegisterData({
          step: 'personal',
          values,
        }),
      );
    },
    [dispatch, navigation],
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    _setFieldValue,
    _setFieldTouched,
  } = useFormikCustom(personalDataFormikConfig(onSubmit));
  return (
    <View>
      <InputField
        label="Nombre"
        value={values[FIELDS.NAME]}
        onChangeText={_setFieldValue(FIELDS.NAME)}
        onBlur={_setFieldTouched(FIELDS.NAME)}
        error={touched[FIELDS.NAME] && errors[FIELDS.NAME]}
      />
      <InputField
        label="Apellido"
        value={values[FIELDS.LAST_NAME]}
        onChangeText={_setFieldValue(FIELDS.LAST_NAME)}
        onBlur={_setFieldTouched(FIELDS.LAST_NAME)}
        error={touched[FIELDS.LAST_NAME] && errors[FIELDS.LAST_NAME]}
      />
      <InputField
        label="Teléfono"
        value={values[FIELDS.PHONE]}
        onChangeText={_setFieldValue(FIELDS.PHONE)}
        onBlur={_setFieldTouched(FIELDS.PHONE)}
        error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
      />
      <InputField
        label="Email"
        value={values[FIELDS.MAIL]}
        onChangeText={_setFieldValue(FIELDS.MAIL)}
        onBlur={_setFieldTouched(FIELDS.MAIL)}
        error={touched[FIELDS.MAIL] && errors[FIELDS.MAIL]}
      />
      <Button label="Siguiente" onPress={handleSubmit} />
    </View>
  );
};

const Button = styled(MainButton)`
  height: ${(props) => props.theme.scale(40)};
  margin-top: ${(props) => props.theme.scale(40)};
`;
