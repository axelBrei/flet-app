import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {theme} from 'constants/theme';
import {CustomHeaderBackButton} from 'components/ui/CustomHeaderBackButton';
import {TransitionPresets} from '@react-navigation/stack';

const {width} = Dimensions.get('screen');
const isMobile = width <= 800 || Platform.OS !== 'web';
export const navigationConfig = (props) => ({
  headerBackTitleVisible: false,
  animationEnabled: true,
  ...(isMobile && TransitionPresets.SlideFromRightIOS),
  headerStyle: {
    backgroundColor: theme.primaryLightColor,
    ...props.headerStyle,
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
  ...props,
});
