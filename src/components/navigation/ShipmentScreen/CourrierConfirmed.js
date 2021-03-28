import React, {useMemo} from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {LabeledImage} from 'components/ui/LabeledImage';
import {useSelector} from 'react-redux';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {StaticInputField} from 'components/ui/StaticInputField';
import dayjs from 'dayjs';
import {vehiculeSizeOptions} from 'constants/vehicleSizes';
import {SHIPMENT_STATE} from 'constants/shipmentStates';

export const CourrierConfirmed = (title) => () => {
  const {courrier, duration, distance, status, ...shipmentStatus} = useSelector(
    selectCurrentShipmentStatus,
  );

  const arrivalTime = useMemo(
    () => [
      dayjs(duration).format('HH:mm'),
      dayjs(duration).add(10, 'minute').format('HH:mm'),
    ],
    [duration],
  );

  return (
    <Container>
      <Title size={19}>{title}</Title>
      {status === SHIPMENT_STATE.COURRIER_CONFIRMED && (
        <AppText fontSize={13}>
          Esta yendo a la direccion de inicio a levantar el paquete
        </AppText>
      )}
      <Row>
        <LabeledImage
          source={{uri: 'https://randomuser.me/api/portraits/med/men/75.jpg'}}
          label={courrier?.name}
        />
        <StaticInputField label="Llegará entre las:">
          {arrivalTime.join(' - ')}
        </StaticInputField>
        <LabeledImage
          renderImage={() => {
            const item = vehiculeSizeOptions.find((i) => i.id === 2);
            return item?.renderIcon(50);
          }}
          label={`${
            courrier?.vehicle?.model
          } ${courrier?.vehicle?.number.toUpperCase()}`}
        />
      </Row>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 20px;
`;
