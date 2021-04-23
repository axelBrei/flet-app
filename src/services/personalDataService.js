import {api} from 'constants/network';

const updatePersonalData = async updatedData =>
  await api.post('user/email', updatedData);

const getTelephones = async () => await api.get('user/phones');

const addTelephone = async phone => await api.put('user/phones', phone);

const deleteTelephone = async phoneId =>
  await api.delete(`user/phones?phone_id=${phoneId}`, {});

const getUserAddresses = async () => await api.get('user/address');

const updatePassword = async (oldPassword, newPassword) =>
  await api.post('user/password', {oldPassword, newPassword});

const addUserAddres = async addressData =>
  await api.put('user/address', addressData);

const deleteUserAddress = async addres_id =>
  await api.delete('user/address', {params: {addres_id}});

export default {
  updatePersonalData,
  updatePassword,
  getTelephones,
  addTelephone,
  deleteTelephone,
  getUserAddresses,
  addUserAddres,
  deleteUserAddress,
};
