import React, {useEffect, useRef, useState} from 'react';
import {Text, Animated, Platform} from 'react-native';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const AnimatedError = ({error}) => {
  const errorHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(errorHeight, {
      toValue: scaleDp(
        error
          ? Platform.select({
              web: 8,
              native: 10,
            })
          : 0,
      ),
    }).start();
  }, [errorHeight, error]);

  return (
    <Animated.Text
      style={{
        width: '100%',
        height: scaleDp(15),
        color: theme.error,
        marginLeft: scaleDp(Platform.OS === 'web' ? 5 : 15),
        marginTop: scaleDp(2),
        fontSize: errorHeight,
      }}>
      {error}
    </Animated.Text>
  );
};
