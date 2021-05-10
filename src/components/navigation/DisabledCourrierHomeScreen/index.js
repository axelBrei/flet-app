import React, {useCallback, useEffect, useState} from 'react';
import {Screen} from 'components/ui/Screen';
import {Title} from 'components/ui/Title';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCourrierRejectionsList,
  selectIsLoadingCourrierRejections,
} from 'redux-store/slices/driverSlice';
import {RejectionsList} from 'components/navigation/DisabledCourrierHomeScreen/RejectionsList';
import {Loader} from 'components/ui/Loader';
import {theme} from 'constants/theme';
import {ScrollView, RefreshControl} from 'react-native';

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingCourrierRejections);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchCourrierRejectionsList());
  }, [dispatch]);

  useEffect(() => {
    if (refreshing && !isLoading) {
      setRefreshing(isLoading);
    }
  }, [refreshing, isLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCourrierRejectionsList());
  }, [dispatch]);

  return (
    <ScreenComponent>
      <Loader
        loading={!refreshing && isLoading}
        size="large"
        message="Estamos buscando tu estado."
        unmount>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={theme.primaryColor}
              refreshing={refreshing}
              color={theme.primaryColor}
              onRefresh={onRefresh}
            />
          }>
          <Title>Todavía no estas habilitado</Title>
          <AppText>
            Acá vas a poder ver las actualizaciones de tu perfil
          </AppText>
          <RejectionsList />
        </ScrollView>
      </Loader>
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  padding: 20px 20px;
`;
