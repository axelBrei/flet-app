import {api} from 'constants/network';

const loginAs = async (email, password) =>
  await api.post('login', {
    email,
    password,
  });

export default {
  loginAs,
};
