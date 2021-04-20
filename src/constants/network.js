import axios from 'axios';
import Config from 'react-native-config';
import {keysToCamelCase, keysToSnakeCase} from 'helpers/objectHelper.js';
import {loginAs} from 'redux-store/slices/loginSlice';

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
  timeout: 10000,
  timeoutErrorMessage:
    'El pedido tardó demasiado, por favor intentá nuevamente',
  transformResponse: data => {
    if (data.length === 0) {
      return {};
    }
    const parsedData = JSON.parse(data);

    return keysToCamelCase(parsedData);
  },
});

export const configureAuthInterceptor = store => {
  api.interceptors.request.use(config => {
    const {login, register} = store.getState();
    const token = login?.userData?.userToken || register.userToken;
    if (token) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      });
    }
    const {data} = config;
    if (data?.values?.()) {
      return config;
    }
    return {
      ...config,
      data: data
        ? data?.keepCase
          ? data
          : JSON.stringify(keysToSnakeCase(data))
        : {},
    };
  });

  api.interceptors.response.use(
    res => {
      return {
        ...res,
        data: res && res.data ? keysToCamelCase(res.data) : {},
      };
    },
    async err => {
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
