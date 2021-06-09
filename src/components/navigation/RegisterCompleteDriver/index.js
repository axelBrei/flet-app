import React, {useCallback, useEffect} from 'react';
import styled, {css} from 'styled-components';
import Screen from 'components/ui/Screen';
import RegisterImage from 'resources/images/review-docs.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {routes} from 'constants/config/routes';
import {useUserData} from 'components/Hooks/useUserData';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginAs,
  selectLoadingLogin,
  selectLoginError,
} from 'redux-store/slices/loginSlice';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {widthWithPadding, height} = useWindowDimension();
  const userData = useUserData();
  const isLoading = useSelector(selectLoadingLogin);
  const error = useSelector(selectLoginError);

  useEffect(() => {
    if (userData.id) {
      dispatch(loginAs(userData.email, userData.password));
    }
  }, [userData]);

  const goToLogin = useCallback(() => {
    if (error) {
      return dispatch(loginAs(userData.email, userData.password));
    }
    if (userData.id) {
      navigation.popToTop();
      return navigation.goBack();
    }
    navigation.navigate(routes.landingScreen);
  }, [userData, navigation]);

  return (
    <Screen>
      <ScreenComponent>
        <Title size={18} textAlign="center">
          Estaremos analizando los datos subidos para verificar tu identidad
        </Title>
        <AppText textAlign="center">
          Tené en cuenta que esto puede demorar algunos dias
        </AppText>
        <RegisterImage width={widthWithPadding} height={350} />
        <ButtonContainer>
          {error && (
            <AppText>Ocurrió un error al actualizar tu usuario</AppText>
          )}
          <Button
            loading={error && isLoading}
            label={error ? 'Reintentar' : 'Ir al inicio'}
            onPress={goToLogin}
          />
        </ButtonContainer>
      </ScreenComponent>
    </Screen>
  );
};

const ScreenComponent = styled.View`
  padding: 20px;
  flex: 1;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding: 20px 0;
      width: 414px;
      align-self: center;
    `}
`;

const ButtonContainer = styled.View`
  justify-content: space-between;
  padding: 20px 0;

  ${({theme}) =>
    theme.isMobile &&
    css`
      flex: 1;
      justify-content: center;
      align-items: center;
    `}
`;

const Button = styled(MainButton)`
  width: 100%;
`;
