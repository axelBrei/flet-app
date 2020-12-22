import React, {useState} from 'react';
import {Screen} from 'components/ui/Screen';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {DrawableBottomView} from 'components/ui/DrawableBottomView';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {OrderForm} from 'components/navigation/HomeScreen/OrderForm';
import Map from 'components/ui/Map/index';

export default () => {
  const {height, width} = useWindowDimension();
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  console.log(startPoint, endPoint);
  return (
    <Screen style={{height, width}} enableAvoidKeyboard={false}>
      <Map
        style={{width, height}}
        markers={[startPoint, endPoint]}
        minMarkerAnimation={1}
      />
      <DrawableBottomView>
        {({isOpen, open, close}) => (
          <OrderForm
            open={open}
            isOpen={isOpen}
            close={close}
            onSelectStartPoint={setStartPoint}
            onSelectEndPoint={setEndPoint}
          />
        )}
      </DrawableBottomView>
      <FloatingHamburguerButton />
    </Screen>
  );
};
