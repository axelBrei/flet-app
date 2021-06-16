import React, {useCallback, useEffect, useState} from 'react';
import Screen from 'components/ui/Screen';
import {Title} from 'components/ui/Title';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLastShipments,
  selectIsLoadingLastShipments,
  selectLastShipments,
  selectLastShipmentsError,
  selectLastShipmentsPagination,
} from 'redux-store/slices/shipmentSlice';
import styled from 'styled-components';
import {PaginatedList} from 'components/ui/PaginatedList';
import {LastShipmentItem} from 'components/navigation/LastShipmentsScreen/LastShipmentItem';
import {routes} from 'constants/config/routes';

const LastShipmentsScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingLastShipments);
  const error = useSelector(selectLastShipmentsError);
  const lastShipmentList = useSelector(selectLastShipments);
  const pagination = useSelector(selectLastShipmentsPagination);

  useEffect(() => {
    dispatch(fetchLastShipments(1, 10));
  }, []);

  useEffect(() => {
    if (refreshing && !isLoading) {
      setRefreshing(false);
    }
  }, [isLoading, refreshing]);

  const renderItem = useCallback(({item, index}) => {
    return (
      <LastShipmentItem
        {...item}
        onPressViewMore={() => {
          navigation.navigate(routes.lastShipmentsDetailScreen, {
            shipment: item,
          });
        }}
      />
    );
  }, []);

  const fetchNewPage = useCallback((page, pageSize) => {
    dispatch(fetchLastShipments(page, pageSize));
  }, []);

  return (
    <Screen removeTWF enableAvoidKeyboard={false} scrollable={false}>
      <Title padding={20}>Mis últimos pedidos</Title>
      <List
        defaultPageSize={10}
        loading={isLoading}
        pagination={pagination}
        initialNumToRender={5}
        fetchDataFunction={fetchNewPage}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        EmptyListComponent={() => <Title>{error}</Title>}
        data={lastShipmentList}
        getItemLayout={(data, index) => {
          const height =
            (data[index]?.destinations.length === 3 ? 228 : 193) + 18;
          return {
            length: height,
            offset: height * index,
            index,
          };
        }}
      />
    </Screen>
  );
};
export default LastShipmentsScreen;

const List = styled(PaginatedList)`
  flex: 1;
  min-height: ${props => props.theme.screenHeight - 100}px;
`;
