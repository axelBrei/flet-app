import {createSlice} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import {getCurrentPosition, decodeDirections} from 'helpers/locationHelper';
import geolocationService from 'services/geolocationService';
import {capitallize} from 'helpers/stringHelper';

const initialState = {
  lastAddresses: [],
};

const slice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    addLastAddresses: (state, action) => {
      state.lastAddresses = [...state.lastAddresses, action.payload].slice(-3);
    },
  },
  extraReducers: {
    'login/logout': state => {
      Object.assign(state, initialState);
    },
  },
});

export default slice.reducer;
export const {addLastAddresses} = slice.actions;

/**
 * @SELECTORS
 */
export const selectLastAddresses = state => state.geolocation.lastAddresses;
