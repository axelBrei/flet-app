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
import {MainButton} from 'components/ui/MainButton';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const onPressLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <Button inverted onPress={onPressLogout} color={theme.error}>
      Cerrar sesion
    </Button>
  );
};

const Button = styled(MainButton)`
  align-self: center;
  border-color: ${theme.error};
  width: 70%;
  margin: 20px;
`;
