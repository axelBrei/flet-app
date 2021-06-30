import React, {useEffect, useCallback, useMemo} from 'react';
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
import StepsWithLoader from 'components/ui/StepsWithLoader';
import {AppText} from 'components/ui/AppText';
import {selectIsPendingChatMessages} from 'redux-store/slices/chatSlice';

const stepsIndexMapping = {
  [SHIPMENT_STATE.PENDING_COURRIER]: -1,
  [SHIPMENT_STATE.COURRIER_CONFIRMED]: 0,
  [SHIPMENT_STATE.WAITING_ORIGIN]: 1,
  [SHIPMENT_STATE.ON_PROCESS]: 2,
  [SHIPMENT_STATE.WAITING_PACKAGE]: 3,
  [SHIPMENT_STATE.DELIVERED]: 3,
};

const BASE_STEPS = [
  SHIPMENT_STATE.PENDING_COURRIER,
  SHIPMENT_STATE.COURRIER_CONFIRMED,
  SHIPMENT_STATE.WAITING_ORIGIN,
  SHIPMENT_STATE.ON_PROCESS,
  SHIPMENT_STATE.DELIVERED,
];

const CANCELABLE_STATUS = [
  SHIPMENT_STATE.PENDING_COURRIER,
  SHIPMENT_STATE.COURRIER_CONFIRMED,
];

export const ShipmentDetailCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const shipmentStatus = useSelector(selectCurrentShipmentStatus) || {};
  const isLoadingCancel = useSelector(selectIsLoadingCancelShipment);
  const pendingMessages = useSelector(selectIsPendingChatMessages);
  const currentAddresIndex = shipmentStatus?.addresses?.findIndex(
    a => a?.id === shipmentStatus.currentDestination,
  );
  const currentAddress = shipmentStatus?.addresses?.[currentAddresIndex];

  useEffect(() => {
    if (shipmentStatus?.status === SHIPMENT_STATE.FINISHED) {
      navigation.navigate(routes.shipmentFinishedScreen, {
        shipment: shipmentStatus,
      });
    }
  }, [shipmentStatus]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [shipmentStatus]);

  const onPressHaveAProblem = useCallback(() => {}, []);

  const onPressCancel = useCallback(() => {
    dispatch(cancelShipment());
  }, [navigation]);

  const Component = useMemo(
    () =>
      getCardContentComponent(
        shipmentStatus?.status || SHIPMENT_STATE.PENDING_COURRIER,
        [
          SHIPMENT_STATE.COURRIER_CONFIRMED,
          SHIPMENT_STATE.WAITING_ORIGIN,
        ].includes(shipmentStatus?.status)
          ? shipmentStatus?.addresses?.[currentAddresIndex - 1]?.address?.name
          : currentAddress?.address?.name,
      ),
    [shipmentStatus, currentAddress],
  );

  const steps = useMemo(
    () =>
      new Array(
        BASE_STEPS.length + (shipmentStatus?.addresses?.length > 2 ? 2 : 0),
      )
        .fill(null)
        .map((a, index) => ({
          id: index,
          title: 'test',
        })),
    [shipmentStatus],
  );

  const getCurrentStepFromState = useCallback(() => {
    const baseIndex = currentAddresIndex > 1 ? BASE_STEPS.length - 3 : 0;
    const stateIndex = stepsIndexMapping[shipmentStatus?.status];
    if (stateIndex !== undefined) {
      return baseIndex + stateIndex;
    }

    return (
      baseIndex +
      shipmentStatus.addresses?.findIndex(
        a => a?.id === shipmentStatus.currentDestination,
      )
    );
  }, [steps, shipmentStatus]);

  const onPressChat = useCallback(() => {
    navigation.navigate(routes.chatScreen);
  }, [navigation]);

  return (
    <Card>
      <StepsWithLoader steps={steps} currentStep={getCurrentStepFromState()} />
      {Component && <Component />}
      <ButtonContainer>
        <LabelIconButton
          icon="alert-circle"
          label={'Tengo un\nproblema'}
          onPress={onPressHaveAProblem}
        />
        {CANCELABLE_STATUS.includes(shipmentStatus?.status) ? (
          <LabelIconButton
            loading={isLoadingCancel}
            onPress={onPressCancel}
            icon="close"
            label="Cancelar"
            backgroundColor={theme.cancel}
            fontColor={theme.white}
          />
        ) : (
          <MessageContainer>
            <LabelIconButton
              onPress={onPressChat}
              icon="message-text"
              label="Abrir chat"
              backgroundColor={theme.primaryOpacity}
              fontColor={theme.primaryDarkColor}
            />
            {pendingMessages && <ChatBullet />}
          </MessageContainer>
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

const MessageContainer = styled.View``;

const ChatBullet = styled.View`
  height: 10px;
  width: 10px;
  position: absolute;
  top: 17px;
  left: 34px;
  background-color: ${theme.error};
  border-radius: 7px;
`;
