import React, {useCallback, useEffect} from 'react';
import Screen from 'components/ui/Screen';
import ForgorPasswordImage from 'resources/images/forgot_password.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import InputField from 'components/ui/InputField';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {formikConfig, FIELDS} from './formikConfig';
import {MainButton} from 'components/ui/MainButton';
import styled, {css} from 'styled-components';
import {Title} from 'components/ui/Title';
import {routes} from 'constants/config/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchRecoverPassword,
  selectIsLoadingRecoverPassowrd,
  selectRecoverPassowrdError,
} from 'redux-store/slices/loginSlice';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {isMobile, width} = useWindowDimension();
  const isLoading = useSelector(selectIsLoadingRecoverPassowrd);

  const onSubmit = useCallback(values => {
    dispatch(fetchRecoverPassword(values));
  }, []);

  const {
    values,
    errors,
    submited,
    handleSubmit,
    _setFieldTouched,
    _setFieldValue,
    touched,
  } = useFormikCustom(formikConfig(onSubmit));

  useEffect(() => {
    if (submited && !isLoading) {
      navigation.navigate(routes.recoverPasswordResultScreen);
    }
  }, [submited, isLoading]);

  return (
    <Screen enableAvoidKeyboard>
      <Container>
        <Title width="100%">Recuperar contraseña</Title>
        <ForgorPasswordImage
          height={isMobile ? width * 0.7 : Math.min(414, width * 0.5)}
          width={isMobile ? width * 0.7 : Math.min(414, width * 0.5)}
        />
        <InputContainer>
          <InputField
            label="Mail"
            value={values[FIELDS.EMAIL]}
            onChangeText={_setFieldValue(FIELDS.EMAIL)}
            error={touched[FIELDS.EMAIL] && errors[FIELDS.EMAIL]}
            onBlur={_setFieldTouched(FIELDS.EMAIL)}
            clearable
            disableCapitalize
            keyboardType="email-address"
            editable={!isLoading}
          />
          <InputField
            label="Teléfono"
            value={values[FIELDS.PHONE]}
            onChangeText={_setFieldValue(FIELDS.PHONE)}
            error={touched[FIELDS.PHONE] && errors[FIELDS.PHONE]}
            onBlur={_setFieldTouched(FIELDS.PHONE)}
            clearable
            disableCapitalize
            keyboardType="numeric"
            editable={!isLoading}
          />
        </InputContainer>
        <Button loading={isLoading} label="Recuperar" onPress={handleSubmit} />
      </Container>
    </Screen>
  );
};

const Container = styled.View`
  align-items: center;
  padding: 20px 20px 20px;
  flex: 1;
  ${props =>
    !props.theme.isMobile &&
    css`
      align-self: center;
      max-width: 550px;
    `}
`;

const InputContainer = styled.View`
  margin-top: 20px;
  padding-bottom: 40px;
  width: 100%;

  ${props =>
    props.theme.isMobile &&
    css`
      padding-bottom: 0;
      flex: 1;
    `}
`;

const Button = styled(MainButton)`
  width: 100%;
  margin: 0;
`;
