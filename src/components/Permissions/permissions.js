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
  backgroundLocation: Platform.select({
    web: 'geolocation',
    android: 'android.permission.ACCESS_BACKGROUND_LOCATION',
    ios: 'ios.permission.LOCATION_ALWAYS',
  }),
  notifications: Platform.select({
    web: 'notifications',
  }),
};

export const permissionMappings = Object.keys(PERMISSIONS).reduce(
  (acc, curr) => {
    return {
      ...acc,
      [PERMISSIONS[curr]]: curr,
    };
  },
  {},
);

export const permissionNames = {
  camera: 'Cámara',
  photo: 'Galería',
  location: 'Ubicación',
  backgroundLocation: 'Ubicación en segundo plano',
  notifications: 'Notificationes',
};
