import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {Row} from 'components/ui/Row';
import {useSelector} from 'react-redux';
import {
  selectLoadingShipmentPrice,
  selectNewShipmentPrice,
  selectShipmentPriceError,
} from 'redux-store/slices/newShipmentSlice';
import {Title} from 'components/ui/Title';
import {DebtModal} from 'components/navigation/NewShipmentConfirmationScreen/DebtModal';

export const ShipmentPrice = () => {
  const loadingPrice = useSelector(selectLoadingShipmentPrice);
  const priceError = useSelector(selectShipmentPriceError);
  const currentPrice = useSelector(selectNewShipmentPrice);

  return (
    <Container>
      <Title textAlign="right">Costo total:</Title>
      {loadingPrice ? (
        <Loader color={theme.primaryColor} size="small" />
      ) : priceError ? (
        <AppText bold color={theme.error}>
          Error
        </AppText>
      ) : (
        <Title>${currentPrice}</Title>
      )}
      <DebtModal />
    </Container>
  );
};

const Container = styled(Row)`
  align-self: center;
  padding: 10px 20px;
  margin-bottom: 0;
  align-items: center;
  border-radius: 20px;
  background-color: ${theme.grayBackground};
`;

const Loader = styled.ActivityIndicator`
  margin-left: 10px;
`;
