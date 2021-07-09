import React from 'react';
import {theme} from 'constants/theme';
import {RefreshControl as RefControl} from 'react-native';

export const RefreshControl = ({refreshing, onRefresh, ...props}) => (
  <RefControl
    refreshing={refreshing}
    colors={[theme.primaryColor]}
    title="Tirá para actualizar"
    titleColor={theme.primaryColor}
    tintColor={theme.primaryColor}
    onRefresh={onRefresh}
    {...props}
  />
);
