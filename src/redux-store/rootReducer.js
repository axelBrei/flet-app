import {Platform} from 'react-native';
import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from 'redux-store/slices/registerSlice';
import loginReducer from 'redux-store/slices/loginSlice';
import navigationReducer from 'redux-store/slices/navigationSlice';
import shipmentReducer from 'redux-store/slices/shipmentSlice';
import driverShipmentReducer from 'redux-store/slices/driverShipmentSlice';
import geocodingReducer from 'redux-store/slices/geolocationSlice';

let reducers = {
  navigation: navigationReducer,
  login: loginReducer,
  register: registerSlice,
  shipment: shipmentReducer,
  geolocation: geocodingReducer,
};
if (
  ['android', 'ios'].includes(Platform.OS) ||
  (Platform.OS === 'web' && process.env.NODE_ENV === 'development')
) {
  reducers = {
    ...reducers,
    driverShipment: driverShipmentReducer,
  };
}

export const rootReducer = combineReducers(reducers);
