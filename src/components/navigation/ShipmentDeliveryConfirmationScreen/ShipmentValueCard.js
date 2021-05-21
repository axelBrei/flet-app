import React from 'react';
import styled from 'styled-components';
import {IconCard} from 'components/ui/IconCard';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {WarningMessage} from 'components/ui/WarningMessage';
import MoneyImage from 'resources/images/salary.svg';
import {useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  selectShipmentPrice,
} from 'redux-store/slices/driverShipmentSlice';

export const ShipmentValueCard = ({shipment}) => {
  const price = shipment?.price || '';
  return (
    <IconCard
      imageBackground={theme.primaryLightColor}
      backgroundColor={theme.primaryDarkColor}
      reverse
      reduced
      renderImage={size => <MoneyImage width={size - 20} height={size - 20} />}>
      <Title alternative>Monto a cobrar</Title>
      <ValueContainer>
        <AppText bold alternative>
          ${price}
        </AppText>
      </ValueContainer>
      <WarningMessage message="Si el pago es en efectivo recordá reclamarlo" />
    </IconCard>
  );
};

const ValueContainer = styled.View`
  padding: 5px 10px;
  background-color: ${theme.primaryLightColor};
  border-radius: 20px;
`;
