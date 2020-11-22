import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from 'redux-store/rootReducer';

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
