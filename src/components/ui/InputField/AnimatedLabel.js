import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Animated, View} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const AnimatedLabel = ({label, valuePresent}) => {
  const fontScale = useRef(new Animated.Value(-10)).current;
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fontScale, {
        useNativeDriver: true,
        duration: 100,
        toValue: 1,
      }),
      Animated.timing(position, {
        useNativeDriver: true,
        duration: 200,
        toValue: -15,
      }),
    ]).start();
  }, []);

  return (
    <Container>
      <AnimatedText
        style={{
          color: valuePresent ? theme.fontColor : theme.disabledFont,
          fontSize: 12,
          transform: [{translateY: position}, {scale: fontScale}],
        }}>
        {label}
      </AnimatedText>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  top: 0;
  left: -5px;
  overflow: hidden;
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  padding-left: 25px;
`;

const AnimatedText = Animated.createAnimatedComponent(
  styled(AppText)`
    overflow: hidden;
  `,
);
