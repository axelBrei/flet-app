import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {View, Animated, Platform} from 'react-native';
import {theme} from 'constants/theme';

export const AnimatedError = ({error, errorFontSize}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: -2})).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        useNativeDriver: true,
        duration: 150,
        toValue: error ? 1 : 0,
      }),
      Animated.timing(position, {
        useNativeDriver: true,
        duration: 150,
        toValue: {
          x: Platform.OS === 'web' ? 10 : 0,
          y: 0,
        },
      }),
    ]).start();
  }, [error]);

  return (
    <Container>
      <Animated.Text
        style={{
          width: '100%',
          color: theme.error,
          fontSize: errorFontSize || 12,
          opacity,
          transform: [{translateX: position.x}, {translateY: position.y}],
        }}>
        {error}
      </Animated.Text>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  top: 100%;
  width: auto;
  background-color: green;
  left: 15px;
`;
