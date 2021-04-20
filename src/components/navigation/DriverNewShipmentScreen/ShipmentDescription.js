import React, {useEffect, useCallback} from 'react';
import {LayoutAnimation} from 'react-native';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  markShipmentAsDelivered,
  markShipmentAsPickedUp,
  selectDriverShipmentData,
} from 'redux-store/slices/driverShipmentSlice';
import {MainButton} from 'components/ui/MainButton';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {ShipmentStagesDescriptor} from 'components/navigation/DriverNewShipmentScreen/ShipmentStagesDescriptor';
import {openMapsOnDevice} from 'helpers/locationHelper';
import {selectDriverIsLoadingShipmentStatus} from 'redux-store/slices/driverShipmentSlice';

export const ShipmentDescription = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDriverIsLoadingShipmentStatus);
  const {status, startPoint, endPoint} = useSelector(selectDriverShipmentData);
  const destination =
    status === SHIPMENT_STATE.COURRIER_CONFIRMED ? startPoint : endPoint;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [status]);

  const onPressOpenMaps = useCallback(() => {
    openMapsOnDevice(destination);
  }, [destination]);

  const onPressButton = useCallback(() => {
    const action =
      status === SHIPMENT_STATE.COURRIER_CONFIRMED
        ? markShipmentAsPickedUp
        : markShipmentAsDelivered;
    dispatch(action?.());
  }, [status, dispatch]);

  const Component = useCallback(ShipmentStagesDescriptor(destination), [
    status,
    destination,
  ]);
  return (
    <Container>
      <Component />
      {[SHIPMENT_STATE.COURRIER_CONFIRMED, SHIPMENT_STATE.ON_PROCESS].includes(
        status,
      ) && (
        <MainButton fontSize={13} inverted onPress={onPressOpenMaps}>
          Abrir app de mapas
        </MainButton>
      )}
      <MainButton
        fontSize={13}
        bold={false}
        onPress={onPressButton}
        loading={loading}>
        {status === SHIPMENT_STATE.COURRIER_CONFIRMED
          ? 'Tengo el paquete en mis manos'
          : 'Estoy en la ubicacion de entrega'}
      </MainButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  background-color: ${theme.white};
  box-shadow: 1px 5px 3px ${theme.shadowColor};
`;
