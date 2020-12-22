import React, {
  useRef,
  useMemo,
  useImperativeHandle,
  useCallback,
  useState,
} from 'react';
import styled, {css} from 'styled-components';
import {
  Animated,
  PanResponder,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const DraggableContainer = ({
  children,
  initialHiddenContentPercentage,
  externalRef,
}) => {
  const {width, height: screenHeight} = useWindowDimension();
  const [isOpen, setIsOpen] = useState(false);
  const [componentHeight, setComponentHeight] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const contentRef = useRef(null);

  const animateDrawerTo = useCallback(
    (yValue) => {
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: yValue,
        },
        duration: 150,
        useNativeDriver: true,
      }).start(() => Platform.OS === 'web' && pan.flattenOffset());
    },
    [pan],
  );

  const close = useCallback(() => {
    animateDrawerTo(0);
    setIsOpen(false);
  }, [animateDrawerTo, setIsOpen]);

  const open = useCallback(() => {
    let toVal = -(
      componentHeight -
      initialHiddenContentPercentage * screenHeight
    );
    if (Platform.OS !== 'web') toVal -= componentHeight * 0.12;
    animateDrawerTo(toVal);
    setIsOpen(true);
  }, [
    animateDrawerTo,
    initialHiddenContentPercentage,
    screenHeight,
    componentHeight,
    setIsOpen,
  ]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: (e, {dy}) => {
      // This will make it so the gesture is ignored if it's only short (like a tap).
      return Math.abs(dy) > 20;
    },
    onPanResponderGrant: () => {
      pan.setOffset(pan.__getValue());
    },
    onPanResponderMove: (event, gesture) => {
      const {pageY} = event.nativeEvent;
      const gap = screenHeight - pageY;
      if (
        gesture.dy > 0 &&
        gap < componentHeight * initialHiddenContentPercentage
      ) {
        return null;
      }
      if (gesture.dy < 0 && gap > componentHeight) {
        return null;
      }

      return Animated.event([null, {dy: pan.y, dx: pan.x}], {
        useNativeDriver: false,
      })(event, gesture);
    },
    onPanResponderRelease: (event, {dy, ...rest}) => {
      if (Math.abs(dy) >= 20) {
        pan.flattenOffset();
        dy > 0 ? close() : open();
      }
    },
  });
  const measureView = useCallback(
    (e) => {
      if (componentHeight === 0) {
        setComponentHeight(e.nativeEvent.layout.height);
      }
    },
    [componentHeight, setComponentHeight],
  );

  const topOutputRange = useMemo(
    () =>
      componentHeight +
      componentHeight *
        Platform.select({
          native: 0.3,
          web: 0.2,
        }),
    [componentHeight],
  );

  useImperativeHandle(externalRef, () => ({
    open,
    close,
    isOpen,
  }));

  return (
    <>
      <SafeZone />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          Platform.OS === 'web' && {overflow: 'hidden'},
          {
            width,
            alignItems: 'center',
            position: 'absolute',
            bottom: -(componentHeight * (1 - initialHiddenContentPercentage)),
            backgroundColor: theme.backgroundColor,
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [0, screenHeight],
                  outputRange: [0, topOutputRange],
                }),
              },
            ],
            zIndex: 20,
          },
        ]}>
        <DrawableContainer
          ref={contentRef}
          onLayout={measureView}
          activeOpacity={1}>
          <DrawerLine></DrawerLine>
          {typeof children === 'function'
            ? children({isOpen, open, close})
            : children}
        </DrawableContainer>
      </Animated.View>
    </>
  );
};

DraggableContainer.defaultProps = {
  initialHiddenContentPercentage: 0.3,
};

export const DrawableBottomView = React.forwardRef((props, ref) => (
  <DraggableContainer externalRef={ref} {...props} />
));

const DrawableContainer = styled(TouchableOpacity)`
  width: 100%;
  min-height: ${scaleDpTheme(200)};
  padding: ${scaleDpTheme(10)};
  border-top-left-radius: ${scaleDpTheme(8)};
  border-top-right-radius: ${scaleDpTheme(8)};
  background-color: ${theme.white};
  box-shadow: 0.5px -1px 3px ${theme.shadowColor};
  elevation: 3;
  z-index: 10;
  ${Platform.select({
    web: css`
      cursor: auto;
    `,
  })}
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
