import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {MainButton} from 'components/ui/MainButton';
import {UserSelectionTextField} from 'components/ui/UserSelectionTextField';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  setPickedUp,
} from 'redux-store/slices/driverShipmentSlice';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';

export const PickupShipment = () => {
  const dispatch = useDispatch();
  const shipmentData = useSelector(selectDriverShipmentData);

  const onPressButton = useCallback(() => {
    dispatch(setPickedUp());
  }, [dispatch]);

  return (
    <ContentContainer>
      <UserSelectionTextField
        label="Retirar paquete en"
        icon="package-variant-closed"
        value={shipmentData?.endPoint?.address}
      />
      <Container dir="row">
        <AppText padding={`0 ${scaleDp(5)}`}>Información adicional:</AppText>
        <AppText bold>{shipmentData?.endPoint?.extraInfo}</AppText>
      </Container>
      <Button
        onPress={onPressButton}
        label="Paquete recogido"
        leftIcon="check-circle-outline"
        iconColor={theme.fontColor}
      />
    </ContentContainer>
  );
};

const ContentContainer = styled(Container)`
  width: 100%;
  padding: ${scaleDpTheme(15)} ${scaleDpTheme(25)};
`;

const Button = styled(MainButton)`
  align-self: center;
  margin-top: ${scaleDpTheme(15)};
`;
