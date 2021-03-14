import {createSlice} from '@reduxjs/toolkit';
import shipmentService from 'services/shipmentService';

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
  name: 'newShipment',
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
    receiveNewShipmentSuccess: (state, action) => {
      state.loading.newShipment = false;
      state.shipmentRequest = initialState.shipmentRequest;
    },
    receiveNewShipmentFail: (state, action) => {
      state.loading.newShipment = false;
      state.error.newShipment = null;
    },
    requestAcceptShipment: (state) => {},
  },
  extraReducers: {
    'login/logout': (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default slice.reducer;

export const {
  updateShipmentDecription,
  updateShipmentVehiculeData,
  requestNewShipment,
  receiveNewShipmentSuccess,
  receiveNewShipmentFail,
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
    shipmentDescription,
    shipmentVehicule: shipmentVehicle,
  } = selectNewShipmentData(getState());
  try {
    const {data} = await shipmentService.createNewShipment({
      shipmentDescription,
      shipmentVehicle,
      confirmationInformation: confirmationData,
    });
    dispatch(receiveNewShipmentSuccess(data));
  } catch (e) {
    dispatch(receiveNewShipmentFail(e?.response?.data));
  }
};

/**
 * @SELECTORS
 */
export const selectNewShipmentLoading = (state) =>
  state.newShipment.loading.newShipment;
export const selectNewShipmentError = (state) =>
  state.newShipment.error.newShipment;
export const selectNewShipmentData = (state) =>
  state.newShipment.shipmentRequest;
