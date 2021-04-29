import {createSlice} from '@reduxjs/toolkit';
import vehicleService from 'services/vehicleService';

const initialState = {
  data: {
    list: [],
  },
  loading: {
    fetch: false,
  },
  error: {
    fetch: null,
  },
};

const slice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    requestVehicleList: state => {
      state.loading.fetch = true;
      state.error.fetch = null;
    },
    receiveVechileListSuccess: (state, action) => {
      state.loading.fetch = false;
      state.data.list = action.payload;
    },
    receiveVechileListFail: (state, action) => {
      state.loading.fetch = false;
      state.error.fetch = action.payload;
    },
  },
});

export default {[slice.name]: slice.reducer};
export const {
  requestVehicleList,
  receiveVechileListSuccess,
  receiveVechileListFail,
} = slice.actions;

// THUNK
export const fetchVehiclesList = () => async dispatch => {
  dispatch(requestVehicleList());
  try {
    const {data} = await vehicleService.getCourrierVehicles();
    dispatch(receiveVechileListSuccess(data));
  } catch (e) {
    dispatch(receiveVechileListFail(e.response?.data?.message || e));
  }
};

// SELECTORS

export const selectIsLoadingVehicleList = state =>
  state.personalData[slice.name].loading.fetch;
export const selectVehicleListError = state =>
  state.personalData[slice.name].error.fetch;
export const selectVehicleList = state =>
  state.personalData[slice.name].data.list;
