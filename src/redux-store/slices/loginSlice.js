import {createSlice, createSelector} from '@reduxjs/toolkit';
import LoginService from 'services/loginService';
import {capitallize} from 'helpers/stringHelper';
import {
  receiveCourrierDataSuccess,
  receiveRegisterSuccess,
} from './registerSlice';

const initialState = {
  userData: null,
  loading: {
    user: false,
  },
  error: {
    user: null,
  },
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    requestLogin: (state) => {
      state.loading.user = true;
      state.error.user = null;
    },
    receiveLoginSuccess: (state, action) => {
      state.loading.user = false;
      state.userData = action.payload;
    },
    receiveLoginFail: (state, action) => {
      state.loading.user = false;
      state.error.user = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: {
    [receiveRegisterSuccess]: (state, action) => {
      state.userData = action.payload;
    },
    [receiveCourrierDataSuccess]: (state, {payload}) => {
      state.userData.courrier = {
        id: payload,
      };
    },
  },
});

export default slice.reducer;

export const {
  requestLogin,
  receiveLoginSuccess,
  receiveLoginFail,
  logout,
} = slice.actions;

/**
 * @THUNK
 */
export const loginAs = (email, pass) => async (dispatch) => {
  dispatch(requestLogin());
  try {
    const {data} = await LoginService.loginAs(email, pass);
    dispatch(
      receiveLoginSuccess({
        ...data,
        email,
        pass,
      }),
    );
  } catch (e) {
    return dispatch(receiveLoginFail(e?.response?.data || e));
  }
};
/**
 * @SELECTORS
 */
export const selectLoadingLogin = (state) => state.login.loading.user;
export const selectLoginError = (state) => state.login.error.user;
export const selectUserData = (state) => state.login.userData;

export const selectUserName = createSelector(
  (state) => state.login.userData?.name,
  (name) => (!!name ? capitallize(name) : ''),
);
export const selectUserLastName = createSelector(
  (state) => state.login.userData?.lastName,
  (lastName) => (!!lastName ? capitallize(lastName) : ''),
);
export const selectUserEmail = (state) => state.login.userData?.email;
export const selectUserId = (state) => state.login.userData?.id;
export const selectUserPhoto = createSelector(
  (state) => state.login.userData?.photo,
  (photo) => (photo ? photo : null),
);

export const selectIsDriver = (state) => state.login.userData?.isDriver;
