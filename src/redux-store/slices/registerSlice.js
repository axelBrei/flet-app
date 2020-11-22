import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {
    personal: {},
    account: {},
  },
  loading: {
    data: false,
  },
  error: {
    data: null,
  },
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    saveRegisterData: (state, {payload: {step, values}}) => {
      state.data[step] = values;
    },
    requestRegister: (state) => {
      state.loading.data = true;
      state.error.data = null;
    },
    receiveRegisterSuccess: (state, action) => {
      state.loading.data = false;
      state.data = initialState.data;
    },
    receiveRegisterFail: (state, action) => {
      state.loading.data = false;
      state.error.data = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  saveRegisterData,
  requestRegister,
  receiveRegisterSuccess,
  receiveRegisterFail,
} = slice.actions;
