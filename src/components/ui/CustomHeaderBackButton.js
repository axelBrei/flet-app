import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {HeaderBackButton} from '@react-navigation/stack';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const CustomHeaderBackButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: scaleDp(10),
    }}>
    <Icon
      color={theme.white}
      size={scaleDp(Platform.OS === 'web' ? 16 : 20)}
      name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
    />
  </TouchableOpacity>
);
