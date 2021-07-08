import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {useNavigation} from '@react-navigation/native';

export const CustomHeaderBackButton = ({navigation, ...props}) => {
  const nav = navigation || useNavigation();
  const onPress = () => {
    if (Platform.OS === 'web') {
      if (props.canGoBack) {
        (props.canGoBack ? props?.onPress : nav?.goBack)?.();
      } else history?.back();
      return;
    }
    (props.canGoBack ? props?.onPress : nav?.goBack)?.();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 12,
      }}>
      <Icon
        color={props.tintColor}
        size={Platform.OS !== 'ios' ? 35 : 30}
        name={'chevron-left'}
      />
      {props.labelVisible && (
        <AppText color={props.tintColor}>{props.label}</AppText>
      )}
    </TouchableOpacity>
  );
};

CustomHeaderBackButton.defaultProps = {
  tintColor: theme.fontColor,
};
