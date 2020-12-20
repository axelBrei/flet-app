import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {HeaderBackButton} from '@react-navigation/stack';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const CustomHeaderBackButton = (props) => {
  const {isMobile} = useWindowDimension();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: scaleDp(10),
      }}>
      <Icon
        color={props.tintColor}
        size={scaleDp(isMobile ? 20 : 16)}
        name={Platform.OS !== 'android' ? 'chevron-left' : 'arrow-left'}
      />
      {props.labelVisible && (
        <AppText color={props.tintColor}>{props.label}</AppText>
      )}
    </TouchableOpacity>
  );
};

CustomHeaderBackButton.defaultProps = {
  tintColor: theme.white,
};
