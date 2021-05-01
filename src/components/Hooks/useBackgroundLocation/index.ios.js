import {NativeModules, NativeEventEmitter} from 'react-native';
import {useUserData} from 'components/Hooks/useUserData';
import {useCallback, useEffect} from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {PERMISSIONS, usePermission} from 'components/Hooks/usePermission';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
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
  const {loading, status, error, check} = usePermission(
    [PERMISSIONS.backgroundLocation],
    true,
    false,
  );

  useEffect(() => {
    LocationTrackingModule.configure({
      vehicle_id: courrier?.vehicle?.[0]?.id,
      url: `${Config.REACT_APP_BASE_URL}/${config.url}`,
      AccesToken: Config.REACT_APP_ACCESS_TOKEN,
      Authorization: `Bearer ${userToken}`,
    });
  }, [courrier]);

  useEffect(() => {
    const subscription = emitter?.addListener('onLocation', body => {
      onLocationObtained?.(body);
    });
    return subscription.remove;
  }, []);

  const enable = useCallback(
    (checkPermission = true) => {
      if (status) {
        LocationTrackingModule.startTracking();
      } else if (checkPermission) {
        check();
      }
      return status;
    },
    [status],
  );

  const disable = useCallback(() => {
    LocationTrackingModule.stopTracking();
  }, []);

  const hasPermission = useCallback(() => {
    if (!status) {
      check();
    }
    return status;
  }, [status]);

  return {
    enable,
    disable,
    hasLocationPermission: hasPermission,
  };
};
