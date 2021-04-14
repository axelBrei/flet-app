import {combineReducers} from '@reduxjs/toolkit';
import userDataReducer from 'redux-store/slices/personalData/personalData';
import telephonesReducer from 'redux-store/slices/personalData/telephonesSlice';

export default combineReducers({
  userData: userDataReducer,
  telephones: telephonesReducer,
});
