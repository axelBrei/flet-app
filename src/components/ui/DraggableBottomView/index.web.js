import React, {
  useRef,
  useEffect,
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
import {scaleDpTheme, scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useIsFocused} from '@react-navigation/native';
import {DraggableContent} from 'components/ui/DraggableBottomView/DraggableContent';
import {
  openDrawer,
  closeDrawer,
} from 'components/ui/DraggableBottomView/animationHelpers';

export const DraggableContainer = ({
  children,
  initialHiddenContentPercentage,
  externalRef,
  initiallyOpen,
}) => {
  const isFocused = useIsFocused();
  const {width, height: screenHeight} = useWindowDimension();
  const [isOpen, setIsOpen] = useState(false);
  const [componentHeight, setComponentHeight] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const close = useCallback(
    (callback = () => {}) => {
      closeDrawer(
        pan,
        () => {
          setIsOpen(false);
          callback();
        },
        true,
      );
    },
    [setIsOpen],
  );

  const open = useCallback(
    (callback = () => {}) => {
      openDrawer(
        pan,
        componentHeight,
        initialHiddenContentPercentage,
        () => {
          setIsOpen(true);
          callback();
        },
        true,
      );
    },
    [initialHiddenContentPercentage, screenHeight, componentHeight, setIsOpen],
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: (e, {dy}) => {
      // This will make it so the gesture is ignored if it's only short (like a tap).
      return Math.abs(dy) > 20;
    },
    onPanResponderGrant: () => {
      pan.setOffset(pan?.__getValue());
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

      return Animated.event([null, {dy: pan.y}], {
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
      if (initiallyOpen) {
        open();
      }
    },
    [open, initiallyOpen, componentHeight, setComponentHeight],
  );

  useImperativeHandle(externalRef, () => ({
    open,
    close,
    isOpen,
  }));

  useEffect(() => {
    if (initiallyOpen) {
      open();
    }
  }, [initiallyOpen, open]);

  return (
    <>
      <SafeZone />
      <Animated.View
        onLayout={measureView}
        useNativeDriver
        {...panResponder.panHandlers}
        style={[
          Platform.OS === 'web' && {overflow: 'hidden'},
          {
            width: width ?? '100%',
            alignItems: 'center',
            position: 'absolute',
            bottom: -(componentHeight * (1 - initialHiddenContentPercentage)),
            backgroundColor: theme.backgroundColor,
            zIndex: 20,
            transform: [{translateY: pan.y}, {translateX: 0}],
          },
        ]}>
        <DraggableContent>
          {typeof children === 'function'
            ? children({isOpen, open, close})
            : children}
        </DraggableContent>
      </Animated.View>
    </>
  );
};

DraggableContainer.defaultProps = {
  initialHiddenContentPercentage: 0.3,
};

const _DrawableBottomView = React.forwardRef((props, ref) => (
  <DraggableContainer externalRef={ref} {...props} />
));

export default React.memo(_DrawableBottomView);

const SafeZone = styled(View)`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: auto;
  background-color: ${theme.white};
  height: 50px;
`;
