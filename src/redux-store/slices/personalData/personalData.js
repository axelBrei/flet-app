import {createSlice} from '@reduxjs/toolkit';
import personalDataService from 'services/personalDataService';
import {appendToForm} from 'helpers/networkHelper';

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
    picture: false,
  },
  error: {
    data: null,
    update: null,
    password: null,
    picture: null,
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
    requestChangeProfilePicture: state => {
      state.loading.picture = true;
      state.error.picture = null;
    },
    receiveChangeProfilePictureSuccess: (state, action) => {
      state.loading.picture = false;
    },
    receiveChangeProfilePictureFail: (state, action) => {
      state.loading.picture = false;
      state.error.picture = action.payload;
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
  requestChangeProfilePicture,
  receiveChangeProfilePictureSuccess,
  receiveChangeProfilePictureFail,
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

export const fetchChangeProfilePicture = image => async dispatch => {
  dispatch(requestChangeProfilePicture());
  try {
    const form = new FormData();
    form.append('image', image.original, image.filename);
    const {data} = await personalDataService.updateProfilePicture(form);
    dispatch(receiveChangeProfilePictureSuccess(data.photoUrl));
  } catch (e) {
    dispatch(receiveChangeProfilePictureFail(e.response?.data?.message || e));
  }
};

// SELECTORS
export const selectLoadingUpadteUserData = state =>
  state.personalData.userData.loading.update;
export const selectUpdateUserDataError = state =>
  state.personalData.userData.error.update;
export const selectUserData = state => state.personalData.userData.data;

//PASSWORD
export const selectIsLoadingUpdatePassword = state =>
  state.personalData.userData.loading.password;
export const selectUpdatePasswordError = state =>
  state.personalData.userData.error.password;

// PROFILE PIC
export const selectIsLoadingUpdateProfilePicture = state =>
  state.personalData.userData.loading.picture;
export const selectUpdateProfilePictureError = state =>
  state.personalData.userData.error.picture;
