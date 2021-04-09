import {createSlice, createSelector} from '@reduxjs/toolkit';
import driverShipmentService from 'services/shipmentService';
import shipmentService from 'services/shipmentService';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {createStateCheckSelector} from 'redux-store/customSelectors';

const initialState = {
  pendingShipment: null,
  shipmentData: null,
  loading: {
    fetch: false,
    confirm: false,
    reject: false,
    stateChange: false,
    code: false,
  },
  error: {
    fetch: null,
    confirm: null,
    reject: null,
    stateChange: null,
    code: null,
  },
};

const slice = createSlice({
  name: 'driverShipment',
  initialState,
  reducers: {
    // FETCH PENDING
    requestFetchPendingShipment: state => {
      state.loading.fetch = true;
      state.error.fetch = null;
    },
    receiveFetchPendingShipmentSuccess: (state, action) => {
      state.loading.fetch = false;
      state.error.confirm = null;
      state.error.reject = null;
      state.pendingShipment = action.payload;
    },
    receiveFetchPendingShipmentFail: (state, action) => {
      state.loading.fetch = false;
      state.error.fetch = action.payload;
      state.shipmentData = null;
    },
    // CONFIRM
    requestConfirmShipment: state => {
      state.loading.confirm = true;
      state.error.confirm = null;
    },
    receiveConfirmShipmentSucces: (state, action) => {
      state.loading.confirm = false;
      state.shipmentData = action.payload;
      state.pendingShipment = null;
    },
    receiveConfirmShipmentFail: (state, action) => {
      state.loading.confirm = false;
      state.error.confirm = action.payload;
    },
    // REJECT
    requestRejectShipment: state => {
      state.loading.reject = true;
      state.error.reject = null;
    },
    receiveRejectShipmentSucces: (state, action) => {
      state.loading.reject = false;
      state.pendingShipment = null;
    },
    receiveRejectShipmentFail: (state, action) => {
      state.loading.reject = false;
      state.error.reject = action.payload;
    },
    // CHANGE STATUS
    requestChangeShipmentStatus: state => {
      state.loading.stateChange = true;
      state.error.stateChange = null;
    },
    receiveChangeShipmentStatusSuccess: (state, action) => {
      state.loading.stateChange = false;
      Object.assign(state.shipmentData, action.payload);
    },
    receiveChangeShipmentStatusFail: (state, action) => {
      state.loading.stateChange = false;
      state.error.stateChange = action.payload;
    },
    // SUBMIT SECURITY CODE
    requestSubmitConfirmationCode: (state, action) => {
      state.loading.code = true;
      state.error.code = null;
    },
    receiveSubmitConfirmationCodeSucess: (state, action) => {
      state.loading.code = false;
      state.shipmentData = initialState.shipmentData;
      state.pendingShipment = initialState.pendingShipment;
    },
    receiveSubmitConfirmationCodeFail: (state, action) => {
      state.loading.code = false;
      state.error.code = action.payload;
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
  requestFetchPendingShipment,
  receiveFetchPendingShipmentSuccess,
  receiveFetchPendingShipmentFail,
  requestConfirmShipment,
  receiveConfirmShipmentSucces,
  receiveConfirmShipmentFail,
  requestRejectShipment,
  receiveRejectShipmentSucces,
  receiveRejectShipmentFail,
  requestChangeShipmentStatus,
  receiveChangeShipmentStatusSuccess,
  receiveChangeShipmentStatusFail,
  requestSubmitConfirmationCode,
  receiveSubmitConfirmationCodeSucess,
  receiveSubmitConfirmationCodeFail,
} = slice.actions;

/**
 * @THUNK
 */

export const fetchCurrentShipment = () => async dispatch => {
  try {
    const {data} = await shipmentService.getCurrentShipment();
    dispatch(receiveConfirmShipmentSucces(data));
  } catch (e) {
    dispatch(receiveFetchPendingShipmentFail(e?.response?.data?.message || e));
  }
};

export const fetchPendingShipments = () => async dispatch => {
  dispatch(requestFetchPendingShipment());
  try {
    const {data} = await shipmentService.fetchPendingShipments();
    dispatch(receiveFetchPendingShipmentSuccess(data));
  } catch (e) {
    dispatch(receiveFetchPendingShipmentFail(e?.response?.data?.message || e));
  }
};

export const confirmShipment = () => async (dispatch, getState) => {
  dispatch(requestConfirmShipment());
  try {
    const {id} = selectPendingShipment(getState());
    const {data} = await shipmentService.confirmShipment(id);
    dispatch(receiveConfirmShipmentSucces(data));
  } catch (e) {
    dispatch(receiveConfirmShipmentFail(e?.response?.data?.message || e));
  }
};

export const rejectShipment = () => async (dispatch, getState) => {
  dispatch(requestRejectShipment());
  try {
    const {id} = selectPendingShipment(getState());
    const {data} = await shipmentService.rejectShipment(id);
    dispatch(receiveRejectShipmentSucces(data));
  } catch (e) {
    dispatch(receiveRejectShipmentFail(e?.response?.data?.message || e));
  }
};

export const markShipmentAsPickedUp = () => async (dispatch, getState) => {
  dispatch(requestChangeShipmentStatus());
  try {
    const {id} = selectDriverShipmentData(getState());
    const {data} = await shipmentService.updateShipmentToPickedUp(id);
    dispatch(receiveChangeShipmentStatusSuccess(data));
  } catch (e) {
    dispatch(receiveChangeShipmentStatusFail(e?.response?.data?.message || e));
  }
};

export const markShipmentAsDelivered = () => async (dispatch, getState) => {
  dispatch(requestChangeShipmentStatus());
  try {
    const {id} = selectDriverShipmentData(getState());
    const {data} = await shipmentService.updateShipmentToDelivered(id);
    dispatch(receiveChangeShipmentStatusSuccess(data));
  } catch (e) {
    dispatch(receiveChangeShipmentStatusFail(e?.response?.data?.message || e));
  }
};

export const uploadConfirmationCode = code => async (dispatch, getState) => {
  dispatch(requestSubmitConfirmationCode());
  try {
    const {id} = selectDriverShipmentData(getState());
    await shipmentService.uploadConfirmationCode(id, code);
    dispatch(receiveSubmitConfirmationCodeSucess());
  } catch (e) {
    dispatch(
      receiveSubmitConfirmationCodeFail(e?.response?.data?.message || e),
    );
  }
};

/**
 * @SELECTORS
 */

export const selectDriverShipmentData = createStateCheckSelector(
  state => state?.driverShipment?.shipmentData,
  s => s || {},
);

export const selectDriverRejectShipmentLoading = state =>
  state.driverShipment.loading.reject;
export const selectDriverRejectShipmentError = state =>
  state.driverShipment.error.reject;

export const selectConirmShipmentLoading = state =>
  state.driverShipment.loading.confirm;
const selectConirmShipmentError = state => state.driverShipment.error.confirm;

export const selectLoadingPendingShipmentAnswer = createSelector(
  selectConirmShipmentLoading,
  selectDriverRejectShipmentLoading,
  (confirm, reject) => confirm || reject,
);

export const selectPendingShipmentAnswerError = createSelector(
  selectConirmShipmentError,
  selectDriverRejectShipmentError,
  (confirm, reject) => confirm || reject,
);

export const selectPendingShipment = state =>
  state.driverShipment.pendingShipment;
export const selectPendingShipmentError = state =>
  state.driverShipment.error.fetch;

export const selectSecureCodeError = state => state.driverShipment.error.code;
export const selectIsLoadingSecureCode = state =>
  state.driverShipment.loading.code;

export const selectDriverIsLoadingShipmentStatus = state =>
  state.driverShipment.loading.stateChange;
