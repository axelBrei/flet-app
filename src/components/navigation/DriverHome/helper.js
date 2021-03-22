import {Platform} from 'react-native';
export const getMarkerFromPlatform = async (path) => {
  return await import(
    `${path}.${Platform.select({native: 'svg', web: 'png'})}`
  );
};
