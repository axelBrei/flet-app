import {createSlice} from '@reduxjs/toolkit';
import courrierService from 'services/courrierService';
import {selectUserData} from 'redux-store/slices/loginSlice';

const initialState = {
  isOnline: false,
  currentPosition: {
    latitude: null,
    longitude: null,
    bearing: 0,
  },
  rejections: [],
  previousPosition: {
    latitude: null,
    longitude: null,
  },
  loading: {
    status: false,
    position: false,
    rejections: false,
    updateRejection: false,
  },
  error: {
    status: null,
    position: null,
    rejections: null,
    updateRejection: null,
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
      state.isOnline = action.payload;
    },
    receiveChangeOnlineStatusFail: (state, action) => {
      state.loading.status = false;
      state.error.status = action.payload.error;
      state.isOnline = !action.payload.status;
    },
    requestUpdatePosition: state => {
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
    requestDisabledRejections: state => {
      state.loading.rejections = true;
      state.error.rejections = null;
    },
    receiveDisabledRejectionsSuccess: (state, action) => {
      state.loading.rejections = false;
      state.rejections = action.payload;
    },
    receiveDisabledRejectionsFail: (state, action) => {
      state.loading.rejections = false;
      state.error.rejections = action.payload;
    },
    requestUpdateRejection: state => {
      state.loading.updateRejection = true;
      state.error.updateRejection = null;
    },
    receiveUpdateRejectionSuccess: (state, action) => {
      state.loading.updateRejection = false;
      state.rejections = state.rejections.filter(i => action.payload !== i.id);
    },
    receiveUpdateRejectionFail: (state, action) => {
      state.loading.updateRejection = false;
      state.error.updateRejection = action.payload;
    },
  },
  extraReducers: {
    'login/logout': state => {
      Object.assign(state, initialState);
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
  requestDisabledRejections,
  receiveDisabledRejectionsSuccess,
  receiveDisabledRejectionsFail,
  requestUpdateRejection,
  receiveUpdateRejectionSuccess,
  receiveUpdateRejectionFail,
} = slice.actions;

/*
 * @THUNK
 */

export const changeOnlineStatus = (isOnline, until) => async (
  dispatch,
  getState,
) => {
  const user = selectUserData(getState());
  if (!user.isDriver) return;
  dispatch(requestChangeOnlineStatus(isOnline));

  try {
    await courrierService.changeOnlineStatus({until, isOnline});
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

export const updatePosition = position => async (dispatch, getState) => {
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

export const fetchCourrierRejectionsList = () => async dispatch => {
  dispatch(requestDisabledRejections());
  try {
    const {data} = await courrierService.getRejections();
    dispatch(receiveDisabledRejectionsSuccess(data));
  } catch (e) {
    dispatch(receiveDisabledRejectionsFail(e?.response?.data?.message || e));
  }
};

export const fetchUpdateCourrierRejection = (
  rejection_id,
  field_name,
  value,
) => async dispatch => {
  dispatch(requestUpdateRejection());
  try {
    const form = new FormData();
    form.append('rejection_id', rejection_id);
    form.append('field_name', field_name);
    form.append('value', value?.original || value, value?.filename);

    await courrierService.updateRejection(form);
    dispatch(receiveUpdateRejectionSuccess(rejection_id));
  } catch (e) {
    console.log(e, {...e});
    dispatch(receiveUpdateRejectionFail(e?.response?.data?.message || e));
  }
};

/*
 * @SELECTORS
 */

export const selectOnlineStatusLoading = state => state.courrier.loading.status;
export const selectOnlineStatusError = state => state.courrier.error.status;
export const selectOnlineStatus = state => state.courrier.isOnline;

export const selectPositionLoading = state => state.courrier.loading.position;
export const selectPositionError = state => state.courrier.error.position;
export const selectCurrentPosition = state => state.courrier.currentPosition;
export const selectPreviosPosition = state => state.courrier.previousPosition;

//REJECTION
export const selectIsLoadingCourrierRejections = state =>
  state.courrier.loading.rejections;
export const selectCourrierRejectionsError = state =>
  state.courrier.error.rejections;
export const selectCourrierRejections = state => state.courrier.rejections;

export const selectIsLoadingUpdateCourrierRejection = state =>
  state.courrier.loading.updateRejection;
export const selectUpdateCourrierRejectionError = state =>
  state.courrier.error.updateRejection;
