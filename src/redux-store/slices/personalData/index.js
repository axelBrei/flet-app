import {combineReducers} from '@reduxjs/toolkit';
import userDataReducer from 'redux-store/slices/personalData/personalData';
import telephonesReducer from 'redux-store/slices/personalData/telephonesSlice';
import addressSlice from 'redux-store/slices/personalData/addressSlice';
import vehicleSlice from 'redux-store/slices/personalData/vehicleSlice';

export default combineReducers({
  userData: userDataReducer,
  telephones: telephonesReducer,
  ...addressSlice,
  ...vehicleSlice,
});
