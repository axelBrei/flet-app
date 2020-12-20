import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from 'redux-store/slices/registerSlice';
import loginReducer from 'redux-store/slices/loginSlice';
import navigationReducer from 'redux-store/slices/navigationSlice';
import shipmentReducer from 'redux-store/slices/shipmentSlice';

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  login: loginReducer,
  register: registerSlice,
  shipment: shipmentReducer,
});
