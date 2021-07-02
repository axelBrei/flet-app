import React, {useCallback, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  handleNewToken,
  useNotificationHandler,
} from 'components/Contexts/NotificationContext/handler';
import {useUserData} from 'components/Hooks/useUserData';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from 'constants/theme';

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
    SplashScreen.hide();
    requestPermissions();
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

  return <SafeArea edges={['top', 'left', 'right']}>{children}</SafeArea>;
};

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${theme.primaryColor};
`;
