import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';

export const ShipmentDetailInformation = ({shipment}) => {
  const {destinations, helpNeeded} = shipment;
  return (
    <>
      <Title>Detalle del envío</Title>
      <Label>
        Monto a cobrar: <Value>${shipment?.price}</Value>
      </Label>
      <Label>
        Paquete entregado en:{' '}
        <Value>
          {destinations[destinations.length - 1]?.address?.name.split(',')[0]}
        </Value>
      </Label>
      <Label>
        Requiere ayuda: <Value>{helpNeeded ? 'Sí' : 'No'}</Value>
      </Label>

      <AlertContainer>
        <Icon name="alert-outline" size={40} color={theme.white} />
        <Text>
          {
            'Recordá que si el pago es en efectivo es tu\nresponsabilidad reclamarlo'
          }
        </Text>
      </AlertContainer>
    </>
  );
};

const Label = styled(AppText)`
  padding: 5px 0;
`;

const Value = styled(AppText)`
  color: ${theme.primaryColor};
  font-weight: bold;
`;

const AlertContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${theme.primaryDarkColor};
  padding: 10px;
  border-radius: 12px;
  box-shadow: 1px 1px 6px ${theme.shadowColor};
  margin: 20px 0 0;
`;

const Text = styled(AppText)`
  font-size: 12px;
  font-weight: bold;
  color: ${theme.white};
  margin-left: 10px;
  align-self: center;
`;
