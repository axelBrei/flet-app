import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  shipmentRequest: {
    shipmentDescription: {
      startPoint: null,
      endPoint: null,
      description: '',
      value: 0,
      size: null,
    },
    shipmentVehicule: {
      vehiculeSize: null,
      extraHelp: null,
      comments: '',
    },
    confirmationScreen: {
      addInsurance: false,
      paymentMethod: null,
    },
  },
  loading: {
    newShipment: false,
  },
  error: {
    newShipment: null,
  },
};

const slice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    updateShipmentDecription: (state, action) => {
      state.shipmentRequest.shipmentDescription = action.payload;
    },
    updateShipmentVehiculeData: (state, action) => {
      state.shipmentRequest.shipmentVehicule = action.payload;
    },
    requestNewShipment: (state) => {
      state.loading.newShipment = true;
      state.error.newShipment = null;
    },
    receiveShipmentSuccess: (state, action) => {
      state.loading.newShipment = false;
      state.shipmentRequest = initialState.shipmentRequest;
    },
    receiveShipmentFail: (state, action) => {
      state.loading.newShipment = false;
      state.error.newShipment = null;
    },
    requestAcceptShipment: (state) => {},
  },
});

export default slice.reducer;

export const {
  updateShipmentDecription,
  updateShipmentVehiculeData,
  requestNewShipment,
  receiveShipmentSuccess,
  receiveShipmentFail,
} = slice.actions;

/**
 * @THUNK
 */
export const createNewShipment = (confirmationData) => async (
  dispatch,
  getState,
) => {
  dispatch(requestNewShipment());
  const {
    shipmentRequest: {shipmentDescription, shipmentVehicule},
  } = getState().shipment;
  try {
    // TODO: real call api
    setTimeout(() => dispatch(receiveShipmentSuccess()), 1200);
    // return dispatch(receiveShipmentSuccess());
  } catch (e) {
    dispatch(receiveShipmentFail(e?.response?.data));
  }
};

/**
 * @SELECTORS
 */
export const selectNewShipmentLoading = (state) =>
  state.shipment.loading.newShipment;
export const selectNewShipmentError = (state) =>
  state.shipment.error.newShipment;
export const selectNewShipmentData = (state) => state.shipment.shipmentRequest;
