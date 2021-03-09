import React from 'react';
import {Container} from 'components/ui/Container';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useSelector} from 'react-redux';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';

export const ShipmentSecurityCode = () => {
  const status = useSelector(selectCurrentShipmentStatus);
  return (
    <Container>
      <AppText>Tu codigo de seguridad es:</AppText>
      <Code bold>{status?.secureCode}</Code>
    </Container>
  );
};

const Code = styled(AppText)`
  width: 100%;
  text-align: center;
  font-size: ${scaleDpTheme(25)};
  margin-top: ${scaleDpTheme(10)};
  margin-bottom: ${scaleDpTheme(20)};
`;
