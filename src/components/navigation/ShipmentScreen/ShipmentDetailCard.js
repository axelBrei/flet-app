import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {TextLink} from 'components/ui/TextLink';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AssignedDriverProfile} from 'components/navigation/ShipmentScreen/AssignedDriverProfile';
import {theme} from 'constants/theme';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  cancelShipment,
  selectCurrentShipmentStatus,
} from 'redux-store/slices/shipmentSlice';
import {getCardContentComponent} from 'components/navigation/ShipmentScreen/shipmentHelper';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {routes} from 'constants/config/routes';

export const ShipmentDetailCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);

  useEffect(() => {
    if (shipmentStatus?.status === SHIPMENT_STATE.FINISHED) {
      navigation.navigate(routes.shipmentFinishedScreen);
    }
  }, [shipmentStatus]);

  const onPressHaveAProblem = useCallback(() => {}, []);

  const onPressCancel = useCallback(() => {
    dispatch(cancelShipment());
    navigation.popToTop();
  }, [navigation]);

  const Component = getCardContentComponent(shipmentStatus?.status);

  return (
    <Card>
      <ButtonContainer>
        {shipmentStatus?.status && <Component />}
        <MainButton
          label="Tengo un problema"
          inverted
          onPress={onPressHaveAProblem}
        />
        <TextLink fontSize={12} color={theme.error} onPress={onPressCancel}>
          Cancelar Pedido
        </TextLink>
      </ButtonContainer>
    </Card>
  );
};

const Card = styled(Container)`
  width: ${(props) =>
    props.theme.isMobile ? `${props.theme.screenWidth}px` : '100%'};
  align-items: flex-start;
`;
const ButtonContainer = styled(Container)`
  width: 100%;
  margin-top: ${scaleDpTheme(30)};
  align-items: center;
  justify-content: center;
`;
