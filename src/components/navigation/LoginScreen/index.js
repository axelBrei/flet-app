import React, {useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {
  loginFormikConfig,
  LOGIN_FIELDS as FIELDS,
} from 'components/navigation/LoginScreen/loginFormikConfig';
import {TextLink} from 'components/ui/TextLink';
import {scaleDp} from 'helpers/responsiveHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginAs,
  selectLoadingLogin,
  selectLoginError,
} from 'redux-store/slices/loginSlice';
import {Loader} from 'components/ui/Loader';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {openMapsOnDevice} from 'helpers/locationHelper';
import LoginImage from 'resources/images/login.svg';
import {PasswordInput} from 'components/navigation/LoginScreen/PasswordInput';
import {openMap} from 'redux-store/slices/preferencesSlice';

export const LoginScreen = ({}) => {
  const {widthWithPadding, height, isMobile} = useWindowDimension();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingLogin);
  const error = useSelector(selectLoginError);

  const onPressForgetPassword = () => {
    dispatch(
      openMap({
        latitude: -34.61943940808439,
        longitude: -58.454993291653814,
      }),
    );
    // openMapsOnDevice({
    //   latitude: -34.61943940808439,
    //   longitude: -58.454993291653814,
    // });
  };

  const onSubmit = values => {
    dispatch(loginAs(values[FIELDS.USERNAME], values[FIELDS.PASSWORD]));
  };

  const {
    values,
    _setFieldTouched,
    _setFieldValue,
    touched,
    submitCount,
    errors,
    setErrors,
    handleSubmit,
  } = useFormikCustom(loginFormikConfig(onSubmit));

  useEffect(() => {
    if (submitCount > 1 && !loading && error) {
      setErrors({
        [FIELDS.USERNAME]: 'Usuario y/o contraseña inexistente',
        [FIELDS.PASSWORD]: 'Usuario y/o contraseña inexistente',
      });
    }
  }, [error, loading, submitCount]);

  return (
    <ScreenComponent>
      <LoginImage width={widthWithPadding} height={height * 0.3} />
      <InputsContainer>
        <InputField
          editable={!loading}
          icon="account"
          label="Email"
          value={values[FIELDS.USERNAME]}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={_setFieldValue(FIELDS.USERNAME)}
          error={
            submitCount > 0 &&
            touched[FIELDS.USERNAME] &&
            errors[FIELDS.USERNAME]
          }
          onBlur={_setFieldTouched(FIELDS.USERNAME)}
          style={
            !isMobile && {
              maxWidth: scaleDp(250),
            }
          }
          textContentType="username"
        />
        <PasswordInput
          editable={!loading}
          label="Contaseña"
          value={values[FIELDS.PASSWORD]}
          onChangeText={_setFieldValue(FIELDS.PASSWORD)}
          error={
            submitCount > 0 &&
            touched[FIELDS.PASSWORD] &&
            errors[FIELDS.PASSWORD]
          }
          onBlur={_setFieldTouched(FIELDS.PASSWORD)}
          style={
            !isMobile && {
              maxWidth: scaleDp(250),
            }
          }
          onSubmitEditing={handleSubmit}
        />
      </InputsContainer>
      <ButtonsContainer>
        <Loader loading={loading}>
          <Button label="Ingresar" onPress={handleSubmit} />
          <Link onPress={onPressForgetPassword}>¿Olvidaste tu contraseña?</Link>
        </Loader>
      </ButtonsContainer>
      <AppText>
        ¿Todavia no tenes cuenta? <Link alternate>Crear cuenta</Link>
      </AppText>
    </ScreenComponent>
  );
};

export default LoginScreen;

const ScreenComponent = styled(Screen)`
  height: ${props => props.theme.screenHeight}px;
  align-items: center;
  padding: 60px 20px 0;
`;

const InputsContainer = styled(View)`
  padding-top: 15px;
  flex-shrink: 1;
  width: 100%;
  align-items: center;
`;

const ButtonsContainer = styled(View)`
  flex: 0.7;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
`;

const Button = styled(MainButton)`
  margin-bottom: 25px;
  width: 250px;
`;

const Link = styled(TextLink)`
  text-decoration: none;
  font-size: 14px;
  color: ${props =>
    props.alternate ? theme.primaryColor : theme.primaryDarkColor};
  font-weight: bold;
`;
