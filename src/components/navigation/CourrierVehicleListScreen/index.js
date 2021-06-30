import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import Screen from 'components/ui/Screen';
import {Loader} from 'components/ui/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchVehiclesList,
  selectIsLoadingVehicleList,
  selectVehicleList,
  selectVehicleListError,
} from 'redux-store/slices/personalData/vehicleSlice';
import {CommonList} from 'components/ui/CommonList';
import {VehicleItem} from 'components/navigation/CourrierVehicleListScreen/VehicleItem';
import {routes} from 'constants/config/routes';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingVehicleList);
  const error = useSelector(selectVehicleListError);
  const vehicles = useSelector(selectVehicleList);

  useEffect(() => {
    dispatch(fetchVehiclesList());
  }, []);

  const onPressItem = useCallback(
    item => {
      navigation.navigate(routes.vehicleDetailScreen, {vehicle: item});
    },
    [navigation],
  );

  const renderVehicle = useCallback(
    props => <VehicleItem onPress={onPressItem} {...props} />,
    [],
  );

  return (
    <Screen removeTWF>
      <Loader message="Cargando vehiculos" loading={isLoading} size="large">
        <List data={vehicles} renderItem={renderVehicle} />
      </Loader>
    </Screen>
  );
};

const List = styled(CommonList)`
  width: 100%;
  height: 100%;
`;
