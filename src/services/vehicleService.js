import {api} from 'constants/network';

const getCourrierVehicles = async () => await api.get('courrier/vehicle');

export default {
  getCourrierVehicles,
};
