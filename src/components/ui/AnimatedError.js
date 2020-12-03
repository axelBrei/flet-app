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
        width: '100%',
        height: scaleDp(16),
        color: theme.error,
        marginLeft: scaleDp(15),
        marginTop: scaleDp(4),
        fontSize: errorHeight,
      }}>
      {error}
    </Animated.Text>
  );
};
