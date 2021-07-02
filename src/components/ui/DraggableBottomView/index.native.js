import React, {useCallback, useRef, useImperativeHandle, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {AppText} from 'components/ui/AppText';
import {applyShadow} from 'helpers/uiHelper';

const _DraggableBottomView = ({
  children,
  snapPoints = ['40%', '100%'],
  externalRef,
}) => {
  const bottomSheetRef = useRef(null);
  const {height: screenHeight} = useWindowDimension();
  const [isOpen, setIsOpen] = useState(false);
  const [localSnapPoints, setLocalSnapPoints] = useState(snapPoints);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setIsOpen(index > 0);
  }, []);

  const open = useCallback(() => {}, []);
  const close = useCallback(() => {}, []);

  useImperativeHandle(externalRef, () => ({
    open,
    close,
    isOpen,
  }));

  const onChildrenLayout = useCallback(
    ({nativeEvent: {layout}}) => {
      const {height} = layout;
      setLocalSnapPoints(
        snapPoints.map((point, index) => {
          const numberPercentage = Number(point.replace('%', '')) / 100;
          const visiblePercentage = (numberPercentage * height) / screenHeight;
          return `${Math.min(100, Math.ceil(visiblePercentage * 100))}%`;
        }),
      );
    },
    [screenHeight],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      alwaysOpen={150}
      style={applyShadow(false)}
      snapPoints={localSnapPoints}
      onChange={handleSheetChanges}>
      <View onLayout={onChildrenLayout}>{children}</View>
    </BottomSheet>
  );
};

_DraggableBottomView.defaultProps = {
  initialHiddenContentPercentage: 0.3,
};

const DraggableBottomView = React.forwardRef((props, ref) => (
  <_DraggableBottomView {...props} externalRef={ref} />
));

export default DraggableBottomView;
