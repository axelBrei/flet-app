import React from 'react';
import {AppText} from 'components/ui/AppText';
import {AssignedDriverProfile} from 'components/navigation/ShipmentScreen/AssignedDriverProfile';
import {Container} from 'components/ui/Container';
import {theme} from 'constants/theme';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useSelector} from 'react-redux';
import {
  selectCurrentShipment,
  selectCurrentShipmentStatus,
} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';

export const CourrierDelivering = () => {
  const shipment = useSelector(selectCurrentShipment);
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);
  const goingToPickUp = shipmentStatus === SHIPMENT_STATE.COURRIER_CONFIRMED;

  return (
    <Container>
      <Title>¡Gracias por elegirnos!</Title>
      <AppText>Tu conductor asignado es:</AppText>
      <AssignedDriverProfile />
      <Container>
        <ShipmentDataText>
          Tiempo estimado de llegada{' '}
          <AppText color={theme.primaryDarkColor}>
            {shipmentStatus.duration} min.
          </AppText>
        </ShipmentDataText>
        <ShipmentDataText>
          Costo total{' '}
          <AppText color={theme.primaryDarkColor}>${shipment.price}</AppText>
        </ShipmentDataText>
        <ShipmentDataText>
          Valor asegurado{' '}
          <AppText color={theme.primaryDarkColor}>
            ${shipment.insuranceAmount}
          </AppText>
        </ShipmentDataText>
      </Container>
    </Container>
  );
};

const Title = styled(AppText)`
  margin: ${scaleDpTheme(10)} 0;
  font-weight: bold;
  font-size: ${scaleDpTheme(18)};
`;

const ShipmentDataText = styled(AppText)`
  padding: ${scaleDpTheme(7)} 0;
`;
