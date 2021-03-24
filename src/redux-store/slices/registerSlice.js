import {createSlice} from '@reduxjs/toolkit';
import loginService from 'services/loginService';
import {initialValues as commonInitialValues} from 'components/navigation/RegisterScreen/formikConfig';
import {initialValues as driverDataInitialValues} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';
import {initialValues as vehiculeDataInitialValues} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {initialValues as legalDataInitialValues} from 'components/navigation/RegisterDriverLegalDataScreen/legalDriverDataFormikConfig';
import {receiveLoginSuccess} from 'redux-store/slices/loginSlice';

const initialState = {
  userToken: null,
  courrier_id: null,
  data: {
    common: commonInitialValues({}),
    driverData: driverDataInitialValues({}, true),
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
      state.data = initialState.data;
    },
    receiveRegisterFail: (state, action) => {
      state.loading.data = false;
      state.error.data = action.payload;
    },
    receiveCourrierDataSuccess: (
      state,
      {payload: {courrierId, userToken, ...payload}},
    ) => {
      state.loading.data = false;
      state.data.driverData = payload;
      state.courrier_id = courrierId;
      state.userToken = userToken;
    },
    receiveCourrierVehicleDataSuccess: (state, action) => {
      state.loading.data = false;
    },
    receiveCourrierLegaldataSuccess: (state, action) => {
      state.loading.data = false;
    },
    updateCommonUserData: (state, action) => {
      state.data.common = action.payload;
    },
  },
  extraReducers: {
    'login/logout': (state) => {
      Object.assign(state, initialState);
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
  updateCommonUserData,
} = slice.actions;

/**
 * @THUNK
 */

export const registerUser = (personalData, isDriver) => async (
  dispatch,
  getState,
) => {
  const accountUserData = selectCommonRegisterData(getState());
  dispatch(requestRegister());
  try {
    const {countryCode, areaCode, number, ...courrierData} = personalData;
    const user = {
      ...accountUserData,
      phone: {
        countryCode: countryCode,
        areaCode: areaCode,
        number: number,
      },
    };
    const {data} = await loginService.registerNewUser(user);
    try {
      isDriver &&
        (await dispatch(
          registerDriverPersonalData(courrierData, data.userToken),
        ));
    } catch (e) {
      return await dispatch(registerDriverPersonalData(courrierData));
    }
    !isDriver && dispatch(receiveLoginSuccess({...user, ...data}));
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverPersonalData = (
  {profile, dateOfBirth, ...personalData},
  token,
) => async (dispatch) => {
  dispatch(requestRegister());
  try {
    const {data} = await loginService.registerCourrierPersonalData(
      {
        ...personalData,
        dateOfBirth: dateOfBirth?.format('DD/MM/YYYY'),
        document: parseInt(personalData.document),
      },
      token,
    );
    dispatch(
      receiveCourrierDataSuccess({
        userToken: token,
        ...data,
        profile,
        ...personalData,
        dateOfBirth: dateOfBirth?.format('DD/MM/YYYY'),
      }),
    );
  } catch (e) {
    console.log(e);
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
    const {licenseFront, licenseBack, carYear, ...values} = vehicleData;
    vehicleData.carYear = parseInt(carYear);
    await loginService.registerCourrierVehicleData({
      ...values,
      carYear: parseInt(carYear),
      courrier_id,
    });
    dispatch(receiveCourrierVehicleDataSuccess(vehicleData));
  } catch (e) {
    console.log(e);
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverLegaleData = (legalData) => async (
  dispatch,
  getState,
) => {
  dispatch(requestRegister());
  try {
    await loginService.registerCourrierLegalData(legalData);
    dispatch(receiveCourrierLegaldataSuccess());
  } catch (e) {
    console.log(e);
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

/**
 * @SELECTORS
 */
export const selectIsLoadingRegister = (state) => state.register.loading.data;
export const selectRegisterError = (state) => state.register.error.data;

export const selectCommonRegisterData = (state) =>
  state.register.data?.common || {};

export const selectRegisterDriverData = (state) =>
  state.register.data?.driverData || {};
