import React, {useCallback, useEffect, useState} from 'react';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import styled from 'styled-components';
import {StartRow} from 'components/ui/Row';
import {CustomImage} from 'components/ui/Image';
import {Title} from 'components/ui/Title';
import {
  REJECTION_FIELDS_MAPPINGS,
  getRejectionIcon,
} from 'constants/rejectedFieldsMappings';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import InputField from 'components/ui/InputField';
import SelectImage from 'components/ui/SelectImage';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {strings} from 'constants/strings';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUpdateCourrierRejection,
  selectIsLoadingUpdateCourrierRejection,
  selectUpdateCourrierRejectionError,
} from 'redux-store/slices/driverSlice';
import {AnimatedError} from 'components/ui/AnimatedError';

export default ({route, navigation}) => {
  const {rejection} = route.params;
  const dispatch = useDispatch();
  const {id, field} = rejection;
  const icon = getRejectionIcon(field);
  const isCamera = icon === 'camera';
  const isLoading = useSelector(selectIsLoadingUpdateCourrierRejection);
  const error = useSelector(selectUpdateCourrierRejectionError);
  const [isFormSubmited, setIsFormSubmited] = useState(false);

  useEffect(() => {
    if (isFormSubmited && !isLoading && !error) {
      setIsFormSubmited(false);
      navigation.goBack();
    }
  }, [isFormSubmited, isLoading, error, navigation]);

  const onSubmit = useCallback(
    value => {
      dispatch(fetchUpdateCourrierRejection(id, field, value[field]));
      setIsFormSubmited(true);
    },
    [id, field],
  );

  const {
    _setFieldValue,
    values,
    errors,
    _setFieldTouched,
    touched,
    handleSubmit,
    setValues,
  } = useFormikCustom({
    initialValues: {[field]: isCamera ? null : ''},
    validationSchema: yup.object({
      [field]: yup[isCamera ? 'object' : 'string']()
        .nullable()
        .required(strings.validations.requiredField),
    }),
    onSubmit,
  });

  const InputComponent = isCamera ? SelectImage : InputField;
  const placeholder = isCamera ? 'Nueva foto de' : '';
  console.log(values);
  return (
    <ScreenComponent>
      <StartRow style={{marginBottom: 20}}>
        <Image defaultIcon={icon} iconSize={40} iconColor={theme.white} />
        <Title>{REJECTION_FIELDS_MAPPINGS[field]}</Title>
      </StartRow>
      <AppText>Completá el formulario para poder resolverlo</AppText>
      <InputContainer>
        <InputComponent
          value={values[field]}
          onSelectImage={i => setValues({[field]: i})}
          onChangeText={i => setValues({[field]: i})}
          error={touched[field] && errors[field]}
          onBlur={_setFieldTouched(field)}
          label={`${placeholder} ${REJECTION_FIELDS_MAPPINGS[field]}`}
        />
      </InputContainer>
      <MainButton loading={isLoading} onPress={handleSubmit}>
        Resolver
      </MainButton>
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  padding: 20px;
`;

const Image = styled(CustomImage)`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-right: 10px;
  background-color: ${theme.primaryDarkColor};
`;

const InputContainer = styled.View`
  padding: 20px 0;
  justify-content: center;
`;
