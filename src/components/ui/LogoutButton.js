import React, {useCallback} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {theme} from 'constants/theme';
import {logout} from 'redux-store/slices/loginSlice';
import {MainButton} from 'components/ui/MainButton';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const onPressLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <View nativeID="buttonContainer">
      <Button inverted onPress={onPressLogout} color={theme.error}>
        Cerrar sesion
      </Button>
    </View>
  );
};

const Button = styled(MainButton)`
  align-self: center;
  border-color: ${theme.error};
  width: 90%;
  margin: 20px;
`;
