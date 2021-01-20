import {createSlice, createSelector} from '@reduxjs/toolkit';
import LoginService from 'services/loginService';
import {capitallize} from 'helpers/stringHelper';

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
export const loginAs = (email, pass) => async (dispatch) => {
  dispatch(requestLogin());
  try {
    const {
      data: {user, token},
    } = await LoginService.loginAs(email, pass);
    dispatch(
      receiveLoginSuccess({
        ...user,
        accesToken: token,
        email,
        pass,
        isDriver: user.currier_id > 0,
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
  (name) => capitallize(name),
);
export const selectUserLastName = createSelector(
  (state) => state.login.userData?.last_name,
  (lastName) => capitallize(lastName),
);
export const selectUserEmail = (state) => state.login.userData?.email;
export const selectUserId = (state) => state.login.userData?.user_id;
export const selectUserPhoto = createSelector(
  (state) => state.login.userData?.photo,
  (photo) => (photo ? photo : null),
);
