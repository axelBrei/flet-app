import {createSlice} from '@reduxjs/toolkit';
import shipmentService from 'services/shipmentService';
import courrierService from 'services/courrierService';
import dayjs from 'dayjs';

const initialState = {
  currentShipment: {},
  driverPosition: null,
  shipmentStatus: null,
  loading: {
    cancel: false,
    status: false,
    driverPosition: false,
    shipmentStatus: false,
  },
  error: {
    cancel: null,
    status: null,
    driverPosition: null,
    shipmentStatus: null,
  },
};

const slice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    requestCancelShipment: (state) => {
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
    requestDriverPosition: (state) => {
      state.loading.driverPosition = true;
      state.error.driverPosition = null;
    },
    receiveDriverPositionSuccess: (state, action) => {
      state.loading.driverPosition = true;
      state.driverPosition = action.payload;
    },
    receiveDriverPositionFail: (state, action) => {
      state.loading.driverPosition = true;
      state.error.driverPosition = action.payload;
    },
    requestShipmentStatus: (state) => {
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
  },
  extraReducers: {
    'newShipment/receiveNewShipmentSuccess': (state, action) => {
      state.currentShipment = action.payload;
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
} = slice.actions;

/*
 * @THUNK
 */

export const fetchShipmentStatus = (id = null) => async (
  dispatch,
  getState,
) => {
  dispatch(requestShipmentStatus());
  try {
    const {shipmentId} = selectCurrentShipment(getState());
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
    } = selectCurrentShipment(getState());
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
    const {shipmentId} = selectCurrentShipment(getState());
    await shipmentService.cancelShipment(shipmentId);
    dispatch(receiveCancelShipmentSuccess());
  } catch (e) {
    dispatch(receiveCancelShipmentFail(e?.response?.data?.message || e));
  }
};

/*
 * @SELECTORS
 */

export const selectCurrentShipment = (state) => state.shipment.currentShipment;

export const selectIsLoadingShipmentStatus = (state) =>
  state.shipment.loading.status;

export const selectDriverPosition = (state) => state.shipment.driverPosition;
export const selectCurrentShipmentStatus = (state) =>
  state.shipment.shipmentStatus;
