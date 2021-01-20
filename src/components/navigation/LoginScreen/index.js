import React, {useEffect} from 'react';
import {Alert} from 'react-native';
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
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {TextLink} from 'components/ui/TextLink';
import {FloatingBackgroundOval} from 'components/ui/FloatingBackgroundOval';
import {scaleDp} from 'helpers/responsiveHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginAs,
  selectLoadingLogin,
  selectLoginError,
} from 'redux-store/slices/loginSlice';
import {Loader} from 'components/ui/Loader';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Card} from 'components/ui/Card';

export const LoginScreen = ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingLogin);
  const error = useSelector(selectLoginError);

  const onPressForgetPassword = () => {};
  const onSubmit = (values) => {
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
      {isMobile && (
        <>
          <FloatingBackgroundOval />
          <Title bold title fontSize={30}>
            Iniciar sesion
          </Title>
        </>
      )}
      <Card
        onlyWeb
        style={{
          padding: scaleDp(15),
          width: !isMobile ? 'auto' : '100%',
          height: 'auto',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <InputField
          editable={!loading}
          icon="account-outline"
          label="Email"
          value={values[FIELDS.USERNAME]}
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
        />
        <InputField
          editable={!loading}
          icon="lock-outline"
          secureTextEntry
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
        />
        <Loader
          loading={loading}
          onPlace
          style={{
            height: scaleDp(70),
            alignItems: 'center',
            marginTop: scaleDp(30),
          }}>
          <MainButton label="Ingresar" onPress={handleSubmit} />
          <TextLink onPress={onPressForgetPassword}>
            Olvide mi contraseña
          </TextLink>
        </Loader>
      </Card>
    </ScreenComponent>
  );
};

export default LoginScreen;

const ScreenComponent = styled(Screen)`
  height: ${(props) => props.theme.screenHeight}px;
  padding: ${scaleDpTheme(15)};
  align-items: center;
  padding-top: ${(props) => props.theme.screenHeight * 0.12}px;
`;

const Title = styled(AppText)`
  margin-bottom: ${(props) => (props.theme.isMobile ? '55%' : 0)};
  z-index: 2;
  color: ${theme.fontColor};
`;
