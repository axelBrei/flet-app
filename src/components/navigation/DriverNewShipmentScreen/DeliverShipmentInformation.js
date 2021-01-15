import React from 'react';
import styled from 'styled-components';
import {MainButton} from 'components/ui/MainButton';
import {UserSelectionTextField} from 'components/ui/UserSelectionTextField';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {Container} from 'components/ui/Container';
import {useSelector} from 'react-redux';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';

export const DeliverShipmentInformation = () => {
  const shipmentData = useSelector(selectDriverShipmentData);
  return (
    <ContentContainer>
      <UserSelectionTextField
        label="Entregar paquete en"
        icon="package-variant-closed"
        value={shipmentData?.endPoint?.address}
      />
      <AppText padding={`${scaleDpTheme(5)} 0`}>
        Pago:{' '}
        <AppText bold color={theme.primaryDarkColor}>
          {shipmentData?.paymentMode}
        </AppText>
      </AppText>
      <DisclaimerContainer>
        <Icon
          name="information-outline"
          color={theme.primaryDarkColor}
          size={scaleDp(20)}
        />
        <AppText padding={scaleDp(5)}>
          Si el pago es en efectivo recordá reclamarlo
        </AppText>
      </DisclaimerContainer>
      <Button label="Finalizar entrega" leftIcon="check-circle-outline" />
    </ContentContainer>
  );
};

const ContentContainer = styled(Container)`
  padding: ${scaleDpTheme(15)} ${scaleDpTheme(25)};
  padding-bottom: 0;
  align-items: center;
  width: 100%;
`;

const DisclaimerContainer = styled(Container)`
  padding-top: ${scaleDpTheme(15)};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.theme.screenWidth}px;
`;

const Button = styled(MainButton)`
  margin: ${scaleDpTheme(15)} 0;
`;