import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {theme} from 'constants/theme';
import {useNavigation} from '@react-navigation/native';
import {LayoutAnimation} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  cancelShipment,
  selectCurrentShipmentStatus,
  selectIsLoadingCancelShipment,
} from 'redux-store/slices/shipmentSlice';
import {getCardContentComponent} from 'components/navigation/ShipmentScreen/shipmentHelper';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {routes} from 'constants/config/routes';
import {LabelIconButton} from 'components/ui/LabelIconButton';

export const ShipmentDetailCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);
  const isLoadingCancel = useSelector(selectIsLoadingCancelShipment);

  useEffect(() => {
    if (shipmentStatus?.status === SHIPMENT_STATE.FINISHED) {
      navigation.navigate(routes.shipmentFinishedScreen);
    }
  }, [shipmentStatus]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [shipmentStatus]);

  const onPressHaveAProblem = useCallback(() => {}, []);

  const onPressCancel = useCallback(() => {
    dispatch(cancelShipment());
    navigation.popToTop();
  }, [navigation]);

  const Component = getCardContentComponent(
    shipmentStatus?.status || SHIPMENT_STATE.PENDING_COURRIER,
  );

  return (
    <Card>
      {Component && <Component />}
      <ButtonContainer>
        <LabelIconButton
          icon="alert-circle"
          label={'Tengo un\nproblema'}
          onPress={onPressHaveAProblem}
        />
        {shipmentStatus?.status !== SHIPMENT_STATE.DELIVERED && (
          <LabelIconButton
            loading={isLoadingCancel}
            onPress={onPressCancel}
            icon="close"
            label="Cancelar"
            backgroundColor={theme.cancel}
            fontColor={theme.white}
          />
        )}
      </ButtonContainer>
    </Card>
  );
};

const Card = styled(Container)`
  width: 100%;
  align-items: flex-start;
  padding: 30px 20px 20px;
`;
const ButtonContainer = styled(Container)`
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 25px;
`;
