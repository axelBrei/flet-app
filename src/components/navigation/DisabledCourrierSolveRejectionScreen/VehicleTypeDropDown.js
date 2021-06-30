import React, {useCallback, useEffect} from 'react';
import {Dropdown} from 'components/ui/Dropdown';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchVehicleTypes,
  selectLoadingVehicleTypes,
  selectVehicleTypes,
  selectVehicleTypesError,
} from 'redux-store/slices/vehicleTypesSlice';

export const VehicleTypeDropdown = ({onChangeText, ...props}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingVehicleTypes);
  const error = useSelector(selectVehicleTypesError);
  const vehicleTypes = useSelector(selectVehicleTypes);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
  }, [dispatch]);

  const onItemPress = useCallback(
    item => {
      onChangeText(item.id);
    },
    [onChangeText],
  );

  return (
    <Dropdown
      loading={isLoading}
      data={vehicleTypes}
      onItemPress={onItemPress}
      error={error || props.error}
      {...props}
    />
  );
};
