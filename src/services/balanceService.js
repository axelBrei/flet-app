import {api} from 'constants/network';

const getCourrierBalance = async () => await api.get('courrier/balance');

const cashout = async () =>
  await api.post('courrier/cashout', {
    type: 'total',
  });

export default {
  getCourrierBalance,
  cashout,
};
