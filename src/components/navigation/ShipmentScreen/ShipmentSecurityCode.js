import React from 'react';
import {Container} from 'components/ui/Container';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useSelector} from 'react-redux';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';

export const ShipmentSecurityCode = () => {
  const status = useSelector(selectCurrentShipmentStatus);
  return (
    <>
      <Title size={18}>El conductor ha llegado a la direccion de entrega</Title>
      <AppText fontSize={12}>
        Muéstrale este código para que te entregue el pedido
      </AppText>
      <CodeContainer>
        <StaticInputField
          textAlign="center"
          bold
          fontSize={24}
          label="Codigo de seguridad">
          {status?.secureCode}
        </StaticInputField>
      </CodeContainer>
    </>
  );
};

const CodeContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px 0 0;
`;
