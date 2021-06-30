import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {HeaderBackButton} from '@react-navigation/stack';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useNavigation} from 'components/Hooks/useNavigation';

export const CustomHeaderBackButton = ({navigation, ...props}) => {
  const onPress = () => {
    if (Platform.OS === 'web' && props.canGoBack) {
      history.back();
      return;
    }
    (props.canGoBack ? props?.onPress : navigation.goBack)();
  };

  // if (Platform.OS !== 'web') {
  //   return <HeaderBackButton {...props} />;
  // }
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
        size={Platform.OS !== 'ios' ? 60 : 20}
        name={Platform.OS !== 'android' ? 'chevron-left' : 'arrow-left'}
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
