import {createSlice} from '@reduxjs/toolkit';
import insuranceService from 'services/insuranceService';

const initialState = {
  insuranceList: [],
  loading: {
    data: false,
  },
  error: {
    data: null,
  },
};

const slice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    requestInsurancesList: (state) => {
      state.loading.data = true;
      state.error.data = null;
    },
    receiveInsuranceListSuccess: (state, action) => {
      state.loading.data = false;
      state.insuranceList = action.payload;
    },
    receiveInsuranceListFail: (state, action) => {
      state.loading.data = false;
      state.error.data = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  requestInsurancesList,
  receiveInsuranceListSuccess,
  receiveInsuranceListFail,
} = slice.actions;

/*
 * @THUNK
 */

export const fetchInsurances = () => async (dispatch) => {
  dispatch(requestInsurancesList());
  try {
    const {data} = await insuranceService.getAll();
    dispatch(receiveInsuranceListSuccess(data));
  } catch (e) {
    dispatch(receiveInsuranceListFail(e?.response?.data || e));
  }
};

/*
 * @SELECTORS
 */

export const selectLoadingInsuranceList = (state) =>
  state.insurance.loading.data;
export const selectInsuranceListError = (state) => state.insurance.error.data;
export const selectInsuranceList = (state) => state.insurance.insuranceList;
