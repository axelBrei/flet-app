import React from 'react';
import {Container} from 'components/ui/Container';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {useSelector} from 'react-redux';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';

export const ShipmentSecurityCode = address => () => {
  const status = useSelector(selectCurrentShipmentStatus);
  return (
    <>
      <TitleContainer>
        <CardTitle>El conductor llego a</CardTitle>
        <AddressText>{address}</AddressText>
      </TitleContainer>
      <AppText fontSize={12}>
        Mostrále este código para confirmar la entrega
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

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const CardTitle = styled(Title)`
  font-size: 18px;
  margin-bottom: 0;
`;

const AddressText = styled(AppText)`
  background-color: ${theme.primaryColor};
  color: ${theme.white};
  font-weight: bold;
  padding: 0 5px;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 5px;
`;
