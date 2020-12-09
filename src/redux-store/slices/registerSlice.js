import {createSlice} from '@reduxjs/toolkit';
import {initialValues as commonInitialValues} from 'components/navigation/RegisterScreen/formikConfig';
import {initialValues as driverDataInitialValues} from 'components/navigation/RegisterDriverDataScreen/registerDriverDataFormikConfig';
import {initialValues as vehiculeDataInitialValues} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {initialValues as legalDataInitialValues} from 'components/navigation/RegisterDriverLegalDataScreen/legalDriverDataFormikConfig';

const initialState = {
  data: {
    common: commonInitialValues,
    driverData: driverDataInitialValues,
    vehiculeData: vehiculeDataInitialValues,
    legalData: legalDataInitialValues,
  },
  loading: {
    data: false,
  },
  error: {
    data: null,
  },
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateRegisterData: (state, action) => {
      state.data.common = action.payload;
    },
    updateDriverData: (state, action) => {
      state.data.driverData = action.payload;
    },
    updateVehiculeData: (state, action) => {
      state.data.vehiculeData = action.payload;
    },
    updateLegalData: (state, action) => {
      state.data.legalData = action.payload;
    },
    requestRegister: (state) => {
      state.loading.data = true;
      state.error.data = null;
    },
    receiveRegisterSuccess: (state, action) => {
      state.loading.data = false;
      state.data = initialState.data;
    },
    receiveRegisterFail: (state, action) => {
      state.loading.data = false;
      state.error.data = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  updateDriverData,
  updateLegalData,
  updateRegisterData,
  updateVehiculeData,
  requestRegister,
  receiveRegisterSuccess,
  receiveRegisterFail,
} = slice.actions;

/**
 * @THUNK
 */

export const registerUser = () => async (dispatch) => {};

export const registerDriver = (legalData) => async (dispatch) => {};

/**
 * @SELECTORS
 */
