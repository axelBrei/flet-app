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

export const CourrierConfirmed = (title, message = null) => () => {
  const {
    courrier,
    status,
    addresses,
    currentDestination,
    ...shipmentStatus
  } = useSelector(selectCurrentShipmentStatus);
  const item = vehiculeSizeOptions.find(i => i.id === 2);

  const [origin] = useMemo(() => {
    const destinationIndex = addresses?.findIndex(
      i => i.id === currentDestination,
    );
    if (!destinationIndex || destinationIndex < 0) return [{}, {}];
    return [addresses[destinationIndex - 1], addresses[destinationIndex]];
  }, [currentDestination, addresses]);

  const arrivalTime = useMemo(() => {
    if (origin) {
      const {duration, arrivalDate, arrival_date} = origin;
      const date = dayjs(arrival_date || arrivalDate).add(duration, 's');
      return [date.format('HH:mm'), date.add(10, 'minute').format('HH:mm')];
    }
    return [];
  }, [origin]);

  return (
    <Container>
      <Title size={19}>{title}</Title>
      {message && <AppText fontSize={13}>{message}</AppText>}
      {duration && (
        <StaticField label="Llegará entre las:">
          {arrivalTime.join(' - ')}
        </StaticField>
      )}
      <Row>
        <Image source={{uri: courrier?.photoUrl}} />
        <ShipmentDataContainer>
          <AppText>Conductor</AppText>
          <AppText bold>{courrier?.name}</AppText>
        </ShipmentDataContainer>
      </Row>
      <Row>
        <IconBackground>{item?.renderIcon(50)}</IconBackground>
        <ShipmentDataContainer>
          <AppText>Vehículo</AppText>
          <AppText>{`${
            courrier?.vehicle?.model
          } ${courrier?.vehicle?.number.toUpperCase()}`}</AppText>
        </ShipmentDataContainer>
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
  justify-content: flex-start;
  padding-top: 20px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const IconBackground = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: ${theme.primaryLightColor};
  align-items: center;
  justify-content: center;
`;

const ShipmentDataContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
`;

const StaticField = styled(StaticInputField)`
  margin: 10px 0;
`;
