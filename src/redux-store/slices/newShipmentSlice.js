import {createSlice} from '@reduxjs/toolkit';
import shipmentService from 'services/shipmentService';
import {keysToSnakeCase} from 'helpers/objectHelper';

const initialState = {
  shipmentPrice: {
    price: null,
    until: null,
  },
  shipmentRequest: {
    shipmentDescription: {
      addresses: [],
      // startPoint: null,
      // endPoint: null,
      package: {
        description: '',
        value: null,
        height: null,
        width: null,
        length: null,
        weight: null,
      },
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
    price: false,
  },
  error: {
    newShipment: null,
    price: null,
  },
};

const slice = createSlice({
  name: 'newShipment',
  initialState,
  reducers: {
    updateNewShipmentLocations: (state, {payload}) => {
      state.shipmentRequest.shipmentDescription.addresses = payload;
      // state.shipmentRequest.shipmentDescription.startPoint = payload.startPoint;
      // state.shipmentRequest.shipmentDescription.endPoint = payload.endPoint;
    },
    updateShipmentDescription: (state, action) => {
      state.shipmentRequest.shipmentDescription.package = action.payload;
    },
    updateShipmentVehiculeData: (state, action) => {
      state.shipmentRequest.shipmentVehicule = action.payload;
    },
    updateShipmentInsuranceData: (state, action) => {
      state.shipmentRequest.confirmationScreen = action.payload;
    },
    requestNewShipment: state => {
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
    requestAcceptShipment: state => {},
    requestShipmentPrice: state => {
      state.loading.price = true;
      state.error.price = null;
    },
    receiveShipmentPriceSuccess: (state, action) => {
      state.loading.price = false;
      state.shipmentPrice = action.payload;
    },
    receiveShipmentPriceFail: (state, action) => {
      state.loading.price = false;
      state.error.price = action.payload;
    },
    clearShipmentPrice: state => {
      state.shipmentPrice = initialState.shipmentPrice;
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
  updateNewShipmentLocations,
  updateShipmentDescription,
  updateShipmentVehiculeData,
  requestNewShipment,
  receiveNewShipmentSuccess,
  receiveNewShipmentFail,
  requestShipmentPrice,
  receiveShipmentPriceSuccess,
  receiveShipmentPriceFail,
  clearShipmentPrice,
  updateShipmentInsuranceData,
} = slice.actions;

/**
 * @THUNK
 */

export const fetchShipmentPrice = confirmationInformation => async (
  dispatch,
  getState,
) => {
  dispatch(requestShipmentPrice());
  try {
    const {
      confirmationScreen,
      shipmentDescription,
      shipmentVehicule: shipmentVehicle,
    } = selectNewShipmentData(getState());
    const {data} = await shipmentService.getNewShipmentPrice({
      shipmentDescription: {
        addresses: shipmentDescription.addresses.filter(i => i),
        package: {
          ...shipmentDescription.package,
          type: shipmentVehicle?.vehiculeSize?.id,
        },
      },
      shipmentVehicle: {
        ...shipmentVehicle,
        comments: '',
      },
      confirmationInformation: {
        insurance:
          confirmationInformation?.insurance || confirmationScreen.insurance,
        paymentMethod: {
          type: confirmationScreen.paymentMethod
            ? confirmationScreen.paymentMethod.type
            : confirmationInformation.paymentMethod.type,
          ...confirmationInformation.paymentMethod,
        },
        // ...confirmationInformation,
        // ...confirmationScreen,
        // paymentMethod: confirmationInformation?.paymentMethod?.title,
      },
    });
    dispatch(receiveShipmentPriceSuccess(data));
  } catch (e) {
    dispatch(receiveShipmentPriceFail(e?.response?.data?.message || e));
  }
};

export const createNewShipment = (confirmationInformation = {}) => async (
  dispatch,
  getState,
) => {
  dispatch(requestNewShipment());
  const {
    confirmationScreen,
    shipmentDescription,
    shipmentVehicule: shipmentVehicle,
  } = selectNewShipmentData(getState());
  try {
    const body = {
      shipmentDescription: {
        addresses: shipmentDescription.addresses.filter(i => i),
        package: {
          ...shipmentDescription.package,
          type: shipmentVehicle?.vehiculeSize?.id,
        },
      },
      shipmentVehicle: {
        ...shipmentVehicle,
        comments: '',
      },
      confirmationInformation: {
        insurance:
          confirmationInformation?.insurance || confirmationScreen.insurance,
        paymentMethod: {
          ...confirmationInformation.paymentMethod,
          type: (
            confirmationInformation.paymentMethod ||
            confirmationScreen?.paymentMethod
          )?.type,
        },
      },
    };
    const {data} = await shipmentService.createNewShipment(body);
    dispatch(receiveNewShipmentSuccess({...data, ...shipmentDescription}));
  } catch (e) {
    dispatch(receiveNewShipmentFail(e?.response?.data));
  }
};

/**
 * @SELECTORS
 */
export const selectNewShipmentLoading = state =>
  state.newShipment.loading.newShipment;
export const selectNewShipmentError = state =>
  state.newShipment.error.newShipment;
export const selectNewShipmentData = state => state.newShipment.shipmentRequest;

export const selectLoadingShipmentPrice = state =>
  state.newShipment.loading.price;
export const selectShipmentPriceError = state => state.newShipment.error.price;
export const selectNewShipmentPrice = state =>
  state.newShipment.shipmentPrice?.price;
