import React, {useState, useCallback, useRef, useImperativeHandle} from 'react';
import {View, Animated, TouchableOpacity, Platform} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import styled, {css} from 'styled-components';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {DraggableContent} from 'components/ui/DraggableBottomView/DraggableContent';
import {
  openDrawer,
  closeDrawer,
} from 'components/ui/DraggableBottomView/animationHelpers';

const DraggableBottomView = ({
  children,
  initialHiddenContentPercentage,
  externalRef,
  initiallyOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [componentHeight, setComponentHeight] = useState(0.0);
  const translateY = useRef(new Animated.Value(0)).current;

  const open = useCallback(
    (callback = () => {}) => {
      openDrawer(
        translateY,
        componentHeight > 0 ? componentHeight : scaleDp(300),
        initialHiddenContentPercentage,
        () => {
          setIsOpen(true);
          callback();
        },
      );
    },
    [translateY, componentHeight, initialHiddenContentPercentage, setIsOpen],
  );

  const close = useCallback(
    (cb = () => {}) => {
      closeDrawer(translateY, () => {
        setIsOpen(false);
        cb();
      });
    },
    [setIsOpen],
  );

  const measureContent = useCallback(
    (e) => {
      if (componentHeight === 0) {
        setComponentHeight(e.nativeEvent.layout.height);
        if (initiallyOpen) {
          open();
        }
      }
    },
    [open, initiallyOpen, setComponentHeight],
  );

  const onPanGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translateY}}],
    {useNativeDriver: true},
  );

  const onReleasePan = useCallback(
    ({nativeEvent}) => {
      const {state, oldState, translationY} = nativeEvent;
      if (oldState === State.BEGAN && state === State.ACTIVE) {
        translateY.setOffset(translateY.__getValue());
      }
      if (
        oldState === State.ACTIVE &&
        [State.END, State.CANCELLED].includes(state)
      ) {
        translateY.flattenOffset();
        translationY < 0 ? open() : close();
      }
    },
    [translateY, componentHeight],
  );

  useImperativeHandle(externalRef, () => ({
    open,
    close,
    isOpen,
  }));

  return (
    <PanGestureHandler
      minDist={10}
      onGestureEvent={onPanGestureEvent}
      onHandlerStateChange={onReleasePan}>
      <DraggableView
        onLayout={measureContent}
        style={{
          transform: [{translateY}],
          bottom: -(componentHeight * (1 - initialHiddenContentPercentage)),
        }}>
        <DraggableContent>
          {typeof children === 'function'
            ? children({isOpen, open, close})
            : children}
        </DraggableContent>
      </DraggableView>
    </PanGestureHandler>
  );
};

DraggableBottomView.defaultProps = {
  initialHiddenContentPercentage: 0.3,
};

const RefComponent = React.forwardRef((props, ref) => (
  <DraggableBottomView {...props} externalRef={ref} />
));

export default React.memo(RefComponent);

const DraggableView = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: ${theme.backgroundColor};
  align-items: center;
  width: 100%;
  ${Platform.OS === 'web' && 'overflow: hidden;'}
`;
