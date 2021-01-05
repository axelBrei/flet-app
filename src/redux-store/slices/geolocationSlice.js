import {createSlice} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import {getCurrentPosition, decodeDirections} from 'helpers/locationHelper';
import geolocationService from 'services/geolocationService';
import {capitallize} from 'helpers/stringHelper';

const initialState = {
  directions: null,
  loading: {
    directions: false,
  },
  error: {
    directions: null,
  },
};

const slice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    requestDirections: (state) => {
      state.loading.directions = true;
      state.error.directions = null;
      state.directions = null;
    },
    receiveDirectionsSuccess: (state, action) => {
      state.loading.directions = false;
      state.directions = action.payload;
    },
    receiveDirectionsFail: (state, action) => {
      state.loading.directions = true;
      state.error.directions = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  requestDirections,
  receiveDirectionsSuccess,
  receiveDirectionsFail,
} = slice.actions;

/**
 * @THUNK
 */

export const getDirectionsFromCurrentLocation = ({
  latitude = null,
  longitude = null,
}) => async (dispatch) => {
  try {
    if (!latitude || !longitude) return;
    dispatch(requestDirections());
    const {coords: currentCoords, ...rest} = await getCurrentPosition();
    const {data} = await geolocationService.getDirections(
      `${currentCoords.latitude},${currentCoords.longitude}`,
      `${latitude},${longitude}`,
    );
    const directions = decodeDirections(
      data?.routes[0]?.overview_polyline?.points,
    ).map(([latitude, longitude]) => ({latitude, longitude}));
    return dispatch(receiveDirectionsSuccess(directions));
  } catch (e) {
    return dispatch(receiveDirectionsFail(e));
  }
};

/**
 * @SELECTORS
 */
export const selectLoadingDirections = (state) =>
  state.geolocation.loading.directions;
export const selectDirectionsError = (state) =>
  state.geolocation.error.directions;
export const selectCurrentDirections = (state) =>
  state.geolocation.directions || [];
