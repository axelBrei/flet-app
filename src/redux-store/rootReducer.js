import {combineReducers} from '@reduxjs/toolkit';
import registerSlice from 'redux-store/slices/registerSlice';
import loginReducer from 'redux-store/slices/loginSlice';
import navigationReducer from 'redux-store/slices/navigationSlice';

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  login: loginReducer,
  register: registerSlice,
});
