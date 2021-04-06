import {Platform, Dimensions} from 'react-native';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerSlice from 'redux-store/slices/registerSlice';
import loginSlice from 'redux-store/slices/loginSlice';
import navigationReducer from 'redux-store/slices/navigationSlice';
import newShipmentReducer from 'redux-store/slices/newShipmentSlice';
import driverShipmentReducer from 'redux-store/slices/driverShipmentSlice';
import geocodingReducer from 'redux-store/slices/geolocationSlice';
import courrierReducer from 'redux-store/slices/driverSlice';
import shipmentReducer from 'redux-store/slices/shipmentSlice';
import vehicleTypesreducer from 'redux-store/slices/vehicleTypesSlice';
import insuranceReducer from 'redux-store/slices/insuranceSlice';

const reducers = {
  login: loginSlice,
  navigation: navigationReducer,
  register: registerSlice,
  newShipment: newShipmentReducer,
  shipment: persistReducer(
    {
      key: 'shipment',
      storage: AsyncStorage,
      blacklist: ['lastShipments'],
    },
    shipmentReducer,
  ),
  geolocation: geocodingReducer,
  courrier: courrierReducer,
  insurance: insuranceReducer,
  vehicleTypes: vehicleTypesreducer,
};

let extraReducers = {};
const {width} = Dimensions.get('window');
if (
  ['android', 'ios'].includes(Platform.OS) ||
  process.env.NODE_ENV === 'development' ||
  (Platform.OS === 'web' && width <= 800 && navigator.standalone) ||
  window.matchMedia('(display-mode: standalone)').matches
) {
  Object.assign(extraReducers, {
    driverShipment: driverShipmentReducer,
  });
}

export const rootReducer = combineReducers({
  ...reducers,
  ...extraReducers,
});
