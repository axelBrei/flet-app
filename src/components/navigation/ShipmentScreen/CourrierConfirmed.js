import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {LabeledImage} from 'components/ui/LabeledImage';
import {useSelector} from 'react-redux';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {StaticInputField} from 'components/ui/StaticInputField';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import {vehiculeSizeOptions} from 'constants/vehicleSizes';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {IconButton} from 'components/ui/IconButton';
import {CenteredRow} from 'components/ui/Row';
import {Icon} from 'components/ui/Icon';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';
import {selectIsPendingChatMessages} from 'redux-store/slices/chatSlice';

export const CourrierConfirmed =
  (title, message = null, hideArraiveIn = false) =>
  () => {
    const navigation = useNavigation();
    const unreadedMessages = useSelector(selectIsPendingChatMessages);
    const {courrier, status, addresses, currentDestination, ...shipmentStatus} =
      useSelector(selectCurrentShipmentStatus);
    const item = vehiculeSizeOptions.find(i => i.id === 2);

    const origin = useMemo(() => {
      const destinationIndex = addresses?.findIndex(
        i => i.id === currentDestination,
      );
      if (!destinationIndex || destinationIndex < 0) return {};
      if (status === SHIPMENT_STATE.COURRIER_CONFIRMED) {
        return addresses[destinationIndex - 1];
      }
      return addresses[destinationIndex];
    }, [currentDestination, addresses]);
    const {duration = 0, arrivalDate, arrival_date} = origin;

    const arrivalTime = useMemo(() => {
      if (origin) {
        const date = dayjs(arrival_date || arrivalDate);
        return [date.format('HH:mm'), date.add(10, 'minute').format('HH:mm')];
      }
      return [];
    }, [origin]);

    const onPressChat = useCallback(() => {
      navigation.navigate(routes.chatScreen);
    }, [navigation]);

    return (
      <Container>
        <Title size={19}>{title}</Title>
        {message && <AppText fontSize={13}>{message}</AppText>}
        {!hideArraiveIn && Number.isInteger(duration) && (
          <CenteredRow>
            <StaticField label="Llegará entre las:">
              {arrivalTime.join(' - ')}
            </StaticField>
            {status === SHIPMENT_STATE.COURRIER_CONFIRMED ? (
              <ChatButton onPress={onPressChat}>
                {unreadedMessages && <ChatBullet />}
                <Icon
                  name={'message-text'}
                  size={30}
                  color={theme.primaryColor}
                />
              </ChatButton>
            ) : (
              <></>
            )}
          </CenteredRow>
        )}
        <Row>
          <Image source={{uri: courrier?.photoUrl}} />
          <ShipmentDataContainer>
            <AppText>Conductor</AppText>
            <AppText bold>{courrier?.name}</AppText>
          </ShipmentDataContainer>
        </Row>
        <Row>
          <IconBackground>{item?.renderIcon(50)}</IconBackground>
          <ShipmentDataContainer>
            <AppText>Vehículo</AppText>
            <AppText>{`${
              courrier?.vehicle?.model
            } ${courrier?.vehicle?.number.toUpperCase()}`}</AppText>
          </ShipmentDataContainer>
        </Row>
      </Container>
    );
  };

const Container = styled.View`
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const IconBackground = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: ${theme.primaryLightColor};
  align-items: center;
  justify-content: center;
`;

const ShipmentDataContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
  justify-content: center;
`;

const StaticField = styled(StaticInputField)`
  margin: 10px 0;
  margin-right: 20px;
  flex: 1;
`;

const ChatButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${theme.primaryOpacity};
  align-items: center;
  justify-content: center;
`;

const ChatBullet = styled.View`
  height: 12px;
  width: 12px;
  background-color: red;
  position: absolute;
  border-radius: 6px;
  z-index: 2;
  top: 2px;
  right: 0;
`;
