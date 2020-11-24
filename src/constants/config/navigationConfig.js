import React from 'react';
import {Platform} from 'react-native';
import {theme} from 'constants/theme';
import {CustomHeaderBackButton} from 'components/ui/CustomHeaderBackButton';

export const navigationConfig = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: theme.primaryLightColor,
  },
  ...Platform.select({
    web: {
      headerTitleStyle: {display: 'none'},
      headerLeft: (props) => <CustomHeaderBackButton {...props} />,
      title: '',
    },
    native: {
      headerTintColor: theme.white,
    },
  }),
};
