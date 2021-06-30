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
import personalDataReducer from 'redux-store/slices/personalData';
import balanceSlice from 'redux-store/slices/balanceSlice';
import preferencesSlice from 'redux-store/slices/preferencesSlice';
import chatSlice from 'redux-store/slices/chatSlice';

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
  ...chatSlice,
  geolocation: geocodingReducer,
  courrier: courrierReducer,
  insurance: insuranceReducer,
  vehicleTypes: vehicleTypesreducer,
  personalData: personalDataReducer,
  ...balanceSlice,
  ...preferencesSlice, //PERSISTED
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
