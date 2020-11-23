import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: {
    user: false,
  },
  error: {
    user: null,
  },
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    requestLogin: (state) => {
      state.loading.user = true;
      state.error.user = null;
    },
    receiveLoginSuccess: (state, action) => {
      state.loading.user = false;
    },
    receiveLoginFail: (state, action) => {
      state.loading.user = false;
      state.error.user = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  requestLogin,
  receiveLoginSuccess,
  receiveLoginFail,
} = slice.actions;

/**
 * @THUNK
 */

/**
 * @SELECTORS
 */
