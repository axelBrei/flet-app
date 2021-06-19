import {api} from 'constants/network';

const getConversation = shipment_id =>
  api.get(`/chat?shipment_id=${shipment_id}`);

const sendMessage = data => api.post('/chat/send', data);

export default {
  getConversation,
  sendMessage,
};
