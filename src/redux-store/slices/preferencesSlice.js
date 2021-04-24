import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorega from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {Linking} from 'react-native';

const initialState = {
  maps: {
    preference: Platform.OS === 'ios' ? 'google' : 'default',
    urls: {
      default: `${Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      })}{{latitude}},{{longitude}}`,
      waze: 'waze://?ll={{latitude}},{{longitude}}&navigate=yes',
      google:
        'https://www.google.com/maps/dir/?api=1&destination={{latitude}},{{longitude}}',
    },
  },
};

const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    changeMapDirectionsPreference: (state, action) => {
      state.maps.preference = action.payload;
    },
  },
});

export default {
  [slice.name]: persistReducer(
    {
      key: slice.name,
      storage: AsyncStorega,
    },
    slice.reducer,
  ),
};
export const {changeMapDirectionsPreference} = slice.actions;

export const openMap = ({latitude, longitude}) => (dispatch, getState) => {
  const url = selectMapPreference(getState());
  Linking.openURL(
    url.replace('{{latitude}},{{longitude}}', `${latitude},${longitude}`),
  );
};

// SELECTOR

export const selectPreferenceMapProvider = state =>
  state[slice.name].maps.preference;
const selectMapPreference = state => {
  const {preference, urls} = state[slice.name].maps;
  return urls[preference];
};
