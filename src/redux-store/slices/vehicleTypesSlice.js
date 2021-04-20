import {createSelector, createSlice} from '@reduxjs/toolkit';
import vehiclesTypesService from 'services/vehiclesTypesService';

const initialState = {
  vehicleTypes: [],
  loading: {
    types: false,
  },
  error: {
    types: null,
  },
};

const slice = createSlice({
  name: 'vehicleTypes',
  initialState,
  reducers: {
    requestVehicleTypes: state => {
      state.loading.types = true;
      state.error.types = null;
    },
    receiveVehicleTypesSuccess: (state, action) => {
      state.loading.types = false;
      state.vehicleTypes = action.payload;
    },
    receiveVehicleTypesFail: (state, action) => {
      state.loading.types = false;
      state.error.types = action.payload;
    },
  },
});
export default slice.reducer;

export const {
  requestVehicleTypes,
  receiveVehicleTypesSuccess,
  receiveVehicleTypesFail,
} = slice.actions;

/*
 * @THUNK
 */

export const fetchVehicleTypes = () => async dispatch => {
  dispatch(requestVehicleTypes());

  try {
    const {data} = await vehiclesTypesService.fetchVehivleTypes();
    dispatch(receiveVehicleTypesSuccess(data?.results));
  } catch (e) {
    dispatch(receiveVehicleTypesFail(e?.response?.message || e));
  }
};

/*
 * @SELECTORS
 */
export const selectLoadingVehicleTypes = state =>
  state.vehicleTypes.loading.types;
export const selectVehicleTypesError = state => state.vehicleTypes.error.types;
export const selectVehicleTypes = createSelector(
  state => state.vehicleTypes.vehicleTypes || [],
  types => Object.values(types).reduce((acc, curr) => [...acc, curr], []),
);
