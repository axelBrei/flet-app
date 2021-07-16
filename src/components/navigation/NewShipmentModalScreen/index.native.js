import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Screen from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {useBackHandler} from 'components/Hooks/useBackHandle';
import {Row} from 'components/ui/Row';
import {Title} from 'components/ui/Title';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {StaticInputField} from 'components/ui/StaticInputField';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {useDispatch, useSelector} from 'react-redux';
import {
  confirmShipment,
  rejectShipment,
  removeShipmentFromList,
  selectDriverShipmentData,
  selectLoadingPendingShipmentAnswer,
  selectPendingShipmentAnswerError,
} from 'redux-store/slices/driverShipmentSlice';
import Map from 'components/ui/Map';
import {ShipmentDestinationsSteps} from 'components/ui/ShipmentDestinationSteps';
import {AppText} from 'components/ui/AppText';
import {useCurrentUserPosition} from 'components/Hooks/useCurrentUserPosition';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {Platform, Alert} from 'react-native';
import CAR_MARKER from 'resources/assets/driver_car.png';
import CarMarker from 'resources/assets/driver_car';
import {ProgressTimeout} from 'components/navigation/NewShipmentModalScreen/ProgressTimeout';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useFocusEffect} from '@react-navigation/native';

const getDistanceIfKm = distance => {
  if (distance > 999) {
    return `${(distance / 1000).toString().substring(0, 4)} Km.`;
  }
  return `${distance} Mts.`;
};
const NewShipmentModalScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {height} = useWindowDimension();
  const [hasInteracion, setHasInteraction] = useState(false);
  const {currentPosition} = useCurrentUserPosition();
  const loading = useSelector(selectLoadingPendingShipmentAnswer);
  const error = useSelector(selectPendingShipmentAnswerError);
  const shipments = useSelector(selectDriverShipmentData);
  const shipment = shipments.find(
    s => s.status === SHIPMENT_STATE.PENDING_COURRIER,
  );
  const totalDistance = shipment?.destinations?.reduce(
    (a, c) => a + c?.distance || 0,
    0,
  );

  // return true to disable the goBack
  useBackHandler(() => true);

  const onPressAccept = useCallback(() => {
    dispatch(confirmShipment(shipment.id));
    setHasInteraction(true);
  }, [dispatch, shipment]);

  const onPressReject = useCallback(() => {
    dispatch(rejectShipment(shipment.id));
    setHasInteraction(true);
  }, [dispatch, shipment]);

  useFocusEffect(
    useCallback(() => {
      if (hasInteracion && !loading) {
        navigation.goBack();
      }
    }, [navigation, hasInteracion, loading]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!loading && error?.toLowerCase().includes('cancelo')) {
        Alert.alert('El cliente cancelo el pedido');
        dispatch(removeShipmentFromList(shipment?.id || 0)); // remove shipment of list
        navigation.goBack();
      }
    }, [loading, error, navigation, dispatch]),
  );

  return (
    <ModalContainer removeTWF>
      <ScrollableContainer scrollEnabled={height <= 700}>
        <Row>
          <Title size={26}>¡Nuevo viaje!</Title>
          <RejectButton color={theme.error} onPress={onPressReject}>
            Rechazar
          </RejectButton>
        </Row>
        <Row>
          {shipment?.startPoint?.distance ? (
            <StaticInputField
              bold
              label="Distancia a inicio"
              style={{width: '49%'}}>
              {getDistanceIfKm(shipment?.startPoint?.distance)}
            </StaticInputField>
          ) : (
            <StaticInputField
              bold
              label="Distancia total"
              style={{width: '49%'}}>
              {getDistanceIfKm(totalDistance)}
            </StaticInputField>
          )}

          <StaticInputField bold label="Ganás" style={{width: '49%'}}>
            ${shipment?.price}
          </StaticInputField>
        </Row>
        <ContentContainer>
          <SmallMap
            markers={[
              shipment?.destinations?.[0]?.address,
              {
                ...getRotatedMarker(
                  Platform.select({
                    web: CAR_MARKER,
                    native: CarMarker,
                  }),
                  currentPosition?.coords?.bearing || 0,
                  40,
                ),
                ...(currentPosition?.coords || currentPosition),
              },
            ]}
          />
          <LocationsTitle>Ubicaciones</LocationsTitle>
          {shipment?.destinations?.length > 0 && (
            <ShipmentDestinationsSteps
              destinations={
                shipment?.destinations?.map((dest, index) =>
                  index > 0
                    ? {
                        ...dest,
                        address: {
                          ...dest.address,
                          name: (dest.address ? dest.address.name : dest.name)
                            ?.split(',')[1]
                            .trim(),
                        },
                      }
                    : dest.address
                    ? dest
                    : {address: dest},
                ) || []
              }
            />
          )}
        </ContentContainer>
      </ScrollableContainer>
      <ProgressTimeout onPressAccept={onPressAccept} />
    </ModalContainer>
  );
};
export default NewShipmentModalScreen;

const ModalContainer = styled(Screen)`
  padding: 20px;
`;

const RejectButton = styled(MainButton)`
  border-color: ${theme.error};
  border-width: 2px;
  background-color: transparent;
  padding: 10px 30px;
  color: white;
`;

const ScrollableContainer = styled.ScrollView`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const SmallMap = styled(Map)`
  height: ${({theme}) => theme.screenHeight * 0.2}px;
  min-height: 140px;
  width: 100%;
  border-radius: 20px;
  margin: 10px 0 20px;
`;

const LocationsTitle = styled(AppText)`
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 18px;
`;
