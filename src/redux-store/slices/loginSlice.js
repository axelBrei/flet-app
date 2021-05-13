import {createSlice, createSelector} from '@reduxjs/toolkit';
import LoginService from 'services/loginService';
import {capitallize} from 'helpers/stringHelper';
import {
  receiveCourrierDataSuccess,
  receiveRegisterSuccess,
} from './registerSlice';
import {
  changeOnlineStatus,
  receiveChangeOnlineStatusSuccess,
} from 'redux-store/slices/driverSlice';
import {receiveNewShipmentSuccess} from 'redux-store/slices/newShipmentSlice';
import {fetchCurrentShipment} from 'redux-store/slices/driverShipmentSlice';
import dayjs from 'dayjs';
import {
  receiveChangeProfilePictureSuccess,
  receiveUpdatePasswordSuccess,
  receiveUpdatePersonalDataSuccess,
} from 'redux-store/slices/personalData/personalData';
import {fetchTelephones} from 'redux-store/slices/personalData/telephonesSlice';

const initialState = {
  userData: null,
  loading: {
    user: false,
    recover: false,
  },
  error: {
    user: null,
    recover: null,
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
    requestRecoverPassword: state => {
      state.loading.recover = true;
      state.error.recover = null;
    },
    receiveRecoverPasswordSuccess: (state, action) => {
      state.loading.recover = false;
      state.error.recover = null;
    },
    receiveRecoverPasswordFail: (state, action) => {
      state.loading.recover = false;
      state.error.recover = action.payload;
    },
    changeCourrierEnabledStatus: (state, action) => {
      state.userData.courrier.enabled = action.payload;
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
    [receiveUpdatePasswordSuccess]: (state, action) => {
      state.userData.pass = action.payload;
    },
    [receiveChangeProfilePictureSuccess]: (state, action) => {
      state.userData.photoUrl = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  requestLogin,
  receiveLoginSuccess,
  receiveLoginFail,
  requestRecoverPassword,
  receiveRecoverPasswordSuccess,
  receiveRecoverPasswordFail,
  changeCourrierEnabledStatus,
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
    return dispatch(receiveLoginFail(e?.response?.data?.message || e));
  }
};

export const fetchLogout = () => async dispatch => {
  await dispatch(changeOnlineStatus(false));
  dispatch(logout());
};

export const fetchRecoverPassword = data => async dispatch => {
  dispatch(requestRecoverPassword());
  try {
    await LoginService.recoverPassword(data);
    dispatch(receiveRecoverPasswordSuccess());
  } catch (e) {
    dispatch(receiveRecoverPasswordFail(e?.response?.data?.message || e));
  }
};

export const fetchPhonesToRegisterCourrier = () => async (
  dispatch,
  getState,
) => {
  await dispatch(fetchTelephones());
  const [phone] = getState().personalData.telephones.telephones;
  dispatch(receiveCourrierDataSuccess(phone));
  console.log(phone);
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
export const selectUserPassword = state => state.login?.userData?.pass;

export const selectUserPhoto = createSelector(
  state => state.login?.userData?.photoUrl,
  photo => (photo ? {uri: photo} : null),
);

export const selectIsDriver = state => state.login?.userData?.isDriver;

export const selectIsLoadingRecoverPassowrd = state =>
  state.login.loading.recover;
export const selectRecoverPassowrdError = state => state.login.error.recover;
