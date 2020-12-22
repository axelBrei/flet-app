import {createSlice} from '@reduxjs/toolkit';
import geocodingService from 'services/geocodingService';
import {capitallize} from 'helpers/stringHelper';

const initialState = {
  loading: false,
  error: null,
  addressList: [],
};

const slice = createSlice({
  name: 'geocoding',
  initialState,
  reducers: {
    requestAddresGeocoding: (state) => {
      state.loading = true;
      state.error = null;
    },
    receiveAddressGeocodingSucces: (state, action) => {
      state.loading = false;
      state.addressList = action.payload;
    },
    receiveAddressGeocodingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  requestAddresGeocoding,
  receiveAddressGeocodingSucces,
  receiveAddressGeocodingFail,
} = slice.actions;

/**
 * @THUNK
 */

export const geocodeAddress = (street) => async (dispatch) => {
  dispatch(requestAddresGeocoding());
  try {
    const {data} = await geocodingService.geocodeAddress(street);
    const addressList = data.direcciones
      .map((item) => ({
        id: item.calle.id,
        latitude: item.ubicacion.lat,
        longitude: item.ubicacion.lon,
        name: capitallize(item.nomenclatura, true),
      }))
      .filter(
        (address, index, self) =>
          index === self.findIndex((t) => t.id === address.id),
      );
    dispatch(receiveAddressGeocodingSucces(addressList));
  } catch (e) {
    return dispatch(receiveAddressGeocodingFail(e));
  }
};
/**
 * @SELECTORS
 */
export const selectLoadingGeocoding = (state) => state.geocoding.loading;
export const selectGeocodingError = (state) => state.geocoding.error;
export const selectGeocodingAddressList = (state) =>
  state.geocoding.addressList;
