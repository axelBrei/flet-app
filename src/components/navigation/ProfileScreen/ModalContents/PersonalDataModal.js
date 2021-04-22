import React, {useCallback, useEffect} from 'react';
import styled, {css} from 'styled-components';
import InputField from 'components/ui/InputField';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {useUserData} from 'components/Hooks/useUserData';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectLoadingUpadteUserData,
  selectUpdateUserDataError,
  updatePersonalData,
} from 'redux-store/slices/personalData/personalData';
import {AnimatedError} from 'components/ui/AnimatedError';

const FIELDS = {
  NAME: 'name',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
};
const defaultSchema = yup.string().required();

export const PersonalDataModal = ({closeModal}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingUpadteUserData);
  const error = useSelector(selectUpdateUserDataError);
  const {name, lastName, email} = useUserData();

  const onSubmit = useCallback(
    values => {
      let data = {};
      if (values[FIELDS.NAME] !== name) data[FIELDS.NAME] = values[FIELDS.NAME];
      if (values[FIELDS.LAST_NAME] !== lastName)
        data[FIELDS.LAST_NAME] = values[FIELDS.LAST_NAME];
      if (values[FIELDS.EMAIL] !== email)
        data[FIELDS.EMAIL] = values[FIELDS.EMAIL];
      Object.keys(data).length > 0 && dispatch(updatePersonalData(data));
    },
    [name, lastName, email],
  );

  const {
    values,
    handleSubmit,
    _setFieldValue,
    _setFieldTouched,
    touched,
    errors,
    isSubmitting,
    submited,
  } = useFormikCustom({
    initialValues: {
      [FIELDS.NAME]: name || '',
      [FIELDS.LAST_NAME]: lastName || '',
      [FIELDS.EMAIL]: email || '',
    },
    validationSchema: yup.object(
      Object.values(FIELDS).reduce(
        (acc, curr) => ({...acc, [curr]: defaultSchema}),
        {},
      ),
    ),
    onSubmit,
  });

  useEffect(() => {
    if (submited && !isLoading && !error) {
      closeModal();
    }
  }, [submited, isLoading, error]);

  return (
    <Container>
      <Title width="100%" alignText="left">
        Datos Personales
      </Title>
      <AppText width="100%" alignText="left">
        Acá podes modificar tus datos
      </AppText>
      <InputsContainer>
        <InputField
          label="Nombre"
          value={values[FIELDS.NAME]}
          onChangeText={_setFieldValue(FIELDS.NAME)}
          onBlur={_setFieldTouched(FIELDS.NAME)}
          error={touched[FIELDS.NAME] && errors[FIELDS.NAME]}
          disabled={isLoading}
        />
        <InputField
          label="Apellido"
          value={values[FIELDS.LAST_NAME]}
          onChangeText={_setFieldValue(FIELDS.LAST_NAME)}
          onBlur={_setFieldTouched(FIELDS.LAST_NAME)}
          error={touched[FIELDS.LAST_NAME] && errors[FIELDS.LAST_NAME]}
          disabled={isLoading}
        />
        <InputField
          label="Email"
          value={values[FIELDS.EMAIL]}
          onChangeText={_setFieldValue(FIELDS.EMAIL)}
          onBlur={_setFieldTouched(FIELDS.EMAIL)}
          error={touched[FIELDS.EMAIL] && errors[FIELDS.EMAIL]}
          disabled={isLoading}
        />
        <ErrorContainer>
          <AnimatedError error={error} errorFontSize={14} />
        </ErrorContainer>
      </InputsContainer>
      <MainButton loading={isLoading} label="Guardar" onPress={handleSubmit} />
    </Container>
  );
};

const Container = styled.View`
  padding: 20px;
  align-items: center;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      min-width: 414px;
    `}
`;

const InputsContainer = styled.View`
  padding: 30px 0 10px;
  width: 100%;
`;

const ErrorContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
`;
