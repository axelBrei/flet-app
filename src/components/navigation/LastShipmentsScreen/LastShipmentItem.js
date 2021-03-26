import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import dayjs from 'dayjs';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {Row} from 'components/ui/Row';
import {SHIPMENT_STATE} from 'constants/shipmentStates';

const {
  PENDING_COURRIER,
  ON_PROCESS,
  COURRIER_CONFIRMED,
  FINISHED,
  NEW,
  CANCELLED,
  DELIVERED,
} = SHIPMENT_STATE;

const getStatusColor = (status) => {
  if (status === FINISHED) {
    return theme.online;
  }
  if ([PENDING_COURRIER, COURRIER_CONFIRMED, ON_PROCESS].includes(status)) {
    return theme.primaryDarkColor;
  }
  if (status === CANCELLED) {
    return theme.error;
  }
  return theme.start;
};

const getStatusText = (status) => {
  if (status === FINISHED) return 'Terminado';
  if (status === CANCELLED) return 'Cancelado';
  if ([PENDING_COURRIER, COURRIER_CONFIRMED, ON_PROCESS].includes(status)) {
    return 'Pendiente';
  }
  if (status === NEW) return 'Nuevo';
  if (status === DELIVERED) return 'Entregado';
};

export const LastShipmentItem = ({
  price,
  status,
  package: p,
  createdAt,
  startPoint,
  endPoint,
  ...rest
}) => {
  const date = createdAt ? dayjs(createdAt) : dayjs();
  return (
    <Container>
      <Row disablePadding>
        <ShipmentDate>{date.format('DD/MM/YYYY[-]HH:mm[ Hs.]')}</ShipmentDate>
        <StatusContainer>
          <AppText bold color={getStatusColor(status)}>
            {getStatusText(status)}
          </AppText>
        </StatusContainer>
      </Row>
      <AppText padding="10px 1">
        Descripción del paquete: <AppText bold>{p?.description}</AppText>
      </AppText>
      <AppText>
        Desde: <AppText bold>{startPoint?.name.split(',')?.[0]}</AppText>
      </AppText>
      <AppText>
        Hasta: <AppText bold>{endPoint?.name.split(',')?.[0]}</AppText>
      </AppText>
      <AppText textAlign="right">
        Valor total: <PriceText>${price}</PriceText>
      </AppText>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 20px 10px;
  margin: 10px 0;
  border-bottom-width: 0.5px;
  border-color: ${theme.lightGray};
`;

const ShipmentDate = styled(Title)`
  color: ${theme.primaryDarkColor};
  padding: 10px 0;
  margin-bottom: 0;
  border-radius: 20px;
  overflow: hidden;
`;

const PriceText = styled(AppText)`
  font-size: 16px;
  color: ${theme.fontColor};
  font-weight: bold;
  padding: 0 10px;
  text-align: right;
`;

const StatusContainer = styled.View`
  background-color: ${theme.grayBackground};
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  overflow: hidden;
  height: 45px;
  align-items: center;
  justify-content: center;
`;
