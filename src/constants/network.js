import axios from 'axios';
import Config from 'react-native-config';
import {keysToCamelCase, keysToSnakeCase} from 'helpers/objectHelper.js';
import {loginAs} from 'redux-store/slices/loginSlice';

console.log(Config);
export const api = axios.create({
  baseURL: Config.REACT_APP_BASE_URL + '/',
  headers: {
    AccesToken: Config.REACT_APP_ACCESS_TOKEN,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  },
  timeout: 4000,
  timeoutErrorMessage:
    'El pedido tardó demasiado, por favor intentá nuevamente',
  transformResponse: (data) => {
    const parsedData = JSON.parse(data);
    return keysToCamelCase(parsedData);
  },
  transformRequest: (data) => {
    if (data?.keepCase) {
      delete data.keepCase;
      return JSON.stringify(data);
    }
    return data ? JSON.stringify(keysToSnakeCase(data)) : '';
  },
});

export const configureAuthInterceptor = (store) => {
  api.interceptors.request.use((config) => {
    const {login, register} = store.getState();
    const token = login?.userData?.userToken || register.userToken;
    if (token) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      });
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err?.response?.status === 401) {
        const {email, pass} = store.getState().login.userData;
        try {
          await store.dispatch(loginAs(email, pass));
          await api.request(err.config);
        } catch (e) {
          Promise.reject(err);
        }
      }
      return Promise.reject(err);
    },
  );
};
