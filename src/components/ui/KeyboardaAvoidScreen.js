import React, {useState, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Platform,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components';
import {useKeyboardStatus} from 'components/Hooks/useKeyboardStatus';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const KeyboardAvoidScreen = props => {
  const windowHeight = useWindowDimension().height;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleKeyboardDidShow = event => {
    let softInputHeight = keyboardHeight;
    if (event) {
      softInputHeight = event.endCoordinates.height;
      setKeyboardHeight(softInputHeight);
    }

    const currentlyFocusedField = TextInput.State.currentlyFocusedInput
      ? TextInput.State.currentlyFocusedInput()
      : TextInput.State.currentlyFocusedField();
    if (currentlyFocusedField) {
      currentlyFocusedField.measure(
        (originX, originY, width, height, pageX, pageY) => {
          const gap = windowHeight - softInputHeight - (pageY + height);
          if (gap - props.extraHeight >= 0) return;
          Animated.timing(translateY, {
            toValue: gap - props.extraHeight - 11,
            useNativeDriver: true,
            duration: 150,
          }).start();
        },
      );
    }
  };
  const handleKeyboardClose = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 150,
    }).start();
  }, []);

  useKeyboardStatus((isOpen, event) => {
    if (isOpen) handleKeyboardDidShow(event);
    else handleKeyboardClose();
  });

  if (Platform.OS === 'ios') {
    return (
      <Container style={{transform: [{translateY}]}}>
        {props.children}
      </Container>
    );
  }
  return (
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'stretch'}}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

KeyboardAvoidScreen.propTypes = {
  extraHeight: PropTypes.number,
};

KeyboardAvoidScreen.defaultProps = {
  extraHeight: 15,
};

const Container = styled(Animated.View)`
  flex: 1;
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
`;
