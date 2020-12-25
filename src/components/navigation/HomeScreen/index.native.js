import React, {useState} from 'react';
import {Screen} from 'components/ui/Screen';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import DraggableBottomView from 'components/ui/DraggableBottomView/index';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {OrderForm} from 'components/navigation/HomeScreen/OrderForm';
import Map from 'components/ui/Map/index';
import {scaleDp} from 'helpers/responsiveHelper';

export default () => {
  const {height, width} = useWindowDimension();
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  return (
    <Screen style={{height, width}} enableAvoidKeyboard={false}>
      <Map
        style={{width, height}}
        markers={[startPoint, endPoint]}
        minMarkerAnimation={1}
        edgePadding={{
          bottom: scaleDp(550),
          right: scaleDp(50),
          top: scaleDp(50),
          left: scaleDp(50),
        }}
      />
      <DraggableBottomView>
        {({isOpen, open, close}) => (
          <OrderForm
            open={open}
            isOpen={isOpen}
            close={close}
            onSelectStartPoint={setStartPoint}
            onSelectEndPoint={setEndPoint}
          />
        )}
      </DraggableBottomView>
      <FloatingHamburguerButton />
    </Screen>
  );
};
