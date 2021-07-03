import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {theme} from 'constants/theme';
import {MainButton} from 'components/ui/MainButton';
import {Platform} from 'react-native';

export const PaginatedList = ({
  fetchDataFunction,
  pagination,
  loading,
  footerStyle,
  defaultPageSize = 10,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(pagination?.page || 1);
  const onEndReached = useCallback(
    ({distanceFromEnd}) => {
      if (
        page <= pagination.pageCount &&
        !fetching &&
        props?.data.length === pagination.page * pagination.pageSize
      ) {
        setFetching(true);
        fetchDataFunction?.(page + 1, pagination?.pageSize || defaultPageSize);
        setPage(page + 1);
      }
    },
    [fetching, page, pagination],
  );

  useEffect(() => {
    setFetching(loading);
  }, [loading]);

  return (
    <>
      <FlatList
        {...props}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={(_, i) => i.toString()}
        extraData={!!fetching}
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
        ListFooterComponentStyle={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
        ListFooterComponent={
          Platform.OS === 'web' &&
          !fetching &&
          page <= pagination.pageCount && (
            <ButtonContainer>
              <MainButton onPress={onEndReached}>Cargar más</MainButton>
            </ButtonContainer>
          )
        }
      />
      {fetching && (
        <FooterContainer style={footerStyle}>
          <ActivityIndicator size="small" color={theme.primaryColor} />
        </FooterContainer>
      )}
    </>
  );
};

PaginatedList.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
};

const FooterContainer = styled.View`
  padding: 20px 0;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  align-self: center;
`;
