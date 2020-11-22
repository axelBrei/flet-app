import React, {useRef, useEffect} from 'react';
import {AppText} from 'components/ui/AppText';
import {Animated, Platform} from 'react-native';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

const AnimatedText = Animated.createAnimatedComponent(AppText);
export const AnimatedLabel = ({
  label,
  focused,
  xTranslation,
  yTranslation,
  initialY,
  initialX,
  error,
  style,
  ...props
}) => {
  const position = useRef(
    new Animated.ValueXY({
      x: initialX,
      y: initialY,
    }),
  ).current;
  const fontSize = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        duration: 200,
        toValue: {
          x: scaleDp(focused ? initialX : xTranslation),
          y: scaleDp(focused ? initialY : yTranslation),
        },
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(fontSize, {
        duration: 200,
        toValue: focused ? 10 : 12,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [yTranslation, xTranslation, focused, initialY, initialX]);

  return (
    <AnimatedText
      {...props}
      accessible={false}
      fontSize={fontSize._value}
      style={[
        style,
        {
          color: error
            ? theme.error
            : focused
            ? theme.accentColor
            : theme.disabled,
          transform: [{translateX: position.x}, {translateY: position.y}],
        },
      ]}>
      {label}
    </AnimatedText>
  );
};

AnimatedLabel.defaultProps = {
  xTranslation: 2,
  yTranslation: Platform.OS === 'web' ? 18 : 23,
  initialY: 5,
  initialX: 0,
};
