import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {ActivityIndicator, Platform} from 'react-native';
import {MainButton} from 'components/ui/MainButton';
import {theme} from 'constants/theme';
import {useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  selectLoadingPendingShipmentAnswer,
  selectPendingShipmentAnswerError,
} from 'redux-store/slices/driverShipmentSlice';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';
import {IconCard} from 'components/ui/IconCard';
import PackageImage from 'resources/images/open-box.svg';
import DestinationImage from 'resources/images/destination-pin.svg';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';
import {useModalContext} from 'components/Hooks/useModal';
import dayjs from 'dayjs';
import {SHIPMENT_STATE} from 'constants/shipmentStates';

const strings = {
  newTrip: '¡Nuevo viaje!',
  distance: 'Distancia: ',
  dropZone: 'Zona de entrega: ',
  disclaimer: 'Recorda avisarnos cuando tengas\nel paquete en tus manos',
  reject: 'Rechazar',
};

const getDistanceIfKm = distance => {
  if (distance > 999) {
    return `${(distance / 1000).toString().substring(0, 4)} Km.`;
  }
  return `${distance} Mts.`;
};

export const NewTripModalContent = ({
  distance,
  dropZone,
  onPressAccept,
  onPressReject,
}) => {
  const [submited, setSubmited] = useState(false);
  const shipments = useSelector(selectDriverShipmentData);
  const loading = useSelector(selectLoadingPendingShipmentAnswer);
  const error = useSelector(selectPendingShipmentAnswerError);
  const {closeModal} = useModalContext();
  const shipment = shipments.find(
    s => s.status === SHIPMENT_STATE.PENDING_COURRIER,
  );
  console.log(shipment);

  useEffect(() => {
    if (submited && !loading) {
      if (error) {
      } else {
        closeModal();
      }
    }
  }, [submited, loading, error, closeModal]);

  const onPressResponse = useCallback(
    action => () => {
      action?.();
      setSubmited(true);
    },
    [],
  );

  const arrivalTime = useMemo(() => {
    const time = dayjs().add(shipment?.destinations?.[0]?.duration || 0, 's');
    return `${time.format('HH:mm')} - ${time
      .add(10, 'minute')
      .format('HH:mm')}`;
  }, [shipment]);

  const destinationTime = useMemo(() => {
    const arrivalTime = dayjs().add(
      shipment?.addresses?.[0]?.duration || 0,
      's',
    );
    const destinationTime = arrivalTime.add(
      shipment?.addresses?.[1]?.duration || 0,
      's',
    );
    return `${destinationTime.format('HH:mm')} - ${destinationTime
      .add(10, 'minute')
      .format('HH:mm')}`;
  }, [shipment]);

  return (
    <Container>
      <Title width="100%">¡Nuevo viaje!</Title>
      <Row>
        {distance > 0 && (
          <StaticInputField bold label="Distancia" style={{width: '45%'}}>
            {getDistanceIfKm(distance)}
          </StaticInputField>
        )}
        <StaticInputField
          bold
          label="Llegas a las"
          style={{width: distance > 0 ? '45%' : '100%'}}>
          {arrivalTime}
        </StaticInputField>
      </Row>
      <IconCard
        reverse
        reduced
        renderImage={size => (
          <PackageImage height={size - 20} width={size - 20} />
        )}>
        <Title alternative>Paquete</Title>
        <RowWithBoldData
          numberOfLines={1}
          label="Desc."
          data={shipment?.package?.description}
        />
      </IconCard>
      <IconCard
        reverse
        reduced
        renderImage={size => (
          <DestinationImage height={size - 25} width={size - 25} />
        )}>
        <Title alternative>Destino</Title>
        <RowWithBoldData
          label="Zona"
          data={
            shipment?.addresses[
              shipment.addresses.length - 1
            ]?.address?.name.split(', ')[2]
          }
        />
        <RowWithBoldData label="Llegada" data={destinationTime} />
      </IconCard>
      {loading ? (
        <ActivityIndicator
          animating
          style={{marginVertical: 12}}
          color={theme.primaryColor}
          size={Platform.OS === 'ios' ? 'large' : 50}
        />
      ) : (
        <Row>
          <Button
            backgroundColor={theme.cancel}
            onPress={onPressResponse(onPressReject)}>
            Cancelar
          </Button>
          <Button
            backgroundColor={theme.online}
            onPress={onPressResponse(onPressAccept)}>
            Aceptar
          </Button>
        </Row>
      )}
    </Container>
  );
};

NewTripModalContent.defaultProps = {
  onPressAccept: () => {},
  onPressReject: () => {},
};

const Container = styled.View`
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

const Button = styled(MainButton)`
  background-color: ${props => props.backgroundColor};
  padding: 10px;
  width: 45%;
  margin-top: 10px;
`;
