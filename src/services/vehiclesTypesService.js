import {api} from 'constants/network';

const fetchVehivleTypes = async () => await api.get('vehicle/types');

export default {
  fetchVehivleTypes,
};
