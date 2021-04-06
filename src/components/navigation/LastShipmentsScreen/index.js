import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {RefreshControl} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLastShipments,
  selectIsLoadingLastShipments,
  selectLastShipments,
  selectLastShipmentsError,
  selectLastShipmentsPagination,
} from 'redux-store/slices/shipmentSlice';
import {Loader} from 'components/ui/Loader';
import {PaginatedList} from 'components/ui/PaginatedList';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {LastShipmentItem} from 'components/navigation/LastShipmentsScreen/LastShipmentItem';
import {Platform} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default () => {
  const {isMobile} = useWindowDimension();
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

  const renderItem = useCallback(({item}) => {
    return <LastShipmentItem {...item} />;
  }, []);

  const fetchNewPage = useCallback((page, pageSize) => {
    dispatch(fetchLastShipments(page, pageSize));
  }, []);

  return (
    <Screen removeTWF scrollable={Platform.OS === 'web'}>
      {/*<Loader loading={isLoading && !refreshing} size="large">*/}
      <Title padding={20}>Mis ultimos pedidos</Title>
      <List
        defaultPageSize={10}
        pagination={pagination}
        fetchDataFunction={fetchNewPage}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        renderItem={renderItem}
        EmptyListComponent={() => <Title>{error}</Title>}
        data={lastShipmentList}
        footerStyle={
          !isMobile && {
            maxWidth: 550,
          }
        }
      />
      {/*</Loader>*/}
    </Screen>
  );
};

const List = styled(PaginatedList)`
  flex: 1;
  min-height: ${props => props.theme.screenHeight - 100}px;
`;
