import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import Config from 'react-native-config';
import {useUserData} from 'components/Hooks/useUserData';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';
import {AppState} from 'react-native';

interface BackgroundLocationConfig {
  interval: Number;
  startOnBoot: Boolean;
  stopOnTerminate: Boolean;
  fastestInterval: Number;
  activitiesInterval: Number;
  stationaryRadius: Number;
  distanceFilter: Number;
  url: String;
  body: Object;
  autoStart: Boolean;
  stopOnUnfocus: Boolean;
}

export default (
  onLocationObtained = () => new Promise(resolve => resolve('test')),
  config: BackgroundLocationConfig = {
    interval: 10000,
    fastestInterval: 5000,
    stopOnTerminate: false,
    startOnBoot: false,
    activitiesInterval: 10000,
    stationaryRadius: 5,
    distanceFilter: 20,
    url: 'courrier/position',
    body: {
      latitude: '@latitude',
      longitude: '@longitude',
      vehicle_id: 1,
    },
    autoStart: false,
    stopOnUnfocus: false,
  },
) => {
  const {userToken} = useUserData();
  const {loading, status, error, check} = usePermission(
    [PERMISSIONS.backgroundLocation],
    true,
    false,
  );

  const enable = useCallback(
    (checkPermission = true) => {
      if (status) {
        BackgroundGeolocation.checkStatus(status => {
          if (!status.isRunning) {
            BackgroundGeolocation.start();
          }
        });
      } else if (checkPermission) {
        check();
      }
      return status;
    },
    [status],
  );

  const disable = useCallback(() => {
    BackgroundGeolocation.checkStatus(status => {
      if (status.isRunning) {
        BackgroundGeolocation.stop();
      }
    });
  }, []);

  const hasPermission = useCallback(() => {
    if (!status) {
      check();
    }
    return status;
  }, [status]);

  useEffect(() => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: config.stationaryRadius,
      distanceFilter: config.distanceFilter,
      notificationTitle: 'FletApp',
      notificationText: 'Seguimiento ubicacion prendido',
      debug: false,
      startOnBoot: config.startOnBoot,
      stopOnTerminate: config.stopOnTerminate,
      locationProvider: BackgroundGeolocation.RAW_PROVIDER,
      interval: config.interval,
      fastestInterval: config.fastestInterval,
      activityType: 'AutomotiveNavigation',
      activitiesInterval: config.activitiesInterval,
      stopOnStillActivity: false,
      pauseLocationUpdates: false,
      url: `${Config.REACT_APP_BASE_URL}/${config.url}`,
      httpHeaders: {
        AccesToken: Config.REACT_APP_ACCESS_TOKEN,
        Authorization: `Bearer ${userToken}`,
      },
      postTemplate: config.body,
    });

    BackgroundGeolocation.on('location', location => {
      onLocationObtained?.(location);
    });

    BackgroundGeolocation.on('authorization', permissionStatus => {
      if (permissionStatus !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'La app necesita permisos para obtener tu ubicación',
              'Querés abrir la configuración?',
              [
                {
                  text: 'Sí',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });

    BackgroundGeolocation.checkStatus(({isRunning}) => {
      if (isRunning) {
        BackgroundGeolocation.start(); // service was running -> rebind all listeners
      }
    });

    return () => {
      if (config.stopOnUnfocus) {
        BackgroundGeolocation.stop();
      }
      BackgroundGeolocation.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!error && status) {
        config.autoStart && enable(false);
      }
    }
  }, [status, loading, config]);

  return {
    enable,
    disable,
    hasLocationPermission: hasPermission,
  };
};
