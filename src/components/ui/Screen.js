import React from 'react';
import {Platform, View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';

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
    <ViewComponent accessible={false} onPress={Keyboard.dismiss}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {children}
      </View>
    </ViewComponent>
  );
};

Screen.defaultProps = {
  removeTWF: false,
};
