import axios from 'axios';

const loginAs = (username, password) =>
  axios.get('https://randomuser.me/api', {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: {username, password},
  });

export default {
  loginAs,
};
