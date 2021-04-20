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
  },
  error: {
    data: null,
    update: null,
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

// SELECTORS
export const selectLoadingUpadteUserData = state =>
  state.personalData.userData.loading.update;
export const selectUpdateUserDataError = state =>
  state.personalData.userData.error.update;
export const selectUserData = state => state.personalData.userData.data;
