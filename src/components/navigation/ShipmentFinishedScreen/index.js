import React, {useCallback} from 'react';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch} from 'react-redux';
import {cleanShipments} from 'redux-store/slices/shipmentSlice';

export default ({navigation}) => {
  const dispatch = useDispatch();

  const onPressButton = useCallback(() => {
    dispatch(cleanShipments());
  }, [navigation]);

  return (
    <Screen>
      <AppText>El pedido ya fue entregado</AppText>
      <MainButton label="Volver al inicio" onPress={onPressButton} />
    </Screen>
  );
};
