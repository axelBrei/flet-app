import React, {useCallback, useMemo} from 'react';
import {Title} from 'components/ui/Title';
import {StaticInputField} from 'components/ui/StaticInputField';
import {useSelector} from 'react-redux';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {Row} from 'components/ui/Row';
import dayjs from 'dayjs';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';
import {selectIsPendingChatMessages} from 'redux-store/slices/chatSlice';

const {WAITING_ORIGIN, ON_PROCESS} = SHIPMENT_STATE;
export const ShipmentStagesDescriptor = (destination, status) => () => {
  const navigation = useNavigation();
  const unreadedMessages = useSelector(selectIsPendingChatMessages);
  const {duration, distance, address, arrivalDate, ...rest} = destination || {};

  const arrivalTime = useMemo(() => {
    const time = dayjs(arrivalDate);
    return `${time.format('HH:mm')} - ${time
      .add(10, 'minute')
      .format('HH:mm')}`;
  }, [arrivalDate]);

  const getTitle = useCallback(() => {
    if (status === WAITING_ORIGIN) return 'Esperando paquete';
    else if (status === ON_PROCESS) return 'LLevando paquete';
    return 'Buscando paquete';
  }, [status]);

  const getSubtitle = useCallback(() => {
    if (status === WAITING_ORIGIN) return 'Próximo destino';
    else if (status === ON_PROCESS) return 'Llevar paquete a';
    return 'Se encuentra en';
  }, [status]);

  const onPressChat = useCallback(() => {
    navigation.navigate(routes.chatScreen);
  }, [navigation]);

  return (
    <>
      <Title>{getTitle()}</Title>
      <Row>
        <StaticInput label={getSubtitle()}>
          {address?.name.split(',')?.[0]}
        </StaticInput>
        <ChatButton onPress={onPressChat}>
          {unreadedMessages && <ChatBullet />}
          <Icon name={'message-text'} size={30} color={theme.primaryColor} />
        </ChatButton>
      </Row>
      <Row>
        <StaticInputField style={{width: '48%'}} label="Distancia">
          {Math.round(distance / 1000)} Km
        </StaticInputField>
        <StaticInputField style={{width: '48%'}} label="Llegas a las">
          {arrivalTime} Hs.
        </StaticInputField>
      </Row>
    </>
  );
};

const ChatButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${theme.primaryOpacity};
  align-items: center;
  justify-content: center;
`;

const StaticInput = styled(StaticInputField)`
  flex: 1;
  margin-right: 20px;
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
