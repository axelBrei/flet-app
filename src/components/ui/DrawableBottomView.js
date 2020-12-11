import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Animated, PanResponder, Platform, Dimensions, View} from 'react-native';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

export const DrawableBottomView = ({
  children,
  initialHiddenContentPercentage,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.measureInWindow((x, y, width, height) => {
      pan.setValue({
        x: 0,
        y: height * initialHiddenContentPercentage,
      });
    });
  }, [initialHiddenContentPercentage, contentRef, pan]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: Platform.OS === 'web',
      }),
      onPanResponderRelease: (event, gesture) => {
        const move = gesture.dy;
        if (Math.abs(move) < 20) {
          return;
        }
        contentRef.current.measureInWindow((x, y, width, height) => {
          let toValue = null;
          if (SCREEN_HEIGHT - y - height < 20 || move > height / 4) {
            toValue = {
              x: 0,
              y: height * initialHiddenContentPercentage,
            };
          } else if (SCREEN_HEIGHT - y > height || move > -height / 4) {
            toValue = {
              x: 0,
              y: 0,
            };
          }
          toValue &&
            Animated.timing(pan, {
              toValue,
              duration: 100,
              useNativeDriver: true,
            }).start();
        });
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <>
      <SafeZone />
      <Animated.View
        useNativeDriver={false}
        style={[
          Platform.OS === 'web' && {overflow: 'hidden'},
          {
            width: SCREEN_WIDTH,
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.backgroundColor,
            transform: [{translateY: pan.y}],
            zIndex: 20,
          },
        ]}
        {...panResponder.panHandlers}>
        <DrawableContainer ref={contentRef}>
          <DrawerLine />
          {children}
        </DrawableContainer>
      </Animated.View>
    </>
  );
};

DrawableBottomView.defaultProps = {
  initialHiddenContentPercentage: 0.55,
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
  border-radius: ${scaleDpTheme(20)};
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
