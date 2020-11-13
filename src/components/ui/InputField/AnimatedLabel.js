import React, {useRef, useEffect} from 'react';
import {AppText} from 'components/ui/AppText';
import {Animated, Platform} from 'react-native';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

const AnimatedText = Animated.createAnimatedComponent(AppText);
export const AnimatedLabel = ({label, focused, style, ...props}) => {
  const position = useRef(new Animated.ValueXY()).current;
  const fontSize = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        duration: 200,
        toValue: {
          x: scaleDp(focused ? 0 : 2),
          y: scaleDp(focused ? 5 : Platform.OS === 'web' ? 18 : 23),
        },
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(fontSize, {
        duration: 200,
        toValue: focused ? 8 : 10,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [focused]);

  return (
    <AnimatedText
      {...props}
      accessible={false}
      fontSize={fontSize._value}
      style={[
        style,
        {
          color: focused ? theme.accentColor : theme.disabled,
          transform: [{translateX: position.x}, {translateY: position.y}],
        },
      ]}>
      {label}
    </AnimatedText>
  );
};
