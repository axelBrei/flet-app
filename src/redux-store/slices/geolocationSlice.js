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
    _addLastAddresses: (state, action) => {
      if (!state.lastAddresses.find(i => i.name === action.payload.name)) {
        state.lastAddresses = [...state.lastAddresses, action.payload].slice(
          -3,
        );
      }
    },
  },
  extraReducers: {
    'login/logout': state => {
      Object.assign(state, initialState);
    },
  },
});

export default slice.reducer;
export const {_addLastAddresses} = slice.actions;

export const addLastAddresses = selectedAddress => (dispatch, getState) => {
  const {address} = getState().personalData.address;
  if (!address.find(a => a.name === selectedAddress.name)) {
    dispatch(_addLastAddresses(selectedAddress));
  }
};

/**
 * @SELECTORS
 */
export const selectLastAddresses = state => state.geolocation.lastAddresses;
