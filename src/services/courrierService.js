import {api} from 'constants/network';

const changeOnlineStatus = async (isOnline) =>
  await api.post('courrier/status', {isOnline, keepCase: true});

const updatePosition = async (position, vehicle_id) =>
  await api.post('courrier/position', {...position, vehicle_id});

const getPosition = async (courrierId) =>
  await api.get(`courrier/position?courrier_id=${courrierId}`);

export default {
  changeOnlineStatus,
  updatePosition,
  getPosition,
};