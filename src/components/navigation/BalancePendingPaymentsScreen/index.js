import React, {useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPendingPayments,
  selectBalancePendingPayments,
  selectBalancePendingPaymentsError,
  selectIsLoadingBalancePendingPayments,
  selectIsLoadingPageBalancePendingPayments,
} from 'redux-store/slices/balanceSlice';
import {PaginatedList} from 'components/ui/PaginatedList';
import {PendingPaymentItem} from 'components/navigation/BalancePendingPaymentsScreen/PendingPaymentItem';
import {Loader} from 'components/ui/Loader';
import {EmptyPaymentList} from 'components/navigation/BalancePendingPaymentsScreen/EmptyPaymentsList';

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingBalancePendingPayments);
  const isLoadingPage = useSelector(selectIsLoadingPageBalancePendingPayments);
  const error = useSelector(selectBalancePendingPaymentsError);
  const {result, pagination} = useSelector(selectBalancePendingPayments);

  useEffect(() => {
    dispatch(fetchPendingPayments(1, 20));
  }, []);

  const fetchPage = useCallback((page, pageSize) => {
    dispatch(fetchPendingPayments(page, pageSize));
  }, []);
  return (
    <Screen removeTWF>
      <Loader loading={isLoading} message="Cargando pagos pendientes" unmount>
        <PaginatedList
          pagination={pagination}
          data={error ? [] : result}
          contentContainerStyle={(error || result.length === 0) && {flex: 1}}
          loading={isLoadingPage}
          defaultPageSize={20}
          fetchDataFunction={fetchPage}
          ListEmptyComponent={<EmptyPaymentList error={error} />}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          renderItem={PendingPaymentItem}
        />
      </Loader>
    </Screen>
  );
};
