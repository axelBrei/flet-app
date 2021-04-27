import {createSlice} from '@reduxjs/toolkit';
import balanceService from 'services/balanceService';

const initialState = {
  data: {
    balance: {},
    pendingPayments: {
      pagination: {
        page: 1,
        pageSize: 20,
      },
      results: [],
    },
  },
  loading: {
    balance: false,
    cashout: false,
    bankNumber: false,
    pending: false,
    pendingPage: false,
  },
  error: {
    balance: null,
    cashout: null,
    bankNumber: null,
    pending: null,
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
    requestBalancePendingPayments: (state, action) => {
      state.loading[action.payload === 1 ? 'pending' : 'pendingPage'] = true;
      state.data.pendingPayments.pagination.page = action.payload;
      state.error.pending = null;
    },
    receiveBalancePendingPaymentsSuccess: (state, action) => {
      state.loading[
        action.payload.pagination.page === 1 ? 'pending' : 'pendingPage'
      ] = false;
      state.data.pendingPayments = action.payload;
    },
    receiveBalancePendingPaymentsFail: (state, action) => {
      state.loading[
        state.data.pendingPayments.pagination.page === 1
          ? 'pending'
          : 'pendingPage'
      ] = false;
      if (state.pendingPayments.pagination.page === 1) {
        state.error.pending = action.payload;
      }
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
  requestBalancePendingPayments,
  receiveBalancePendingPaymentsSuccess,
  receiveBalancePendingPaymentsFail,
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

export const fetchPendingPayments = (
  page = 1,
  pageSize = 20,
) => async dispatch => {
  dispatch(requestBalancePendingPayments(page));
  try {
    const {data} = await balanceService.getPendingPayments(page, pageSize);
    dispatch(receiveBalancePendingPaymentsSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(
      receiveBalancePendingPaymentsFail(e?.response?.data?.message || e),
    );
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

export const selectIsLoadingBalancePendingPayments = state =>
  state[slice.name].loading.pending;
export const selectIsLoadingPageBalancePendingPayments = state =>
  state[slice.name].loading.pendingPage;
export const selectBalancePendingPaymentsError = state =>
  state[slice.name].error.pending;
export const selectBalancePendingPayments = state =>
  state[slice.name].data.pendingPayments;
