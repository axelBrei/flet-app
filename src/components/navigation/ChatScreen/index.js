import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Screen from 'components/ui/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  addMessage,
  fetchConversation,
  selectConversationMessages,
  selectIsLoadingMessages,
  sendMessage,
} from 'redux-store/slices/chatSlice';
import {AppText} from 'components/ui/AppText';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {useUserData} from 'components/Hooks/useUserData';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import InputField from 'components/ui/InputField';
import {IconButton} from 'components/ui/IconButton';
import {CommonList} from 'components/ui/CommonList';
import {Loader} from 'components/ui/Loader';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import dayjs from 'dayjs';
import {applyShadow} from 'helpers/uiHelper';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingMessages);
  const messages = useSelector(selectConversationMessages);
  const {id: userId, isDriver, ...rest} = useUserData();
  const userShipment = useSelector(selectCurrentShipmentStatus);
  const driverShipment = useSelector(selectDriverShipmentData);
  const {id, courrier, user, ...shipment} = !isDriver
    ? userShipment
    : driverShipment[0];
  const [inputValue, setInputvalue] = useState('');

  const messageList = useMemo(() => messages.reverse(), [messages]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchConversation(id));
      const interval = setInterval(() => {
        dispatch(fetchConversation(id, true));
      }, 15 * 1000); // 15 seconds
      return () => {
        clearInterval(interval);
      };
    }, [id]),
  );

  const onPressSendMessage = useCallback(() => {
    dispatch(sendMessage(id, inputValue, userId));
    setInputvalue('');
  }, [dispatch, inputValue, id, userId]);

  return (
    <Screen removeTWF enableAvoidKeyboard>
      <Loader loading={isLoading}>
        <MessagesList
          inverted={1}
          data={messageList}
          renderItem={({item: m}) => {
            const isFromLoggedUser = (m.senderId || m.sender_id) === userId;
            return (
              <MessageContainer isFromLoggedUser={isFromLoggedUser}>
                <UserImage
                  source={
                    isFromLoggedUser
                      ? rest.picture
                      : {
                          uri:
                            user?.photoUrl ||
                            (isDriver
                              ? 'https://image.flaticon.com/icons/png/128/1077/1077012.png'
                              : 'https://image.flaticon.com/icons/png/128/3570/3570462.png'),
                        }
                  }
                />
                <InnerMessagesContainer>
                  <AppText bold textAlign={isFromLoggedUser ? 'right' : 'left'}>
                    {isFromLoggedUser
                      ? rest?.name
                      : isDriver
                      ? user?.name
                      : courrier?.name}
                  </AppText>
                  {m.message.map(innerMessage => (
                    <Messages {...m} isFromLoggedUser={isFromLoggedUser}>
                      {innerMessage}
                    </Messages>
                  ))}
                </InnerMessagesContainer>
                <AppText fontSize={11}>
                  {dayjs(m.timestamp).format('HH:MM')}
                </AppText>
              </MessageContainer>
            );
          }}
        />
        <Input
          label="Mensaje"
          onChangeText={setInputvalue}
          autoCapitalize="none"
          autoCorrect={false}
          value={inputValue}
          icon={''}
          containerStyle={{paddingRight: 5}}
          onSubmitEditing={onPressSendMessage}
          renderAccesory={() => (
            <IconButton
              onPress={onPressSendMessage}
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 23,
                paddingLeft: 12,
              }}
              iconColor={theme.primaryColor}
              backgroundColor={theme.primaryOpacity}
              icon={'send'}
              size={25}
            />
          )}
        />
      </Loader>
    </Screen>
  );
};
export default ChatScreen;

const MessagesList = styled(CommonList)`
  flex: 1;
`;

const MessageContainer = styled.View`
  flex-direction: ${({isFromLoggedUser}) =>
    isFromLoggedUser ? 'row-reverse' : 'row'};
  background-color: ${theme.grayBackground};
  box-shadow: 1px 1px 6px ${theme.shadowColor};
  margin: 10px 20px;
  padding: 15px;
  border-radius: 15px;
`;
MessageContainer.defaultProps = applyShadow();

const UserImage = styled.Image`
  height: 45px;
  width: 45px;
  border-radius: 23px;
  margin: 0 10px;
`;

const InnerMessagesContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const Messages = styled(AppText)`
  color: ${props => (props.confirmed ? theme.fontColor : theme.error)};
  padding: 3px 0;
  text-align: ${({isFromLoggedUser}) => (!isFromLoggedUser ? 'left' : 'right')};
`;

const Input = styled(InputField)`
  align-self: center;
  width: 95%;
`;
