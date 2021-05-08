import {api} from 'constants/network';

const changeOnlineStatus = async data =>
  await api.post('courrier/status', {...data, keepCase: true});

const updatePosition = async (position, vehicle_id) =>
  await api.post('courrier/position', {...position, vehicle_id});

const getPosition = async courrierId =>
  await api.get(`courrier/position?courrier_id=${courrierId}`);

const getRejections = () => api.get('/courrier/rejections');

const updateRejection = form =>
  api.put('/courrier/update-rejection', form, {
    headers: {
      'Content-Type': 'multipart/from-data',
    },
  });

export default {
  changeOnlineStatus,
  updatePosition,
  getPosition,
  getRejections,
  updateRejection,
};
