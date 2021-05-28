import React, {useCallback, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  handleNewToken,
  useNotificationHandler,
} from 'components/Contexts/NotificationContext/handler';
import {useUserData} from 'components/Hooks/useUserData';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default ({children}) => {
  const userData = useUserData();
  const handleNotification = useNotificationHandler();
  const [permissionGranted, setPermissionGranted] = useState(
    Platform.OS === 'android',
  );

  const getToken = useCallback(async () => {
    const token = await messaging().getToken();
    handleNewToken(token);
  }, []);

  const requestPermissions = useCallback(async () => {
    try {
      const authorizationStatus = await messaging().requestPermission();
      setPermissionGranted(
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED,
      );
    } catch (e) {}
  }, [setPermissionGranted]);

  const getInitialNotification = useCallback(async () => {
    const notification = await messaging().getInitialNotification();
    notification && handleNotification(true)(notification);
  }, [handleNotification]);

  useEffect(() => {
    requestPermissions();
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (permissionGranted && userData?.id) {
      getToken();
      const unsubscribeOnMessage = messaging().onMessage(
        handleNotification(false),
      );
      const backgroundMessageHandler = messaging().setBackgroundMessageHandler(
        handleNotification(false),
      );
      const notificationOpenAppHandler = messaging().onNotificationOpenedApp(
        handleNotification(true),
      );
      getInitialNotification();

      // const refreshTokenHandler = messaging().onTokenRefresh(handleNewToken);

      return () => {
        unsubscribeOnMessage();
        backgroundMessageHandler?.();
        notificationOpenAppHandler?.();
        // refreshTokenHandler?.();
      };
    }
  }, [permissionGranted, userData, handleNotification]);

  return children;
};
