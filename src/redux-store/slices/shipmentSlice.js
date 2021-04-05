import {createSlice, createSelector} from '@reduxjs/toolkit';
import {defaultMemoize, createSelectorCreator} from 'reselect';
import shipmentService from 'services/shipmentService';
import courrierService from 'services/courrierService';
import dayjs from 'dayjs';
import {
  createPositionCheckSelector,
  createStateCheckSelector,
} from 'redux-store/customSelectors';

const initialState = {
  currentShipment: {},
  lastShipments: [],
  driverPosition: {
    latitude: 0,
    longitude: 0,
    timestamp: 0,
    lastUpdate: '',
  },
  shipmentStatus: null,
  loading: {
    cancel: false,
    status: false,
    driverPosition: false,
    shipmentStatus: false,
    history: false,
  },
  error: {
    cancel: null,
    status: null,
    driverPosition: null,
    shipmentStatus: null,
    history: null,
  },
};

const slice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    requestCancelShipment: state => {
      state.loading.cancel = true;
      state.error.cancel = null;
    },
    receiveCancelShipmentSuccess: (state, action) => {
      state.loading.cancel = false;
      state.currentShipment = {};
    },
    receiveCancelShipmentFail: (state, action) => {
      state.loading.cancel = false;
      state.error.cancel = action.payload;
    },
    requestDriverPosition: state => {
      state.loading.driverPosition = true;
      state.error.driverPosition = null;
    },
    receiveDriverPositionSuccess: (state, action) => {
      state.loading.driverPosition = true;
      state.driverPosition = {
        ...action.payload,
        lastUpdate: '',
      };
    },
    receiveDriverPositionFail: (state, action) => {
      state.loading.driverPosition = true;
      state.error.driverPosition = action.payload;
    },
    requestShipmentStatus: state => {
      state.loading.status = true;
      state.error.status = null;
    },
    receiveShipmentStatusSuccess: (state, {payload}) => {
      state.loading.status = false;
      state.shipmentStatus = {
        ...state.shipmentStatus,
        ...payload,
      };
    },
    receiveShipmentStatusFail: (state, action) => {
      state.loading.status = false;
      state.error.status = action.payload;
    },
    cleanShipments: (state, action) => {
      state.currentShipment = initialState.currentShipment;
      state.driverPosition = initialState.driverPosition;
      state.shipmentStatus = initialState.shipmentStatus;
    },
    requestLastShipments: state => {
      state.loading.history = true;
      state.error.history = null;
    },
    receiveLastShipmentsSuccess: (state, action) => {
      state.loading.history = false;
      state.lastShipments = action.payload;
    },
    receiveLastShipmentsFail: (state, action) => {
      state.loading.history = false;
      state.error.history = action.payload;
    },
  },
  extraReducers: {
    'newShipment/receiveNewShipmentSuccess': (state, action) => {
      state.currentShipment = action.payload;
    },
    'login/logout': state => {
      Object.assign(state, initialState);
    },
  },
});

export default slice.reducer;

export const {
  requestCancelShipment,
  receiveCancelShipmentSuccess,
  receiveCancelShipmentFail,
  requestDriverPosition,
  receiveDriverPositionSuccess,
  receiveDriverPositionFail,
  requestShipmentStatus,
  receiveShipmentStatusSuccess,
  receiveShipmentStatusFail,
  cleanShipments,
  requestLastShipments,
  receiveLastShipmentsSuccess,
  receiveLastShipmentsFail,
} = slice.actions;

/*
 * @THUNK
 */

export const fetchShipmentStatus = () => async (dispatch, getState) => {
  dispatch(requestShipmentStatus());
  try {
    const {shipmentId, id} = selectCurrentShipment(getState());
    const {data} = await shipmentService.checkShipmentStatus(id || shipmentId);
    dispatch(receiveShipmentStatusSuccess(data));
  } catch (e) {
    dispatch(receiveShipmentStatusFail(e?.response?.data?.message || e));
  }
};

export const fetchShipmentDriverPosition = () => async (dispatch, getState) => {
  dispatch(requestDriverPosition());
  try {
    const {
      courrier: {id},
    } = selectCurrentShipmentStatus(getState());
    const {data} = await courrierService.getPosition(id);
    dispatch(
      receiveDriverPositionSuccess({
        ...data,
        lastUpdate: dayjs(data.timestamp),
      }),
    );
  } catch (e) {
    dispatch(
      receiveDriverPositionFail(e?.response?.data?.message || e.message),
    );
  }
};

export const cancelShipment = () => async (dispatch, getState) => {
  dispatch(requestCancelShipment());
  try {
    const {shipmentId, shipment_id} = selectCurrentShipment(getState());
    await shipmentService.cancelShipment(shipmentId || shipment_id);
    dispatch(receiveCancelShipmentSuccess());
  } catch (e) {
    dispatch(receiveCancelShipmentFail(e?.response?.data?.message || e));
  }
};

export const fetchLastShipments = () => async dispatch => {
  dispatch(requestLastShipments());
  try {
    const {data} = await shipmentService.getLastShipments();
    dispatch(receiveLastShipmentsSuccess(data));
  } catch (e) {
    dispatch(receiveLastShipmentsFail(e?.response?.data?.message || e));
  }
};

/*
 * @SELECTORS
 */

export const selectCurrentShipment = createSelector(
  state => state.shipment.currentShipment,
  s => s,
);

export const selectIsLoadingShipmentStatus = state =>
  state.shipment.loading.status;

export const selectDriverPosition = createPositionCheckSelector(
  state => state.shipment?.driverPosition,
  d => d || {},
);
export const selectCurrentShipmentStatus = createStateCheckSelector(
  state => state.shipment?.shipmentStatus,
  selectCurrentShipment,
  (s, currentShipment) => s || currentShipment || {},
);

export const selectCurrentShipmentStatusString = createStateCheckSelector(
  state => state.shipment?.shipmentStatus,
  shipmentStatus => shipmentStatus?.status,
);

// last shipments
export const selectIsLoadingLastShipments = state =>
  state.shipment.loading.history;
export const selectLastShipmentsError = state => state.shipment.error.history;
export const selectLastShipments = state => state.shipment.lastShipments;
