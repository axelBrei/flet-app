import axios from 'axios';
import Config from 'react-native-config';

export const api = axios.create({
  baseURL: Config.REACT_APP_BASE_URL + '/',
  // baseURL: 'http://localhost:8000',
  timeout: 4000,
  timeoutErrorMessage:
    'El pedido tardó demasiado, por favor intentá nuevamente',
});
