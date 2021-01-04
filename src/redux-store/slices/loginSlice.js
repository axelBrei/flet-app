import {createSlice} from '@reduxjs/toolkit';
import LoginService from 'services/loginService';

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
export const loginAs = (user, pass) => async (dispatch) => {
  dispatch(requestLogin());
  try {
    const {data} = await LoginService.loginAs(user, pass);
    dispatch(
      receiveLoginSuccess({
        ...data.results[0],
        user,
        pass,
      }),
    );
    // dispatch(receiveLoginSuccess(data));
  } catch (e) {
    return dispatch(receiveLoginFail(e));
  }
};
/**
 * @SELECTORS
 */
export const selectLoadingLogin = (state) => state.login.loading.user;
export const selectLoginError = (state) => state.login.error.user;
export const selectUserData = (state) => state.login.userData;
