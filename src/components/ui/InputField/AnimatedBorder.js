import React, {useRef, useEffect, useMemo} from 'react';
import {Animated, Platform} from 'react-native';
import {theme} from 'constants/theme';

export const AnimatedBorder = ({focused, error}) => {
  const borderHeight = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(borderHeight, {
      duration: 150,
      toValue: focused ? 1.5 : 1,
    }).start();
  }, [focused]);

  const interpolateAnimation = useMemo(
    () =>
      borderHeight.interpolate({
        inputRange: [1, 1.5],
        outputRange: [theme.disabled, theme.accentColor],
      }),
    [borderHeight],
  );

  return (
    <Animated.View
      style={{
        backgroundColor: error ? theme.error : interpolateAnimation,
        height: 2,
      }}
    />
  );
};
