import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {MainButton} from 'components/ui/MainButton';
import {PasswordInput} from 'components/navigation/LoginScreen/PasswordInput';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import * as yup from 'yup';
import {strings} from 'constants/strings';
import {useUserData} from 'components/Hooks/useUserData';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchChangePassword,
  selectIsLoadingUpdatePassword,
  selectUpdatePasswordError,
} from 'redux-store/slices/personalData/personalData';
import {useAnimatedOperationResult} from 'components/Hooks/useAnimatedSuccesContent';

export const ChangePasswordModal = ({closeModal}) => {
  const dispatch = useDispatch();
  const {password} = useUserData();
  const isLoading = useSelector(selectIsLoadingUpdatePassword);
  const error = useSelector(selectUpdatePasswordError);

  const onSubmit = useCallback(val => {
    dispatch(fetchChangePassword(val.oldPassword, val.newPassword));
  }, []);

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
    submited,
  } = useFormikCustom({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required(strings.validations.requiredField),
      newPassword: yup
        .string()
        .notOneOf([password], 'La contraseña debe ser diferente a la anterior')
        .required(strings.validations.requiredField),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Las contraseñas deben coincidir')
        .required(strings.validations.requiredField),
    }),
    onSubmit,
  });

  const {OperationResultContent} = useAnimatedOperationResult({
    successConditions: [submited, !isLoading],
    title: error ? 'Oh no!' : 'Exito!',
    message: error
      ? 'Ocurrió un problema para modificar la contraseña. Intentá de nuevo mas tarde'
      : 'Se ha moficado la contraseña!',
    isErrorContent: !!error,
    onHideOperationResult: closeModal,
    buttonText: 'Aceptar',
    theme: {
      iconSize: 120,
    },
  });

  return (
    <Container>
      <Title>Cambiar contraseña</Title>
      <InputContainer>
        <PasswordInput
          label="Contraseña actual"
          hideIcon
          value={values.oldPassword}
          onChangeText={_setFieldValue('oldPassword')}
          onBlur={_setFieldTouched('oldPassword')}
          error={touched.oldPassword && errors.oldPassword}
          editable={!isLoading}
        />
        <PasswordInput
          label="Nueva contraseña"
          hideIcon
          value={values.newPassword}
          onChangeText={_setFieldValue('newPassword')}
          onBlur={_setFieldTouched('newPassword')}
          error={touched.newPassword && errors.newPassword}
          editable={!isLoading}
        />
        <PasswordInput
          label="Confirmar contraseña"
          hideIcon
          value={values.confirmPassword}
          onChangeText={_setFieldValue('confirmPassword')}
          onBlur={_setFieldTouched('confirmPassword')}
          error={touched.confirmPassword && errors.confirmPassword}
          onSubmitEditing={handleSubmit}
          editable={!isLoading}
        />
      </InputContainer>
      <MainButton loading={isLoading} onPress={handleSubmit}>
        Confirmar
      </MainButton>
      <OperationResultContent />
    </Container>
  );
};
const Container = styled.View`
  padding: 20px;
  width: 100%;
  overflow: hidden;
`;

const InputContainer = styled.View`
  padding: 20px 0;
`;
