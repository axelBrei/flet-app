import {api} from 'constants/network';

const getCourrierBalance = async () => await api.get('courrier/balance');

const cashout = async () =>
  await api.post('courrier/cashout', {
    type: 'total',
  });

const changeBankNumber = async bankNumber =>
  await api.post('courrier/bank', {bankNumber});

export default {
  getCourrierBalance,
  cashout,
  changeBankNumber,
};
