import React, {useCallback} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {theme} from 'constants/theme';
import {fetchLogout} from 'redux-store/slices/loginSlice';
import {MainButton} from 'components/ui/MainButton';
import {selectOnlineStatusLoading} from 'redux-store/slices/driverSlice';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectOnlineStatusLoading);

  const onPressLogout = useCallback(() => dispatch(fetchLogout()), [dispatch]);

  return (
    <View nativeID="buttonContainer">
      <Button
        inverted
        onPress={onPressLogout}
        color={theme.error}
        loading={isLoading}>
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
