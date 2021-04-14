import {api} from 'constants/network';

const updatePersonalData = async updatedData =>
  await api.post('user/email', updatedData);

const getTelephones = async () => await api.get('user/phones');

const addTelephone = async phone => await api.put('user/phones', phone);

const deleteTelephone = async phoneId =>
  await api.delete(`user/phones?phone_id=${phoneId}`, {});

export default {
  updatePersonalData,
  getTelephones,
  addTelephone,
  deleteTelephone,
};
