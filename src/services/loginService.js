import axios from 'axios';

const loginAs = (username, password) =>
  axios.get('https://randomuser.me/api', {data: {username, password}});

export default {
  loginAs,
};
