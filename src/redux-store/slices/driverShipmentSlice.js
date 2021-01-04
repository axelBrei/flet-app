import {createSlice} from '@reduxjs/toolkit';
import driverShipmentService from 'services/shipmentService';

const initialState = {
  shipmentData: null,
  driverPickedUpPackage: false,
  loading: {
    accept: false,
    reject: false,
  },
  error: {
    accept: null,
    reject: null,
  },
};

const slice = createSlice({
  name: 'driverShipment',
  initialState,
  reducers: {
    requestAcceptShipment: (state) => {
      state.loading.accept = true;
      state.error.accept = null;
    },
    receiveAcceptShipmentSucces: (state, action) => {
      state.loading.accept = false;
      state.shipmentData = action.payload;
      state.driverPickedUpPackage = false;
    },
    receiveAcceptShipmentFail: (state, action) => {
      state.loading.accept = false;
      state.error.accept = action.payload;
    },
    requestRejectShipment: (state) => {
      state.loading.reject = true;
      state.error.reject = null;
    },
    receiveRejectShipmentSucces: (state, action) => {
      state.loading.reject = false;
    },
    receiveRejectShipmentFail: (state, action) => {
      state.loading.reject = false;
      state.error.reject = action.payload;
    },
    setPickedUp: (state) => {
      state.driverPickedUpPackage = true;
    },
  },
});

export default slice.reducer;

export const {
  requestAcceptShipment,
  receiveAcceptShipmentSucces,
  receiveAcceptShipmentFail,
  setPickedUp,
} = slice.actions;

/**
 * @THUNK
 */

export const acceptShipment = (shipmentId) => async (dispatch) => {
  dispatch(requestAcceptShipment());
  try {
    const {data} = await driverShipmentService.acceptShipment(shipmentId);
    dispatch(receiveAcceptShipmentSucces(data));
  } catch (e) {
    return dispatch(receiveAcceptShipmentFail(e));
  }
};

export const rejectShipment = () => async (dispatch) => {};
/**
 * @SELECTORS
 */

export const selectDriverShipmentData = (state) =>
  state.driverShipment.shipmentData;
export const selectDriverAcceptShipmentLoading = (state) =>
  state.driverShipment.loading.accept;
export const selectDriverAcceptShipmentError = (state) =>
  state.driverShipment.error.accept;

export const selectDriverRejectShipmentLoading = (state) =>
  state.driverShipment.loading.reject;
export const selectDriverRejectShipmentError = (state) =>
  state.driverShipment.error.reject;

export const selectIsDriverShipmentPickedUp = (state) =>
  state.driverShipment.driverPickedUpPackage;
