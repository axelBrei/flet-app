import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {Animated} from 'react-native';
import {Platform} from 'react-native';

export const LoadingStep = ({width}) => {
  const scaleX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Platform.select({
      native: Animated.timing(scaleX, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: true,
      }),
      web: Animated.sequence([
        Animated.timing(scaleX, {
          toValue: 10,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(200),
      ]),
    });
    Animated.loop(animation, {iterations: -1}).start();
  }, []);

  return (
    <Container width={width}>
      <Animated.View
        style={{
          height: '100%',
          width: '20%',
          backgroundColor: theme.primaryColor,
          transform: [{scale: scaleX}],
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  border-radius: 20px;
  width: ${props => props.width}px;
  background-color: ${theme.lightGray};
  height: 10px;
  overflow: hidden;
`;
