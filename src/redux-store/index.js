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

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'geocoding',
    process.env.NODE_ENV !== 'development' && 'navigation',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        'shipment/receiveDriverPositionSuccess',
        'shipment/receiveShipmentStatusSuccess',
      ],
    },
  }),
});

export const persistor = persistStore(store);
export default store;
