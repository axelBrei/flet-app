import React from 'react';
import {Container} from 'components/ui/Container';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useSelector} from 'react-redux';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {theme} from 'constants/theme';

export const ShipmentSecurityCode = () => {
  const status = useSelector(selectCurrentShipmentStatus);
  return (
    <Container width="100%">
      <AppText width="100%" textAlign="center">
        Tu codigo de seguridad es:
      </AppText>
      <Code bold>{status?.secureCode}</Code>
      <Disclaimer>
        Dale este codigo al conductor para que te pueda entregar el paquete
      </Disclaimer>
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

const Disclaimer = styled(AppText)`
  font-size: ${scaleDpTheme(12)};
  color: ${theme.backdropColor};
  text-align: center;
  width: 100%;
  margin-bottom: ${scaleDpTheme(10)};
`;
