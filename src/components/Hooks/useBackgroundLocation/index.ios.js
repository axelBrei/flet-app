import {NativeModules, NativeEventEmitter, Alert} from 'react-native';
import {useUserData} from 'components/Hooks/useUserData';
import {useCallback, useEffect, useRef, useState} from 'react';
import {PERMISSIONS, usePermission} from 'components/Hooks/usePermission';
import Config from 'react-native-config';

const {LocationTrackingModule} = NativeModules;

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

const emitter = new NativeEventEmitter(LocationTrackingModule);
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
  const {courrier, userToken} = useUserData();
  const [listening, setListening] = useState(false);
  const {loading, status, error, check} = usePermission(
    [PERMISSIONS.backgroundLocation],
    true,
    true,
  );

  const enable = useCallback(
    (checkPermission = true) => {
      if (status) {
        emitter?.addListener('onLocation', body => {
          onLocationObtained?.(body);
        });
        emitter.addListener('error', error => {
          Alert.alert('Error', error);
        });
        setListening(true);
        LocationTrackingModule.startTracking();
      } else if (checkPermission) {
        check();
      }
      return status;
    },
    [status],
  );

  const disable = useCallback(() => {
    if (listening) {
      try {
        LocationTrackingModule.stopTracking();
        emitter.removeAllListeners('location');
        emitter.removeAllListeners('error');
        setListening(false);
      } catch (e) {
        Alert.alert(
          'Error',
          'Ocurrió un error al querer deshabilitar la ubicacion en segundo plano',
        );
      }
    }
  }, [emitter]);

  const hasPermission = useCallback(() => {
    if (!loading && !status) {
      check();
    }
    return status;
  }, [loading, status]);

  useEffect(() => {
    LocationTrackingModule.configure({
      vehicle_id: config.body.vehicle_id, //courrier?.vehicle?.[0]?.id,
      url: `${Config.REACT_APP_BASE_URL}/${config.url}`,
      AccessToken: Config.REACT_APP_ACCESS_TOKEN,
      Authorization: `Bearer ${userToken}`,
    });
    if (config.autoStart) {
      enable();
    }
    return () => {
      if (listening) {
        emitter.removeAllListeners();
      }
    };
  }, [courrier, enable]);

  return {
    enable,
    disable,
    hasLocationPermission: hasPermission,
  };
};
