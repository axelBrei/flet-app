import React, {useCallback} from 'react';
import styled from 'styled-components';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import {AppText} from 'components/ui/AppText';
import {FlatList} from 'react-native';
import {PaymentMethodItem} from 'components/MobileFullScreenModals/PaymentMethodsModalScreen/PaymenMethodItem';
import {useModalContext} from 'components/Hooks/useModal';
import {useUserData} from 'components/Hooks/useUserData';

const paymentMethodsList = [
  {
    id: 0,
    title: 'Efectivo',
    type: 'CASH',
    imageUrl: 'https://image.flaticon.com/icons/png/128/4343/4343031.png',
  },
  {
    id: 1,
    title: 'Tarjeta crédito/débito',
    type: 'CARD',
    imageUrl: 'https://image.flaticon.com/icons/png/128/4342/4342816.png',
  },
];

export default ({selectedMethod, onChangeSelectedMethod}) => {
  const {closeModal} = useModalContext();
  const {hasDebt} = useUserData();

  console.log(hasDebt);
  const onPressItem = useCallback(
    item => () => {
      onChangeSelectedMethod(item);
      closeModal?.();
    },
    [closeModal, onChangeSelectedMethod],
  );

  const renderItem = useCallback(
    ({item}) => (
      <PaymentMethodItem
        onPress={onPressItem(item)}
        selected={selectedMethod?.id === item.id}
        {...item}
      />
    ),
    [closeModal, selectedMethod, onChangeSelectedMethod],
  );
  return (
    <FullScreenModalContainer title="Métodos de pago">
      <FlatList
        data={paymentMethodsList.filter(p =>
          hasDebt ? p.type !== 'CASH' : true,
        )}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
      />
    </FullScreenModalContainer>
  );
};
