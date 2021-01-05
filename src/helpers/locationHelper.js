import {Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Polyline from '@mapbox/polyline';

export const getCurrentPosition = async (options) =>
  new Promise((resolve, reject) => {
    Platform.select({
      native: () => Geolocation.getCurrentPosition(resolve, reject, options),
      web: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        } else {
          reject(new Error('Geolocation not available'));
        }
      },
    })();
  });

export const trackUserPosition = Platform.select({
  web: (callback, error, options) => {
    if (!navigator.geolocation) {
      return error(new Error('Geolocation not available'));
    }
    const watchNumber = navigator.geolocation.watchPosition(
      (v) => {
        if (!v.coords) {
          getCurrentPosition(options).then(callback).catch(error);
        }
        callback({
          coords: {
            latitude: v.coords.latitude,
            longitude: v.coords.longitude,
          },
        });
      },
      error,
      options,
    );
    return () => navigator.geolocation.clearWatch(watchNumber);
  },
  native: (callback, error, options) => {
    const watchNumber = Geolocation.watchPosition(callback, error, options);
    return () => Geolocation.clearWatch(watchNumber);
  },
});

export const decodeDirections = (overviewPolyline) =>
  Polyline.decode(overviewPolyline);

// Converts from degrees to radians.
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

export const getBearingFromCoords = (startCoords = {}, endCoords = {}) => {
  const initial = {
    latitude: toRadians(startCoords.latitude),
    longitude: toRadians(startCoords.longitude),
  };
  const end = {
    latitude: toRadians(endCoords.latitude),
    longitude: toRadians(endCoords.longitude),
  };
  let dLong = end.longitude - initial.longitude;

  let dPhi = Math.log(
    Math.tan(end.latitude / 2.0 + Math.PI / 4.0) /
      Math.tan(initial.latitude / 2.0 + Math.PI / 4.0),
  );
  if (Math.abs(dLong) > Math.PI) {
    if (dLong > 0.0) dLong = -(2.0 * Math.PI - dLong);
    else dLong = 2.0 * Math.PI + dLong;
  }

  return (toDegrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
};
