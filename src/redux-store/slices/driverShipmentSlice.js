import {createSlice, createSelector} from '@reduxjs/toolkit';
import driverShipmentService from 'services/shipmentService';
import shipmentService from 'services/shipmentService';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {createStateCheckSelector} from 'redux-store/customSelectors';

const initialState = {
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
    requestFetchShipments: state => {
      state.loading.fetch = true;
      state.error.fetch = null;
    },
    receiveFetchShipmentsSuccess: (state, action) => {
      state.loading.fetch = false;
      state.error.confirm = null;
      state.error.reject = null;
      state.shipmentData = action.payload;
    },
    receiveFetchShipmentsFail: (state, action) => {
      state.loading.fetch = false;
      state.error.fetch = action.payload;
    },
    // CONFIRM
    requestConfirmShipment: state => {
      state.loading.confirm = true;
      state.error.confirm = null;
    },
    receiveConfirmShipmentSucces: (state, action) => {
      state.loading.confirm = false;
      state.shipmentData = action.payload;
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
      state.shipmentData = state.shipmentData(i => i.id !== action.payload);
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
      state.shipmentData = state.shipmentData.map(shipment =>
        shipment.id === action.payload.id ? action.payload : shipment,
      );
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
      state.shipmentData = action.payload;
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
  requestFetchShipments,
  receiveFetchShipmentsSuccess,
  receiveFetchShipmentsFail,
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
  updateDriverLocation,
} = slice.actions;

/**
 * @THUNK
 */

export const fetchCurrentShipment = id => async (dispatch, getState) => {
  try {
    dispatch(requestFetchShipments());
    const {data} = await shipmentService.fetchCourrierShipments(id);
    if (id) {
      const shipments = selectDriverShipmentData(getState()).map(i =>
        i.id === id ? data.find(ship => ship.id === id) || i : i,
      );

      dispatch(
        receiveFetchShipmentsSuccess(
          shipments.map(i =>
            i.id === id ? data.find(ship => ship.id === id) : i,
          ),
        ),
      );
    } else {
      dispatch(receiveFetchShipmentsSuccess(data));
    }
  } catch (e) {
    dispatch(receiveFetchShipmentsFail(e?.response?.data?.message || e));
  }
};

export const confirmShipment = id => async (dispatch, getState) => {
  dispatch(requestConfirmShipment());
  try {
    const {data} = await shipmentService.confirmShipment(id);
    dispatch(receiveConfirmShipmentSucces([data]));
  } catch (e) {
    dispatch(receiveConfirmShipmentFail(e?.response?.data?.message || e));
  }
};

export const rejectShipment = id => async (dispatch, getState) => {
  dispatch(requestRejectShipment());
  try {
    const {data} = await shipmentService.rejectShipment(id);
    dispatch(receiveRejectShipmentSucces(id));
  } catch (e) {
    dispatch(receiveRejectShipmentFail(e?.response?.data?.message || e));
  }
};

export const markShipmentAsWaitingInOrigin = id => async dispatch => {
  dispatch(requestChangeShipmentStatus());
  try {
    const {data} = await shipmentService.updateShipmentToWaitingInOrigin(id);
    dispatch(receiveChangeShipmentStatusSuccess(data));
  } catch (e) {
    dispatch(receiveChangeShipmentStatusFail(e?.response?.data?.message || e));
  }
};

export const markShipmentAsPickedUp = id => async (dispatch, getState) => {
  dispatch(requestChangeShipmentStatus());
  try {
    const {data} = await shipmentService.updateShipmentToPickedUp(id);
    dispatch(receiveChangeShipmentStatusSuccess(data));
  } catch (e) {
    dispatch(receiveChangeShipmentStatusFail(e?.response?.data?.message || e));
  }
};

export const markShipmentAsDelivered = id => async (dispatch, getState) => {
  dispatch(requestChangeShipmentStatus());
  try {
    const {data} = await shipmentService.updateShipmentToDelivered(id);
    dispatch(receiveChangeShipmentStatusSuccess(data));
  } catch (e) {
    dispatch(receiveChangeShipmentStatusFail(e?.response?.data?.message || e));
  }
};

export const uploadConfirmationCode = (code, id) => async (
  dispatch,
  getState,
) => {
  dispatch(requestSubmitConfirmationCode());
  try {
    await shipmentService.uploadConfirmationCode(id, code);
    const shipments = selectDriverShipmentData(getState());
    const currentShipment = shipments.find(s => s.id === id);
    const {destinations, currentDestination} = currentShipment;
    const currentDestinationIndex = destinations.findIndex(
      d => d.id === currentDestination,
    );
    let array;
    if (currentDestinationIndex === destinations.length - 1) {
      array = shipments.filter(s => s.id !== id);
    } else {
      array = shipments.map(s =>
        s.id === id
          ? {
              ...s,
              status: SHIPMENT_STATE.ON_PROCESS,
            }
          : s,
      );
    }
    dispatch(receiveSubmitConfirmationCodeSucess(array));
  } catch (e) {
    dispatch(
      receiveSubmitConfirmationCodeFail(e?.response?.data?.message || e),
    );
  }
};

/**
 * @SELECTORS
 */
// Current shipment
export const selectCurrentShipmentError = state =>
  state.driverShipment.error.fetch;
export const selectIsLoadingCurrentShipment = state =>
  state.driverShipment.loading.fetch;
export const selectDriverShipmentData = createSelector(
  state => state?.driverShipment?.shipmentData,
  s => {
    return s?.length > 0 ? s : [{}];
  },
);

export const selectPendingShipments = createSelector(
  selectDriverShipmentData,
  shipments =>
    shipments?.filter?.(s => s.status === SHIPMENT_STATE.PENDING_COURRIER),
);

// Shipment price
export const selectShipmentPrice = state =>
  state.driverShipment?.shipmentData?.price;

// Accept or reject
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

export const selectSecureCodeError = state => state.driverShipment.error.code;
export const selectIsLoadingSecureCode = state =>
  state.driverShipment.loading.code;

export const selectDriverIsLoadingShipmentStatus = state =>
  state.driverShipment.loading.stateChange;
