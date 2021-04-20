import {createSlice} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import FormData from 'form-data';
import loginService from 'services/loginService';
import {initialValues as commonInitialValues} from 'components/navigation/RegisterScreen/formikConfig';
import {initialValues as driverDataInitialValues} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';
import {initialValues as vehiculeDataInitialValues} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import {initialValues as legalDataInitialValues} from 'components/navigation/RegisterDriverLegalDataScreen/legalDriverDataFormikConfig';
import {receiveLoginSuccess} from 'redux-store/slices/loginSlice';
import {keysToSnakeCase} from 'helpers/objectHelper';

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
    requestRegister: state => {
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
    'login/logout': state => {
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
    dispatch(receiveLoginSuccess({...user, ...data}));
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverPersonalData = (
  {profile, dateOfBirth, ...personalData},
  token,
) => async (dispatch, getState) => {
  dispatch(requestRegister());
  const accountUserData = selectCommonRegisterData(getState());
  try {
    const form = new FormData();
    form.append('date_of_birth', dateOfBirth?.format('DD/MM/YYYY'));
    form.append('document', parseInt(personalData.document));
    form.append('name', accountUserData.name);
    form.append('last_name', accountUserData.lastName);
    form.append('email', accountUserData.email);
    form.append('password', accountUserData.password);
    form.append('phone.country_code', personalData.countryCode);
    form.append('phone.area_code', personalData.areaCode);
    form.append('phone.number', personalData.number);

    if (Platform.OS == 'web') {
      form.append('file', profile.original, profile.filename);
    } else {
      form.append('file', profile);
    }

    const {data} = await loginService.registerCourrierPersonalData(form, token);
    delete profile.original;
    dispatch(
      receiveCourrierDataSuccess({
        userToken: token,
        ...data,
        profileImage: profile,
        ...personalData,
        dateOfBirth: dateOfBirth?.format('DD/MM/YYYY'),
      }),
    );
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

export const registerDriverVehicleData = vehicleData => async (
  dispatch,
  getState,
) => {
  dispatch(requestRegister());
  try {
    const {courrier_id} = getState().register;
    vehicleData.carYear = parseInt(vehicleData.carYear);
    const {licenseFront, licenseBack, ...values} = vehicleData;
    const form = new FormData();
    const snakeCaseObj = keysToSnakeCase(values);
    Object.keys(snakeCaseObj).forEach(key => {
      form.append(key, snakeCaseObj[key]);
    });
    form.append('courrier_id', courrier_id);
    if (Platform.OS == 'web') {
      form.append(
        'license_front',
        licenseFront.original,
        licenseFront.filename,
      );
      form.append('license_back', licenseBack.original, licenseBack.filename);
    } else {
      form.append('license_front', licenseFront);
      form.append('license_back', licenseBack);
    }
    await loginService.registerCourrierVehicleData(form);
    dispatch(receiveCourrierVehicleDataSuccess(vehicleData));
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

const appendToForm = (form, fieldname, image) => {
  Platform.OS === 'web'
    ? form.append(fieldname, image.original, image.fieldname)
    : form.append(fieldname, image);
};

export const registerDriverLegaleData = legalData => async (
  dispatch,
  getState,
) => {
  dispatch(requestRegister());
  try {
    const {courrier_id} = getState().register;
    const form = new FormData();
    form.append('courrier_id', courrier_id);
    appendToForm(form, 'address_validation', legalData.addressValidation);
    appendToForm(form, 'background', legalData.background);
    appendToForm(form, 'document_back', legalData.documentBack);
    appendToForm(form, 'document_front', legalData.documentFront);
    appendToForm(form, 'driver_permit_front', legalData.driverPermitFront);
    appendToForm(form, 'driver_permit_back', legalData.driverPermitBack);
    appendToForm(form, 'insurance', legalData.insurance);
    await loginService.registerCourrierLegalData(form);
    dispatch(receiveCourrierLegaldataSuccess());
  } catch (e) {
    dispatch(receiveRegisterFail(e?.response?.message || e));
  }
};

/**
 * @SELECTORS
 */
export const selectIsLoadingRegister = state => state.register.loading.data;
export const selectRegisterError = state => state.register.error.data;

export const selectCommonRegisterData = state =>
  state.register.data?.common || {};

export const selectRegisterDriverData = state =>
  state.register.data?.driverData || {};
