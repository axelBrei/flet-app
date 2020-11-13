import React, {useRef, useEffect, useMemo} from 'react';
import {Animated, Platform} from 'react-native';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const AnimatedBorder = ({focused}) => {
  const borderHeight = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(borderHeight, {
      duration: 150,
      toValue: focused ? 1.5 : 1,
      useNativeDriver: Platform.OS === 'ios',
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
        backgroundColor: interpolateAnimation,
        height: Platform.select({
          native: borderHeight,
          web: scaleDp(focused ? 1.5 : 1),
        }),
      }}
    />
  );
};
