import {Platform, Dimensions} from 'react-native';
import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from 'redux-store/slices/registerSlice';
import loginSlice from 'redux-store/slices/loginSlice';
import navigationReducer from 'redux-store/slices/navigationSlice';
import newShipmentReducer from 'redux-store/slices/newShipmentSlice';
import driverShipmentReducer from 'redux-store/slices/driverShipmentSlice';
import geocodingReducer from 'redux-store/slices/geolocationSlice';
import courrierReducer from 'redux-store/slices/driverSlice';
import shipmentReducer from 'redux-store/slices/shipmentSlice';

const reducers = {
  login: loginSlice,
  navigation: navigationReducer,
  register: registerSlice,
  newShipment: newShipmentReducer,
  shipment: shipmentReducer,
  geolocation: geocodingReducer,
  courrier: courrierReducer,
};

let extraReducers = {};
const {width} = Dimensions.get('window');
if (
  ['android', 'ios'].includes(Platform.OS) ||
  process.env.NODE_ENV === 'development' ||
  (Platform.OS === 'web' && width <= 800 && navigator.standalone) ||
  window.matchMedia('(display-mode: standalone)').matches
) {
  Object.assign(extraReducers, {
    driverShipment: driverShipmentReducer,
  });
}

export const rootReducer = combineReducers({
  ...reducers,
  ...extraReducers,
});
