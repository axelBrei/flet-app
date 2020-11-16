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

export const Screen = ({children, removeeTWF}) => {
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
      <StatusBar backgroundColor={theme.primaryLightColor} />
      <ViewComponent accessible={false} onPress={Keyboard.dismiss}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {children}
        </View>
      </ViewComponent>
    </>
  );
};

Screen.defaultProps = {
  removeTWF: false,
};
