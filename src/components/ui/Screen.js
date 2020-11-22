import React from 'react';
import {
  Platform,
  StatusBar,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const Screen = ({children, removeeTWF, classname, style}) => {
  const ViewComponent = React.useMemo(() => {
    return styled(
      Platform.OS === 'android' && !removeeTWF
        ? TouchableWithoutFeedback
        : View,
    )`
      height: 100%;
      width: 100%;
      background-color: ${(props) => props.theme.colors.backgroundColor};
    `;
  }, [removeeTWF]);

  return (
    <>
      <StatusBar backgroundColor={theme.primaryDarkColor} />
      <ViewComponent
        accessible={false}
        onPress={Keyboard.dismiss}
        style={{flex: 1, paddingTop: scaleDp(5)}}>
        <View
          classname={classname}
          style={[
            {
              alignItems: 'center',
            },
            style,
          ]}>
          {children}
        </View>
      </ViewComponent>
    </>
  );
};

Screen.defaultProps = {
  removeTWF: false,
};
