import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from 'redux-store/slices/registerSlice';
import loginReducer from 'redux-store/slices/loginSlice';

export const rootReducer = combineReducers({
  login: loginReducer,
  register: registerSlice,
});
