import React, {useCallback, useState} from 'react';
import {View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {theme} from 'constants/theme';
import {fetchLastShipments} from 'redux-store/slices/shipmentSlice';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const PaginatedList = ({
  fetchDataFunction,
  pagination,
  footerStyle,
  defaultPageSize = 10,
  ...props
}) => {
  const {isMobile, widthWithPadding} = useWindowDimension();
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(pagination?.page || 1);
  const onEndReached = useCallback(
    ({distanceFromEnd}) => {
      if (!fetching && distanceFromEnd < 150) {
        setFetching(true);
        fetchDataFunction?.(page + 1, pagination?.pageSize || defaultPageSize);
        setPage(page + 1);
      }
    },
    [fetching, page],
  );

  return (
    <FlatList
      {...props}
      onEndReached={onEndReached}
      keyExtractor={(_, i) => i.toString()}
      ListFooterComponent={() => (
        <View style={[{flex: 1}, footerStyle]}>
          <ActivityIndicator size="small" color={theme.primaryColor} />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          title="Desliza para actualizar"
          titleColor={theme.primaryDarkColor}
          tintColor={theme.primaryColor}
          colors={[theme.primaryColor]}
          onRefresh={() => {
            fetchDataFunction?.(page, defaultPageSize);
            setFetching(true);
          }}
        />
      }
    />
  );
};

PaginatedList.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
};
