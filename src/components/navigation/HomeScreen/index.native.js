import React, {useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {DrawableBottomView} from 'components/ui/DrawableBottomView';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {OrderForm} from 'components/navigation/HomeScreen/OrderForm';
import Map from 'components/ui/Map/index';

export default () => {
  const {height, width} = useWindowDimension();
  return (
    <Screen style={{height, width}}>
      <Map style={{width, height}} />
      <DrawableBottomView>
        {({isOpen, open, close}) => <OrderForm open={open} isOpen={isOpen} />}
      </DrawableBottomView>
      <FloatingHamburguerButton />
    </Screen>
  );
};
