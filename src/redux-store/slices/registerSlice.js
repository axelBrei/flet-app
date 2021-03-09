import {createSlice} from '@reduxjs/toolkit';
import loginService from 'services/loginService';
import {initialValues as commonInitialValues} from 'components/navigation/RegisterScreen/formikConfig';
import {initialValues as driverDataInitialValues} from 'components/navigation/RegisterDriverDataScreen/registerDriverDataFormikConfig';
import {initialValues as vehiculeDataInitialValues} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {initialValues as legalDataInitialValues} from 'components/navigation/RegisterDriverLegalDataScreen/legalDriverDataFormikConfig';
import {receiveLoginSuccess} from 'redux-store/slices/loginSlice';

const initialState = {
  userToken: null,
  courrier_id: null,
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
    requestRegister: (state) => {
      state.loading.data = true;
      state.error.data = null;
    },
    receiveRegisterSuccess: (state, {payload}) => {
      state.loading.data = false;
      state.userToken = payload.userToken;
    },
    receiveRegisterFail: (state, action) => {
      state.loading.data = false;
      state.error.data = action.payload;
    },
    receiveCourrierDataSuccess: (state, action) => {
      state.loading.data = false;
      state.courrier_id = action.payload;
    },
    receiveCourrierVehicleDataSuccess: (state, action) => {
      state.loading.data = false;
    },
    receiveCourrierLegaldataSuccess: (state, action) => {
      state.loading.data = false;
    },
  },
});

export default slice.reducer;

export const {
  receiveCourrierDataSuccess,
  receiveCourrierLegaldataSuccess,
  receiveCourrierVehicleDataSuccess,
  requestRegister,
  receiveRegisterSuccess,
  receiveRegisterFail,
} = slice.actions;

/**
 * @THUNK
 */

export const registerUser = (
  {phone, ...userData},
  dispatchLogin = true,
) => async (dispatch) => {
  dispatch(requestRegister());
  try {
    const user = {
      ...userData,
      phone: {
        country_code: '0054',
        area_code: '911',
        number: phone,
      },
    };
    const {data} = await loginService.registerNewUser(user);
    dispatch(receiveRegisterSuccess({...user, ...data}));
    dispatchLogin && dispatch(receiveLoginSuccess({...user, ...data}));
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverPersonalData = (personalData) => async (
  dispatch,
  getState,
) => {
  dispatch(requestRegister());
  try {
    delete personalData.profileImage;
    personalData.document = parseInt(personalData.document);
    const {data} = await loginService.registerCourrierPersonalData(
      personalData,
    );
    dispatch(receiveCourrierDataSuccess(data));
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverVehicleData = (vehicleData) => async (
  dispatch,
  getState,
) => {
  dispatch(requestRegister());
  try {
    const {courrier_id} = getState().register;
    vehicleData.carYear = parseInt(vehicleData.carYear);
    await loginService.registerCourrierVehicleData({
      ...vehicleData,
      ...courrier_id,
    });
    dispatch(receiveCourrierVehicleDataSuccess());
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverLegaleData = (legalData) => async (
  dispatch,
  getState,
) => {
  dispatch(requestRegister());
  try {
    const {courrier_id} = getState().register;
    await loginService.registerCourrierLegalData({
      ...legalData,
      ...courrier_id,
    });
    dispatch(receiveCourrierLegaldataSuccess());
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

/**
 * @SELECTORS
 */
export const selectIsLoadingRegister = (state) => state.register.loading.data;
export const selectRegisterError = (state) => state.register.error.data;
