import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from 'redux-store/slices/registerSlice';

export const rootReducer = combineReducers({
  register: registerSlice,
});
