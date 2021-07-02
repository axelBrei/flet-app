import React, {useEffect, useCallback} from 'react';
import {LayoutAnimation} from 'react-native';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  markShipmentAsDelivered,
  markShipmentAsPickedUp,
  markShipmentAsWaitingInOrigin,
  selectDriverShipmentData,
} from 'redux-store/slices/driverShipmentSlice';
import {MainButton} from 'components/ui/MainButton';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {ShipmentStagesDescriptor} from 'components/navigation/DriverNewShipmentScreen/ShipmentStagesDescriptor';
import {selectDriverIsLoadingShipmentStatus} from 'redux-store/slices/driverShipmentSlice';
import {openMap} from 'redux-store/slices/preferencesSlice';
import {applyShadow} from 'helpers/uiHelper';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const ShipmentDescription = () => {
  const dispatch = useDispatch();
  const {height} = useWindowDimension();
  const loading = useSelector(selectDriverIsLoadingShipmentStatus);
  const shipments = useSelector(selectDriverShipmentData);
  const {id, status, startPoint, endPoint, destinations, currentDestination} =
    shipments[0]; // TODO: find closest shipment
  const destinationIndex = destinations?.findIndex(
    d => d.id === currentDestination,
  );
  const destination =
    status === SHIPMENT_STATE.COURRIER_CONFIRMED
      ? destinations[0]
      : destinations?.[
          status === SHIPMENT_STATE.WAITING_PACKAGE
            ? destinationIndex + 1
            : destinationIndex
        ];

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [status]);

  const onPressOpenMaps = useCallback(() => {
    dispatch(openMap(destination?.address));
  }, [destination]);

  const onPressButton = useCallback(() => {
    const action =
      status === SHIPMENT_STATE.COURRIER_CONFIRMED
        ? markShipmentAsWaitingInOrigin
        : status === SHIPMENT_STATE.WAITING_ORIGIN
        ? markShipmentAsPickedUp
        : markShipmentAsDelivered;
    dispatch(action?.(id));
  }, [status, dispatch]);

  const Component = useCallback(ShipmentStagesDescriptor(destination, status), [
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
          ? 'Estoy en la dirección de retiro'
          : status === SHIPMENT_STATE.WAITING_ORIGIN
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
  height: ${({theme}) => theme.screenHeight * 0.42}px;
`;
Container.defaultProps = applyShadow();
