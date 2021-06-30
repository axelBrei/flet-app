import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCommonRegisterData,
  updateCommonUserData,
} from 'redux-store/slices/registerSlice';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  personalDataFormikConfig,
  REGISTER_PERSONAL_DATA_FIELDS as FIELDS,
} from 'components/navigation/RegisterScreen/formikConfig';
import {routes} from 'constants/config/routes';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {PasswordInput} from 'components/navigation/LoginScreen/PasswordInput';
import {theme} from 'constants/theme';

export default ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const isDriverRegistrations = route.params?.driver;
  const savedRegisterData = useSelector(selectCommonRegisterData);

  const _onSubmit = useCallback(
    values => {
      const {[FIELDS.CONFIRM_PASSWORD]: p, ...rest} = values;
      dispatch(updateCommonUserData(rest, !isDriverRegistrations));
      navigation.navigate(routes.registerPersonalData);
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
  } = useFormikCustom(personalDataFormikConfig(savedRegisterData, _onSubmit));

  return (
    <Container>
      <InputField
        label="Nombre"
        value={values[FIELDS.NAME]}
        onChangeText={_setFieldValue(FIELDS.NAME)}
        onBlur={_setFieldTouched(FIELDS.NAME)}
        error={touched[FIELDS.NAME] && errors[FIELDS.NAME]}
        textContentType="name"
      />
      <InputField
        label="Apellido"
        value={values[FIELDS.LAST_NAME]}
        onChangeText={_setFieldValue(FIELDS.LAST_NAME)}
        onBlur={_setFieldTouched(FIELDS.LAST_NAME)}
        error={touched[FIELDS.LAST_NAME] && errors[FIELDS.LAST_NAME]}
        textContentType="familyName"
      />
      <InputField
        label="Email"
        keyboardType="email-address"
        disableCapitalize
        value={values[FIELDS.MAIL]}
        onChangeText={_setFieldValue(FIELDS.MAIL)}
        onBlur={_setFieldTouched(FIELDS.MAIL)}
        error={touched[FIELDS.MAIL] && errors[FIELDS.MAIL]}
        textContentType="emailAddress"
      />
      <PasswordInput
        label="Contraseña"
        hideIcon
        value={values[FIELDS.PASSWORD]}
        onChangeText={_setFieldValue(FIELDS.PASSWORD)}
        onBlur={_setFieldTouched(FIELDS.PASSWORD)}
        error={touched[FIELDS.PASSWORD] && errors[FIELDS.PASSWORD]}
        textContentType="newPassword"
      />
      <PasswordInput
        label="Confirmar contraseña"
        hideIcon
        value={values[FIELDS.CONFIRM_PASSWORD]}
        onChangeText={_setFieldValue(FIELDS.CONFIRM_PASSWORD)}
        onBlur={_setFieldTouched(FIELDS.CONFIRM_PASSWORD)}
        error={
          touched[FIELDS.CONFIRM_PASSWORD] && errors[FIELDS.CONFIRM_PASSWORD]
        }
      />
      <Button label="Siguiente" onPress={handleSubmit} />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${theme.white};
  align-items: center;
  padding: 25px 20px 0;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding: 20px 0;
      width: 414px;
      align-self: center;
    `}
`;

const Button = styled(MainButton)`
  height: ${props => props.theme.scale(40)}px;
  width: 90%;
`;
