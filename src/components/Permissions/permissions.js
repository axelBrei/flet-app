import {Platform} from 'react-native';

export const PERMISSIONS = {
  camera: Platform.select({
    web: 'camera',
    android: 'android.permission.CAMERA',
    ios: 'ios.permission.CAMERA',
  }),
  photo: Platform.select({
    android: 'android.permission.READ_EXTERNAL_STORAGE',
    ios: 'ios.permission.PHOTO_LIBRARY',
  }),
  location: Platform.select({
    web: 'geolocation',
    android: 'android.permission.ACCESS_FINE_LOCATION',
    ios: 'ios.permission.LOCATION_WHEN_IN_USE',
  }),
  notifications: Platform.select({
    web: 'notifications',
  }),
};
