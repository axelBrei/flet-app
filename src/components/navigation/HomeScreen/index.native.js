import React, {useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {DrawableBottomView} from 'components/ui/DrawableBottomView';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {OrderForm} from 'components/navigation/HomeScreen/OrderForm';

export default () => {
  const {height} = useWindowDimension();
  return (
    <Screen style={{flex: 1, height, width: '100%'}}>
      <DrawableBottomView>
        {({isOpen, open, close}) => <OrderForm open={open} isOpen={isOpen} />}
      </DrawableBottomView>
      <FloatingHamburguerButton />
    </Screen>
  );
};
