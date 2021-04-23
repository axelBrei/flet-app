import {createSlice} from '@reduxjs/toolkit';
import personalDataService from 'services/personalDataService';

const initialState = {
  data: {
    email: '',
    name: '',
    lastName: '',
  },
  loading: {
    data: false,
    update: false,
    password: false,
  },
  error: {
    data: null,
    update: null,
    password: null,
  },
};

const slice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    requestUpdatePersonalData: state => {
      state.loading.update = true;
      state.error.update = null;
    },
    receiveUpdatePersonalDataSuccess: (state, action) => {
      state.loading.update = false;
    },
    receiveUpdatePersonalDataFail: (state, action) => {
      state.loading.update = false;
      state.error.update = action.payload;
    },
    requestUpdatePassword: state => {
      state.loading.password = true;
      state.error.password = null;
    },
    receiveUpdatePasswordSuccess: (state, action) => {
      state.loading.password = false;
      state.error.password = null;
    },
    receiveUpdatePasswordFail: (state, action) => {
      state.loading.password = false;
      state.error.password = action.payload;
    },
  },
  extraReducers: {
    'login/receiveLoginSuccess': (state, action) => {
      state.data = {
        email: action.payload.email,
        name: action.payload.name,
        lastName: action.payload.lastName,
      };
    },
  },
});

export default slice.reducer;
export const {
  requestUpdatePersonalData,
  receiveUpdatePersonalDataSuccess,
  receiveUpdatePersonalDataFail,
  requestUpdatePassword,
  receiveUpdatePasswordSuccess,
  receiveUpdatePasswordFail,
} = slice.actions;

// THUNK
export const updatePersonalData = updateData => async (dispatch, getState) => {
  dispatch(requestUpdatePersonalData());
  try {
    await personalDataService.updatePersonalData(updateData);
    dispatch(receiveUpdatePersonalDataSuccess(updateData));
  } catch (e) {
    dispatch(receiveUpdatePersonalDataFail(e.response?.data?.message || e));
  }
};

export const fetchChangePassword = (
  oldPassword,
  newPassword,
) => async dispatch => {
  dispatch(requestUpdatePassword());
  try {
    await personalDataService.updatePassword(oldPassword, newPassword);
    dispatch(receiveUpdatePasswordSuccess(newPassword));
  } catch (e) {
    dispatch(receiveUpdatePasswordFail(e.response?.data?.message || e));
  }
};

// SELECTORS
export const selectLoadingUpadteUserData = state =>
  state.personalData.userData.loading.update;
export const selectUpdateUserDataError = state =>
  state.personalData.userData.error.update;
export const selectUserData = state => state.personalData.userData.data;

export const selectIsLoadingUpdatePassword = state =>
  state.personalData.userData.loading.password;
export const selectUpdatePasswordError = state =>
  state.personalData.userData.error.password;
