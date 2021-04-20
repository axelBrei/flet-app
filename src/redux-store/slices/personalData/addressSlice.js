import {createSlice} from '@reduxjs/toolkit';
import personalDataService from 'services/personalDataService';

const initialState = {
  address: [],
  loading: {
    fetch: false,
    submit: false,
    delete: -1,
  },
  error: {
    fetch: null,
    submit: null,
    delete: null,
  },
};

const slice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    requestUserAddresses: state => {
      state.loading.fetch = true;
      state.error.fetch = null;
    },
    receiveUserAddressSuccess: (state, action) => {
      state.loading.fetch = false;
      state.address = action.payload;
    },
    receiveUserAddressFail: (state, action) => {
      state.loading.fetch = true;
      state.error.fetch = action.payload;
    },
    requestSubmitNewAddress: state => {
      state.loading.submit = true;
      state.error.submit = null;
    },
    receiveSubmitNewAddressSuccess: (state, action) => {
      state.loading.submit = false;
      state.address.push(action.payload);
    },
    receiveSubmitNewAddressFail: (state, action) => {
      state.loading.submit = false;
      state.error.submit = action.payload;
    },
    requestDeleteAddress: (state, action) => {
      state.loading.delete = action.payload;
      state.error.submit = null;
    },
    receiveDeleteAddressSuccess: state => {
      state.address = state.address.filter(a => a.id !== state.loading.delete);
      state.loading.delete = -1;
    },
    receiveDeleteAddressFail: (state, action) => {
      state.loading.delete = -1;
      state.error.delete = action.payload;
    },
  },
});
export default {[slice.name]: slice.reducer};
export const {
  requestUserAddresses,
  receiveUserAddressSuccess,
  receiveUserAddressFail,
  requestSubmitNewAddress,
  receiveSubmitNewAddressSuccess,
  receiveSubmitNewAddressFail,
  requestDeleteAddress,
  receiveDeleteAddressSuccess,
  receiveDeleteAddressFail,
} = slice.actions;

// THUNK

export const fetchUserAddresses = () => async dispatch => {
  dispatch(requestUserAddresses());
  try {
    const {data} = await personalDataService.getUserAddresses();
    dispatch(receiveUserAddressSuccess(data));
  } catch (e) {
    dispatch(receiveUserAddressFail(e.response?.data?.message || e));
  }
};

export const submitNewAddres = addressData => async dispatch => {
  dispatch(requestSubmitNewAddress());
  try {
    const {data} = await personalDataService.addUserAddres(addressData);
    dispatch(
      receiveSubmitNewAddressSuccess({
        ...data,
        ...addressData,
      }),
    );
  } catch (e) {
    dispatch(receiveSubmitNewAddressFail(e.response?.data?.message || e));
  }
};

export const deleteAddress = id => async dispatch => {
  dispatch(requestDeleteAddress(id));
  try {
    await personalDataService.deleteUserAddress(id);
    dispatch(receiveDeleteAddressSuccess());
  } catch (e) {
    dispatch(receiveDeleteAddressFail(e.response?.data?.message || e));
  }
};

// SELECTORS

export const selectIsLoadingUserAddress = state =>
  state.personalData[slice.name].loading.fetch;
export const selectUserAddressError = state =>
  state.personalData[slice.name].error.fetch;
export const selectUserAddresses = state =>
  state.personalData[slice.name].address;

export const selectIsLoadingNewAddress = state =>
  state.personalData[slice.name].loading.submit;
export const selectNewAddressError = state =>
  state.personalData[slice.name].error.submit;

export const selectDeleteAddresLoadingIndex = state =>
  state.personalData[slice.name].loading.delete;
export const selectDeleteAddresError = state =>
  state.personalData[slice.name].error.delete;
