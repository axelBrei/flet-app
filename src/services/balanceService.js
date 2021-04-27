import {api} from 'constants/network';

const getCourrierBalance = async () => await api.get('courrier/balance');

const cashout = async () =>
  await api.post('courrier/cashout', {
    type: 'total',
  });

const changeBankNumber = async bankNumber =>
  await api.post('courrier/bank', {bankNumber});

const getPendingPayments = async (page, pageSize) =>
  await api.get('courrier/balace/pending', {params: {page, pageSize}});

export default {
  getCourrierBalance,
  cashout,
  changeBankNumber,
  getPendingPayments,
};
