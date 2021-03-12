import {createSlice} from '@reduxjs/toolkit';
import courrierService from 'services/courrierService';

const initialState = {
  isOnline: false,
  currentPosition: {
    latitude: null,
    longitude: null,
  },
  previousPosition: {
    latitude: null,
    longitude: null,
  },
  loading: {
    status: false,
    position: false,
  },
  error: {
    status: null,
    position: null,
  },
};

const slice = createSlice({
  name: 'courrier',
  initialState,
  reducers: {
    requestChangeOnlineStatus: (state, action) => {
      state.loading.status = true;
      state.error.status = null;
      state.isOnline = action.payload;
    },
    receiveChangeOnlineStatusSuccess: (state, action) => {
      state.loading.status = false;
    },
    receiveChangeOnlineStatusFail: (state, action) => {
      state.loading.status = false;
      state.error.status = action.payload.error;
      state.isOnline = !action.payload.status;
    },
    requestUpdatePosition: (state) => {
      state.loading.position = true;
      state.error.position = null;
    },
    receiveUpdatePositionSuccess: (state, {payload}) => {
      state.loading.position = false;
      state.currentPosition = payload.currentPosition;
      state.previousPosition = payload.previousPosition;
    },
    receiveUpdatePositionFail: (state, action) => {
      state.loading.position = false;
      state.error.position = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  requestChangeOnlineStatus,
  receiveChangeOnlineStatusSuccess,
  receiveChangeOnlineStatusFail,
  requestUpdatePosition,
  receiveUpdatePositionSuccess,
  receiveUpdatePositionFail,
} = slice.actions;

/*
 * @THUNK
 */

export const changeOnlineStatus = (isOnline) => async (dispatch) => {
  dispatch(requestChangeOnlineStatus(isOnline));
  try {
    const {data} = await courrierService.changeOnlineStatus(isOnline);
    dispatch(receiveChangeOnlineStatusSuccess(isOnline));
  } catch (e) {
    dispatch(
      receiveChangeOnlineStatusFail({
        status: isOnline,
        error: e?.response?.data || e,
      }),
    );
  }
};

export const updatePosition = (position) => async (dispatch, getState) => {
  const vehicleList = getState().login.userData?.courrier?.vehicle;
  if (!vehicleList || vehicleList?.length === 0) {
    return;
  }
  dispatch(requestUpdatePosition());
  try {
    const currentPosition = selectCurrentPosition(getState());
    await courrierService.updatePosition(position, vehicleList?.[0]?.id);
    dispatch(
      receiveUpdatePositionSuccess({
        currentPosition: position,
        previousPosition: currentPosition,
      }),
    );
  } catch (e) {
    dispatch(receiveUpdatePositionFail(e?.response?.data || e));
  }
};

/*
 * @SELECTORS
 */

export const selectOnlineStatusLoading = (state) =>
  state.courrier.loading.status;
export const selectOnlineStatusError = (state) => state.courrier.error.status;
export const selectOnlineStatus = (state) => state.courrier.isOnline;

export const selectPositionLoading = (state) => state.courrier.loading.position;
export const selectPositionError = (state) => state.courrier.error.position;
export const selectCurrentPosition = (state) => state.courrier.currentPosition;
export const selectPreviosPosition = (state) => state.courrier.previousPosition;
