import React, {useCallback, useEffect, useState} from 'react';
import firebase from 'services/FirebaseWebService';
import Config from 'react-native-config';
import {
  handleNewToken,
  useNotificationHandler,
} from 'components/Contexts/NotificationContext/handler';
import {useUserData} from 'components/Hooks/useUserData';

export default ({children}) => {
  const userData = useUserData();
  const [hasPermission, setHaspermission] = useState(false);
  const handleNotification = useNotificationHandler();

  const getToken = useCallback(async () => {
    try {
      const token = await firebase.messaging()?.getToken({
        vapidKey: Config.REACT_APP_VAPID_KEY,
      });
      setHaspermission(true);
      handleNewToken(token);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (hasPermission && userData?.id) {
      navigator.serviceWorker.addEventListener('message', message => {
        const notification = {data: message.data?.data};
        handleNotification(false)(notification);
      });
    }
  }, [hasPermission, userData]);

  return <>{children}</>;
};
