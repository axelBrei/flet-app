import React, {useEffect, useRef, useState} from 'react';
import {Text, Animated, Platform} from 'react-native';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const AnimatedError = ({error}) => {
  const errorOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(errorOpacity, {
      useNativeDriver: true,
      duration: 100,
      toValue: error ? 1 : 0,
    }).start();
  }, [errorOpacity, error]);

  return (
    <Animated.Text
      style={{
        width: '100%',
        height: scaleDp(13),
        opacity: errorOpacity,
        color: theme.error,
        marginLeft: scaleDp(Platform.OS === 'web' ? 5 : 15),
        marginTop: scaleDp(1),
        marginBottom: scaleDp(2),
        fontSize: scaleDp(
          Platform.select({
            web: 8,
            native: 10,
          }),
        ),
      }}>
      {error}
    </Animated.Text>
  );
};
