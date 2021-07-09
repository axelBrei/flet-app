import React, {useCallback, useEffect, useState} from 'react';
import Config from 'react-native-config';
import {
  handleNewToken,
  useNotificationHandler,
} from 'components/Contexts/NotificationContext/handler';
import {useUserData} from 'components/Hooks/useUserData';

export default ({children}) => {
  const userData = useUserData();
  const [currentToken, setCurrentToken] = useState(null);
  const handleNotification = useNotificationHandler();

  const getToken = useCallback(async () => {
    try {
      const token = await firebase.messaging()?.getToken({
        vapidKey: Config.REACT_APP_VAPID_KEY,
      });
      setCurrentToken(token);
      handleNewToken(token);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (!!currentToken && userData?.id) {
      if (typeof messaging === 'function') {
        messaging().navigator.serviceWorker.addEventListener(
          'message',
          message => {
            console.log('new message');
            const notification = {data: message.data?.data};
            handleNotification(false)(notification);
          },
        );
      } else {
        firebase.messaging().onMessage(message => {
          const notification = {data: message?.data};
          console.log('new message', notification);
          handleNotification(false)(notification);
        });
      }
    }
  }, [currentToken, userData]);

  return <>{children}</>;
};
