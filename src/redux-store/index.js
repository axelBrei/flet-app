import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from 'redux-store/rootReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import specifyPlatformMiddlewares from 'redux-store/PlatfomSpecifycMiddlewares';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'geocoding',
    'shipment',
    process.env.NODE_ENV !== 'development' && 'navigation',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  ...getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false, // ['register/receiveCourrierVehicleDataSuccess'],
    // serializableCheck: {
    //   ignoredActions: [
    //     FLUSH,
    //     REHYDRATE,
    //     PAUSE,
    //     PERSIST,
    //     PURGE,
    //     REGISTER,
    //     'shipment/receiveDriverPositionSuccess',
    //     'shipment/receiveShipmentStatusSuccess',
    //   ],
    // },
  }),
  ...specifyPlatformMiddlewares,
];

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: middlewares,
});

export const persistor = persistStore(store);
export default store;
