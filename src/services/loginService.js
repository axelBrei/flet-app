import {api} from 'constants/network';

const loginAs = async (email, password) =>
  await api.post('login', {
    email,
    password,
  });

const registerNewUser = async (user) => await api.put('user', user);

const registerCourrierPersonalData = async (personalData, token) =>
  await api.put('courrier', personalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const registerCourrierVehicleData = async (vehicleData) =>
  await api.put('courrier/vehicle', vehicleData);

const registerCourrierLegalData = async (legalData) =>
  await api.put('courrier/legal', legalData, {
    headers: {
      // 'Content-Type': 'form/data',
    },
  });

export default {
  loginAs,
  registerNewUser,
  registerCourrierPersonalData,
  registerCourrierVehicleData,
  registerCourrierLegalData,
};
