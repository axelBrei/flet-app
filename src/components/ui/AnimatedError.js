import React, {useEffect, useRef, useState} from 'react';
import {Text, Animated, Platform} from 'react-native';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const AnimatedError = ({error}) => {
  const errorHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(errorHeight, {
      toValue: scaleDp(error ? 10 : 0),
    }).start();
  }, [errorHeight, error]);

  return (
    <Animated.Text
      style={{
        height: scaleDp(12),
        color: theme.error,
        fontSize: errorHeight,
      }}>
      {error}
    </Animated.Text>
  );
};
