import React, {useCallback, useEffect} from 'react';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import {FlatList} from 'react-native';
import {InsuranceItem} from 'components/MobileFullScreenModals/InsuranceSelectionModalScreen/InsuranceItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchInsurances,
  selectInsuranceList,
  selectInsuranceListError,
  selectLoadingInsuranceList,
} from 'redux-store/slices/insuranceSlice';
import {Loader} from 'components/ui/Loader';
import {AppText} from 'components/ui/AppText';

export default ({closeModal, onPressItem, selectedInsurance}) => {
  const dispatch = useDispatch();
  const list = useSelector(selectInsuranceList);
  const isLoading = useSelector(selectLoadingInsuranceList);
  const error = useSelector(selectInsuranceListError);

  useEffect(() => {
    dispatch(fetchInsurances());
  }, []);

  const _onPressItem = useCallback(
    item => () => {
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
        onPress={value => _onPressItem({...item, value})}
      />
    ),
    [selectedInsurance, _onPressItem],
  );

  return (
    <FullScreenModalContainer title="Seleccioná una opcion:">
      <Loader loading={isLoading} size="large">
        <FlatList
          keyExtractor={(_, i) => i.toString()}
          data={list}
          renderItem={renderItem}
          ListEmptyComponent={() => <AppText>{error}</AppText>}
        />
      </Loader>
    </FullScreenModalContainer>
  );
};
