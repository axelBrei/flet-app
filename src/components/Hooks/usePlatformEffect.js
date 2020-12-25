import {useEffect} from 'react';
import {Platform} from 'react-native';

export const PLATFORMS = {
  NATIVE: 'native',
  WEB: 'web',
  ANDROID: 'android',
  IOS: 'ios',
};

export const usePlatformEffect = (
  callback: Function,
  conditions: Array,
  platform: String,
) => {
  if (Platform.OS === platform) {
    useEffect(callback, conditions);
  }
};
