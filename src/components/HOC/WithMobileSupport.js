import React from 'react';
import {Platform, Dimensions} from 'react-native';

export const WithMobileSupport = (WebComponent, MobileComponent) => {
  const {width} = Dimensions.get('window');
  if (Platform.OS === 'web' && width <= 800) {
    return MobileComponent;
  }
  return WebComponent;
};
