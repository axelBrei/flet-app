import {createSlice} from '@reduxjs/toolkit';
import balanceService from 'services/balanceService';

const initialState = {
  data: {
    balance: {},
  },
  loading: {
    balance: false,
    cashout: false,
    bankNumber: false,
  },
  error: {
    balance: null,
    cashout: null,
    bankNumber: null,
  },
};

const slice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    requestBalance: state => {
      state.loading.balance = true;
      state.error.balance = null;
      state.error.cashout = null;
    },
    receiveBalanceSuccess: (state, action) => {
      state.loading.balance = false;
      state.data.balance = action.payload;
    },
    receiveBalanceFail: (state, action) => {
      state.loading.balance = false;
      state.error.balance = action.payload;
    },
    requestCashout: state => {
      state.loading.cashout = true;
      state.error.cashout = null;
    },
    receiveCashoutSuccess: (state, action) => {
      state.loading.cashout = false;
    },
    receiveCashoutFail: (state, action) => {
      state.loading.cashout = false;
      state.error.cashout = action.payload;
    },
    requestChangeCbu: state => {
      state.loading.bankNumber = true;
      state.error.bankNumber = null;
    },
    receiveChangeCbuSuccess: (state, action) => {
      state.loading.bankNumber = false;
    },
    receiveChangeCbuFail: (state, action) => {
      state.loading.bankNumber = false;
      state.error.bankNumber = action.payload;
    },
  },
});

export default {[slice.name]: slice.reducer};
const {
  requestBalance,
  receiveBalanceSuccess,
  receiveBalanceFail,
  requestCashout,
  receiveCashoutSuccess,
  receiveCashoutFail,
  requestChangeCbu,
  receiveChangeCbuSuccess,
  receiveChangeCbuFail,
} = slice.actions;

// THUNK

export const fetchBalance = () => async dispatch => {
  dispatch(requestBalance());
  try {
    const {data} = await balanceService.getCourrierBalance();
    dispatch(receiveBalanceSuccess(data));
  } catch (e) {
    dispatch(receiveBalanceFail(e?.response?.data?.message || e));
  }
};

export const fetchCashout = () => async dispatch => {
  dispatch(requestCashout());
  try {
    await balanceService.cashout();
    dispatch(receiveCashoutSuccess());
  } catch (e) {
    dispatch(receiveCashoutFail(e?.response?.data?.message || e));
  }
};

export const fetchChangeBankNumber = number => async dispatch => {
  dispatch(requestChangeCbu());
  try {
    const {} = await balanceService.changeBankNumber(number);
    dispatch(receiveChangeCbuSuccess(number));
  } catch (e) {
    dispatch(receiveChangeCbuFail(e?.response?.data?.message || e));
  }
};

// SELECTORS
export const selectIsLoadingBalance = state =>
  state[slice.name].loading.balance;
export const selectBalanceError = state => state[slice.name].error.balance;
export const selectCourrierBalance = state => state[slice.name].data.balance;

export const selectIsLoadingCashout = state =>
  state[slice.name].loading.cashout;
export const selectCashoutError = state => state[slice.name].error.cashout;

export const selectIsLoadingUpdateCbu = state =>
  state[slice.name].loading.bankNumber;
export const selectUpdateCbuError = state => state[slice.name].error.bankNumber;
