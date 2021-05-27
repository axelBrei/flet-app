import React, {useCallback, useRef, useImperativeHandle, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const _DraggableBottomView = ({children, snapPoints, externalRef}) => {
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      alwaysOpen={150}
      snapPoints={snapPoints || ['25%', '50%']}
      onChange={handleSheetChanges}>
      {children}
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
