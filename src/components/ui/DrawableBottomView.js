import React, {useRef, useCallback, useState} from 'react';
import styled from 'styled-components';
import {Animated, PanResponder, Platform, Dimensions, View} from 'react-native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const DrawableBottomView = ({
  children,
  initialHiddenContentPercentage,
}) => {
  const {width, height: screenHeight} = useWindowDimension();
  let componentHeight = useRef(0).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const contentRef = useRef(null);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (e, {dy}) => {
      // This will make it so the gesture is ignored if it's only short (like a tap).
      return Math.abs(dy) > 10;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: 0,
        y: pan.y._value,
      });
    },
    onPanResponderMove: (event, gesture) => {
      const {pageY} = event.nativeEvent;
      const gap = screenHeight - pageY;

      if (
        gesture.dy > 0 &&
        gap < componentHeight * initialHiddenContentPercentage
      ) {
        return;
      }
      if (gesture.dy < 0 && gap > componentHeight) {
        return;
      }
      return Animated.event([null, {dy: pan.y, dx: 0}], {
        useNativeDriver: Platform.OS !== 'web',
      })(event, gesture);
    },
    onPanResponderRelease: (event, {dy}) => {
      pan.flattenOffset();
      if (Math.abs(dy) < 20) {
        return;
      }
      const gap = dy > 0 ? initialHiddenContentPercentage : 1;
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: screenHeight - componentHeight * gap,
        },
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
  });
  const measureView = useCallback(
    ({
      nativeEvent: {
        layout: {height},
      },
    }) => {
      if (componentHeight === 0) {
        componentHeight = height;
        pan.setValue({
          x: 0,
          y: screenHeight - height * initialHiddenContentPercentage,
        });
      }
    },
    [componentHeight, pan, initialHiddenContentPercentage],
  );

  return (
    <>
      <SafeZone />
      <Animated.View
        onLayout={measureView}
        {...panResponder.panHandlers}
        style={[
          Platform.OS === 'web' && {overflow: 'hidden'},
          {
            width,
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: theme.backgroundColor,
            transform: pan.getTranslateTransform(),
            zIndex: 20,
          },
        ]}>
        <DrawableContainer ref={contentRef}>
          <DrawerLine />
          {children}
        </DrawableContainer>
      </Animated.View>
    </>
  );
};

DrawableBottomView.defaultProps = {
  initialHiddenContentPercentage: 0.3,
};

const DrawableContainer = styled(View)`
  width: 100%;
  min-height: ${scaleDpTheme(200)};
  padding: ${scaleDpTheme(10)};
  border-top-left-radius: ${scaleDpTheme(8)};
  border-top-right-radius: ${scaleDpTheme(8)};
  background-color: ${theme.white};
  box-shadow: 0.5px -1px 3px ${theme.disabled};
  elevation: 3;
  z-index: 10;
`;

const DrawerLine = styled(View)`
  align-self: center;
  width: ${scaleDpTheme(30)};
  height: 4px;
  border-radius: ${scaleDpTheme(1000)};
  background-color: ${theme.disabled};
  margin-bottom: ${scaleDpTheme(10)};
`;

const SafeZone = styled(View)`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: auto;
  background-color: ${theme.white};
  height: 50px;
`;
