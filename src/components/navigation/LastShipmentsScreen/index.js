import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {RefreshControl} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLastShipments,
  selectIsLoadingLastShipments,
  selectLastShipments,
  selectLastShipmentsError,
} from 'redux-store/slices/shipmentSlice';
import {Loader} from 'components/ui/Loader';
import {CommonList} from 'components/ui/CommonList';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {LastShipmentItem} from 'components/navigation/LastShipmentsScreen/LastShipmentItem';

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingLastShipments);
  const error = useSelector(selectLastShipmentsError);
  const lastShipmentList = useSelector(selectLastShipments);

  useEffect(() => {
    dispatch(fetchLastShipments());
  }, []);

  useEffect(() => {
    if (refreshing && !isLoading) {
      setRefreshing(false);
    }
  }, [isLoading, refreshing]);

  const renderItem = useCallback(({item}) => {
    return <LastShipmentItem {...item} />;
  }, []);

  return (
    <Screen removeTWF>
      <Loader loading={isLoading && !refreshing}>
        <Title padding={20}>Mis ultimos pedidos</Title>
        <List
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              title="Desliza para actualizar"
              titleColor={theme.primaryDarkColor}
              tintColor={theme.primaryColor}
              colors={[theme.primaryColor]}
              onRefresh={() => {
                setRefreshing(true);
                dispatch(fetchLastShipments());
              }}
            />
          }
          renderItem={renderItem}
          EmptyListComponent={() => <Title>{error}</Title>}
          data={lastShipmentList}
          keyExtractor={(_, i) => i.toString()}
        />
      </Loader>
    </Screen>
  );
};

const List = styled(CommonList)`
  flex: 1;
`;
