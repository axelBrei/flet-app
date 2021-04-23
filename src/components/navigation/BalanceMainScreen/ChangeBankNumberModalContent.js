import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {useAnimatedSucccesContent} from 'components/Hooks/useAnimatedSuccesContent';
import {Title} from 'components/ui/Title';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchChangeBankNumber,
  selectIsLoadingUpdateCbu,
  selectUpdateCbuError,
} from 'redux-store/slices/balanceSlice';
import * as yup from 'yup';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {strings} from 'constants/strings';
import {theme} from 'constants/theme';

export const ChangeBankNumberModalContent = ({closeModal}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingUpdateCbu);
  const error = useSelector(selectUpdateCbuError);
  const [submited, setSubmited] = useState(false);

  const onSubmit = useCallback(({number}) => {
    dispatch(fetchChangeBankNumber(number));
    setSubmited(true);
  }, []);

  const {
    values,
    errors,
    touched,
    _setFieldTouched,
    _setFieldValue,
    handleSubmit,
  } = useFormikCustom({
    initialValues: {
      number: '',
    },
    validationSchema: yup.object({
      number: yup
        .string()
        .length(22, strings.validations.specifycLength)
        .required(strings.validations.requiredField),
    }),
    onSubmit,
  });

  const {SuccessContent, isSuccesful} = useAnimatedSucccesContent(
    [submited, !isLoading],
    error
      ? 'Ocurrió un error al querer modificar el CBU'
      : 'CBU modificado con éxito!',
    !error && 'Ya podés retirar el dinero de tu cuenta',
    error && 'close',
    {iconColor: theme.error},
  );

  console.log(isSuccesful);

  useEffect(() => {
    if (submited && !isLoading && !error) {
      setTimeout(() => {
        closeModal();
        setSubmited(false);
      }, 2500);
    }
  }, [submited, isLoading, error]);

  return (
    <Container>
      <Title padding="0 0 20">Modifica tu CBU</Title>
      <InputField
        label="Nuevo CBU"
        value={values.number}
        onChangeText={_setFieldValue('number')}
        onBlur={_setFieldTouched('number')}
        error={touched.number && errors.number}
        editable={!isLoading}
      />
      <MainButton loading={isLoading} onPress={handleSubmit}>
        Confirmar
      </MainButton>
      <SuccessContent />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  padding: 20px;
`;
