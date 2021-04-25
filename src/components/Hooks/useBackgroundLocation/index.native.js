import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import Config from 'react-native-config';
import {useUserData} from 'components/Hooks/useUserData';

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
    stopOnTerminate: true,
    startOnBoot: false,
    activitiesInterval: 10000,
    stationaryRadius: 50,
    distanceFilter: 50,
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

  useEffect(() => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'FletApp',
      notificationText: 'Seguimiento ubicacion prendido',
      debug: false,
      startOnBoot: config.startOnBoot,
      stopOnTerminate: config.stopOnTerminate,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: config.interval,
      fastestInterval: config.fastestInterval,
      activityType: 'AutomotiveNavigation',
      activitiesInterval: config.activitiesInterval,
      stopOnStillActivity: false,
      url: `${Config.REACT_APP_BASE_URL}/${config.url}`,
      httpHeaders: {
        AccesToken: Config.REACT_APP_ACCESS_TOKEN,
        Authorization: `Bearer ${userToken}`,
      },
      postTemplate: config.body,
    });

    BackgroundGeolocation.on('location', location => {
      BackgroundGeolocation.startTask(taskKey => {
        onLocationObtained?.(location).then(t => {
          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });

    BackgroundGeolocation.on('authorization', status => {
      if (status !== BackgroundGeolocation.AUTHORIZED) {
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

    config.autoStart &&
      BackgroundGeolocation.checkStatus(status => {
        if (!status.isRunning) {
          BackgroundGeolocation.start();
        }
      });

    return () => {
      if (config.stopOnUnfocus) {
        BackgroundGeolocation.stop();
        BackgroundGeolocation.removeAllListeners();
      }
    };
  }, []);

  const enable = useCallback(() => {
    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });
  }, []);

  const disable = useCallback(() => {
    BackgroundGeolocation.checkStatus(status => {
      if (status.isRunning) {
        BackgroundGeolocation.stop();
      }
    });
  }, []);

  return {
    enable,
    disable,
  };
};
