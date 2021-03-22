import React, {useCallback} from 'react';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import {FlatList} from 'react-native';
import {InsuranceItem} from 'components/MobileFullScreenModals/InsuranceSelectionModalScreen/InsuranceItem';

const list = [
  {
    id: 0,
    title: 'Sin cobertura',
    description: 'No se asegura el paquete',
    valueModificator: 0,
  },
  {
    id: 1,
    title: 'Básico',
    description: 'Se asegura un 10% del valor del paquete',
    valueModificator: 0.1,
  },
  {
    id: 2,
    title: 'Plus',
    description: 'Se asegura un 25% del valor del paquete',
    valueModificator: 0.25,
  },
  {
    id: 3,
    title: 'Ultra',
    description: 'Se asegura un 50% del valor del paquete',
    valueModificator: 0.5,
  },
];

export default ({closeModal, onPressItem, selectedInsurance}) => {
  const _onPressItem = useCallback(
    (item) => () => {
      onPressItem(item);
      closeModal();
    },
    [onPressItem, closeModal],
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <InsuranceItem
        selected={selectedInsurance?.id === item?.id}
        index={index}
        {...item}
        onPress={(value) => _onPressItem({...item, value})}
      />
    ),
    [selectedInsurance, _onPressItem],
  );

  return (
    <FullScreenModalContainer title="Seleccioná una opcion:">
      <FlatList
        keyExtractor={(_, i) => i.toString()}
        data={list}
        renderItem={renderItem}
      />
    </FullScreenModalContainer>
  );
};
