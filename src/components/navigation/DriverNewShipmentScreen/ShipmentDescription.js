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
import {IconButton} from 'components/ui/IconButton';
import {LabelIconButton} from 'components/ui/LabelIconButton';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';
import {setOpacityToColor} from 'helpers/colorHelper';

export const ShipmentDescription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isMobile} = useWindowDimension();
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

  const onPressHelp = useCallback(() => {
    navigation.navigate(routes.shipmentHelpScreen, {driver: true});
  }, [navigation]);

  const Component = useCallback(ShipmentStagesDescriptor(destination, status), [
    status,
    destination,
  ]);
  return (
    <Container>
      <Component />
      <ButtonsContainer>
        <LabelIconButton
          style={{maxWidth: 250, flex: 1, marginRight: 10}}
          label="Ayuda"
          icon="information"
          onPress={onPressHelp}
          size={13}
        />
        {[
          SHIPMENT_STATE.COURRIER_CONFIRMED,
          SHIPMENT_STATE.ON_PROCESS,
        ].includes(status) && (
          <LabelIconButton
            style={{maxWidth: 250, flex: 1, marginLeft: 10}}
            label="Abrir mapas"
            icon="map-marker"
            onPress={onPressOpenMaps}
            size={13}
          />
        )}
      </ButtonsContainer>
      <MainButton
        fontSize={14}
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
  background-color: ${theme.white};
`;
// Container.defaultProps = applyShadow();

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px 0 20px;
`;
