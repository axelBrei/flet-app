import {combineReducers} from '@reduxjs/toolkit';
import userDataReducer from 'redux-store/slices/personalData/personalData';
import telephonesReducer from 'redux-store/slices/personalData/telephonesSlice';
import addressSlice from 'redux-store/slices/personalData/addressSlice';

export default combineReducers({
  userData: userDataReducer,
  telephones: telephonesReducer,
  ...addressSlice,
});
