import {createSlice} from '@reduxjs/toolkit';
import personalDataService from 'services/personalDataService';

const initialState = {
  telephones: [],
  loading: {
    data: false,
    update: false,
    delete: -1,
  },
  error: {
    data: null,
    update: null,
    delete: null,
  },
};

const slice = createSlice({
  name: 'telephones',
  initialState,
  reducers: {
    requestTelephones: state => {
      state.loading.data = true;
      state.error.data = null;
    },
    receiveTelephonesSuccess: (state, action) => {
      state.loading.data = false;
      state.telephones = action.payload;
    },
    receiveTelephonesFail: (state, action) => {
      state.loading.data = false;
      state.error.data = action.payload;
    },
    requestAddTelephone: state => {
      state.loading.update = true;
      state.error.update = null;
    },
    receiveAddTelephoneSuccess: (state, action) => {
      state.loading.update = false;
      state.telephones = [...state.telephones, action.payload];
    },
    receiveAddTelephoneFail: (state, action) => {
      state.loading.update = false;
      state.error.update = action.payload;
    },
    requestDeleteTelephone: (state, action) => {
      state.loading.delete = action.payload;
      state.error.update = null;
    },
    receiveDeleteTelephoneSuccess: (state, action) => {
      state.loading.delete = -1;
      state.telephones = state.telephones.filter(
        phone => phone.id !== action.payload,
      );
    },
    receiveDeleteTelephoneFail: (state, action) => {
      state.loading.delete = -1;
      state.error.update = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  requestTelephones,
  receiveTelephonesSuccess,
  receiveTelephonesFail,
  requestAddTelephone,
  receiveAddTelephoneSuccess,
  receiveAddTelephoneFail,
  requestDeleteTelephone,
  receiveDeleteTelephoneSuccess,
  receiveDeleteTelephoneFail,
} = slice.actions;

//THUNK
export const fetchTelephones = () => async dispatch => {
  dispatch(requestTelephones());
  try {
    const {data} = await personalDataService.getTelephones();
    dispatch(receiveTelephonesSuccess(data));
  } catch (e) {
    dispatch(receiveTelephonesFail(e.response?.data?.message || e));
  }
};

export const fetchAddTelephone = phoneData => async dispatch => {
  dispatch(requestAddTelephone());
  try {
    const {data} = await personalDataService.addTelephone(phoneData);
    dispatch(
      receiveAddTelephoneSuccess({
        ...data,
        ...phoneData,
      }),
    );
  } catch (e) {
    dispatch(receiveAddTelephoneFail(e.response?.data?.message || e));
  }
};

export const fetchDeleteTelephone = phoneId => async dispatch => {
  dispatch(requestDeleteTelephone(phoneId));
  try {
    await personalDataService.deleteTelephone(phoneId);
    dispatch(receiveDeleteTelephoneSuccess(phoneId));
  } catch (e) {
    dispatch(receiveDeleteTelephoneFail(e.response?.data?.message || e));
  }
};
// SELECTORS
export const selectIsLoadingPersonalDataTelephones = state =>
  state.personalData.telephones.loading.data;
export const selectPersonalDataTelephonesError = state =>
  state.personalData.telephones.error.data;
export const selectUserTelephons = state =>
  state.personalData.telephones.telephones;

export const selectIsLoadingUpdateTelephones = state =>
  state.personalData.telephones.loading.update;
export const selectUpdateTelephonesError = state =>
  state.personalData.telephones.error.update;

export const selectDeletingTelephoneId = state =>
  state.personalData.telephones.loading.delete;
