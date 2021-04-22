import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {theme} from 'constants/theme';
import {CustomHeaderBackButton} from 'components/ui/CustomHeaderBackButton';
import {TransitionPresets} from '@react-navigation/stack';

const {width} = Dimensions.get('screen');
const isMobile = width <= 800 || Platform.OS !== 'web';
export const navigationConfig = ({title, ...props} = {}) => ({
  headerBackTitleVisible: !isMobile,
  animationEnabled: isMobile,
  ...(isMobile && TransitionPresets.SlideFromRightIOS),
  headerStyle: {
    backgroundColor: isMobile ? theme.primaryLightColor : theme.backgroundColor,
    borderBottomWidth: 0,
    ...props.headerStyle,
  },
  ...Platform.select({
    web: {
      headerLeft: props => (
        <CustomHeaderBackButton
          {...props}
          labelVisible={!isMobile}
          label="Volver"
        />
      ),
    },
  }),
  ...(isMobile
    ? {
        headerTintColor: theme.white,
      }
    : {
        headerTitleStyle: {display: 'none'},
        title: '',
      }),
  cardStyle: {
    backgroundColor: 'white',
  },
  ...props,
});
