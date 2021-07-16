import React from 'react';
import {Platform, Dimensions, View} from 'react-native';
import {theme} from 'constants/theme';
import {CustomHeaderBackButton} from 'components/ui/CustomHeaderBackButton';
import {TransitionPresets} from '@react-navigation/stack';
import {Title} from 'components/ui/Title';

const {width} = Dimensions.get('screen');
const isMobile = width <= 800 || Platform.OS !== 'web';
export const navigationConfig = ({title, ...props} = {}) => ({
  headerBackTitleVisible: !isMobile,
  animationEnabled: isMobile,
  ...(isMobile && TransitionPresets.SlideFromRightIOS),
  headerStyle: {
    backgroundColor: theme.backgroundColor,
    borderBottomWidth: 0,
    shadowColor: theme.backgroundColor,
    ...props.headerStyle,
  },
  headerTitle: props => (
    <View style={!isMobile && {marginLeft: 35}}>
      <Title size={22} color={props.tintColor} {...props} />
    </View>
  ),
  headerLeft: props => (
    <CustomHeaderBackButton
      {...props}
      labelVisible={!isMobile}
      label="Volver"
    />
  ),
  ...(isMobile
    ? {
        headerTintColor: theme.primaryColor,
        headerTitleAlign: 'center',
      }
    : {
        headerTitleStyle: {},
        title: title || '',
      }),
  cardStyle: {
    backgroundColor: 'white',
  },
  ...Platform.select({
    native: {
      safeAreaInsets: {top: 0},
    },
    web: {},
  }),
  ...props,
});
