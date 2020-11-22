import React from 'react';
import {Platform} from 'react-native';
import {theme} from 'constants/theme';
import {CustomHeaderBackButton} from 'components/ui/CustomHeaderBackButton';

export const navigationConfig = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: theme.primaryLightColor,
  },
  headerTitleStyle: Platform.select({
    web: {
      display: 'none',
    },
  }),
  headerLeft: (props) => <CustomHeaderBackButton {...props} />,
  title: '',
};
