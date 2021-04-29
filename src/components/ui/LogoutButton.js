import React, {useCallback} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {theme} from 'constants/theme';
import {fetchLogout} from 'redux-store/slices/loginSlice';
import {MainButton} from 'components/ui/MainButton';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const onPressLogout = useCallback(() => dispatch(fetchLogout()), [dispatch]);

  return (
    <View nativeID="buttonContainer">
      <Button inverted onPress={onPressLogout} color={theme.error}>
        Cerrar sesión
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
