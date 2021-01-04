import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {Container} from 'components/ui/Container';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {logout} from 'redux-store/slices/loginSlice';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const onPressLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <ContainerButton onPress={onPressLogout}>
      <Icon name="logout" size={scaleDp(20)} color={theme.primaryDarkColor} />
      <AppText
        style={{marginLeft: scaleDp(5)}}
        fontSize={16}
        color={theme.primaryDarkColor}>
        Salir
      </AppText>
    </ContainerButton>
  );
};

const ContainerButton = styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: ${scaleDpTheme(20)};
  margin-left: ${scaleDpTheme(60)};
`;
