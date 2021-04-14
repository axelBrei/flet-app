import {createSlice, createSelector} from '@reduxjs/toolkit';
import LoginService from 'services/loginService';
import {capitallize} from 'helpers/stringHelper';
import {receiveRegisterSuccess} from './registerSlice';
import {receiveChangeOnlineStatusSuccess} from 'redux-store/slices/driverSlice';
import {receiveNewShipmentSuccess} from 'redux-store/slices/newShipmentSlice';
import {fetchCurrentShipment} from 'redux-store/slices/driverShipmentSlice';
import dayjs from 'dayjs';
import {receiveUpdatePersonalDataSuccess} from 'redux-store/slices/personalData/personalData';

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
    requestLogin: state => {
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
    logout: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [receiveRegisterSuccess]: (state, action) => {
      state.userData = action.payload;
    },
    [receiveUpdatePersonalDataSuccess]: (state, action) => {
      state.userData.name = action.payload.name || state.userData.name;
      state.userData.lastName =
        action.payload?.lastName || state.userData.lastName;
      state.userData.email = action.payload?.email || state.userData.email;
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
export const loginAs = (email, pass) => async dispatch => {
  dispatch(requestLogin());
  try {
    const {data} = await LoginService.loginAs(email, pass);
    const {shipment, ...loginData} = data;
    if (data.shipment) {
      dispatch(
        receiveNewShipmentSuccess({
          shipment_id: data.shipment.id,
          ...shipment,
        }),
      );
    }
    if (data?.courrier?.isOnline) {
      const until = dayjs(data.courrier.onlineUntil);
      dispatch(receiveChangeOnlineStatusSuccess(until.isAfter(dayjs())));
    }

    data?.isDriver && dispatch(fetchCurrentShipment());

    dispatch(
      receiveLoginSuccess({
        ...loginData,
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
export const selectLoadingLogin = state => state.login.loading.user;
export const selectLoginError = state => state.login.error.user;
export const selectUserData = state => state.login?.userData;

export const selectUserName = createSelector(
  state => state.login?.userData?.name,
  name => (!!name ? capitallize(name) : ''),
);
export const selectUserLastName = createSelector(
  state => state.login?.userData?.lastName,
  lastName => (!!lastName ? capitallize(lastName) : ''),
);
export const selectUserEmail = state => state.login?.userData?.email;
export const selectUserId = state => state.login?.userData?.id;
export const selectUserToken = state => state.login?.userData?.userToken;

export const selectUserPhoto = createSelector(
  state => state.login?.userData?.photoUrl,
  photo => (photo ? {uri: photo} : null),
);

export const selectIsDriver = state => state.login?.userData?.isDriver;
