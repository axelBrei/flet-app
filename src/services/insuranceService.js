import {api} from 'constants/network';

const getAll = async () => await api.get('insurance');

export default {
  getAll,
};
