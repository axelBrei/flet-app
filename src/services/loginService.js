import {api} from 'constants/network';

const loginAs = async (email, password) =>
  await api.post('login', {
    email,
    password,
  });

const registerNewUser = async user => await api.put('user', user);

const registerCourrierPersonalData = async (personalData, token) =>
  await api.put('courrier', personalData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });

const registerCourrierVehicleData = async vehicleData =>
  await api.put('courrier/vehicle', vehicleData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const registerCourrierLegalData = async form =>
  await api.put('courrier/legal', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const recoverPassword = async data => await api.post('recover-password', data);

export default {
  loginAs,
  registerNewUser,
  registerCourrierPersonalData,
  registerCourrierVehicleData,
  registerCourrierLegalData,
  recoverPassword,
};
