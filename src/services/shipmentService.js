import {api} from 'constants/network';

const fetchCourrierShipments = async id =>
  await api.get(
    'shipment/courrier',
    id && {
      params: {
        shipment_id: id,
      },
    },
  );

const confirmShipment = async shipmentId =>
  await api.post(`shipment/confirm?shipment_id=${shipmentId}`, {});

const rejectShipment = async shipmentId =>
  await api.post(`shipment/reject?shipment_id=${shipmentId}`, {});

const updateShipmentToPickedUp = async shipmentId =>
  await api.post(`shipment/picked?shipment_id=${shipmentId}`, {});

const updateShipmentToDelivered = async shipmentId =>
  await api.post(`shipment/delivered?shipment_id=${shipmentId}`, {});

const uploadConfirmationCode = async (shipmentId, securityCode) =>
  await api.post('shipment/delivered/confirm', {shipmentId, securityCode});

const createNewShipment = async shipmentData =>
  await api.put('shipment', shipmentData);

const cancelShipment = async shipmentId =>
  await api.post(`shipment/cancel?shipment_id=${shipmentId}`, {});

const checkShipmentStatus = async shipmentId =>
  await api.get(`shipment/status?shipment_id=${shipmentId}`);

const getNewShipmentPrice = async shipmentData =>
  await api.post('shipment/price', shipmentData);

const getLastShipments = async (page, pageSize) =>
  await api.get(`shipment/history?page=${page}&page_size=${pageSize}`);

export default {
  fetchCourrierShipments,
  createNewShipment,
  cancelShipment,
  checkShipmentStatus,
  confirmShipment,
  rejectShipment,
  updateShipmentToPickedUp,
  updateShipmentToDelivered,
  uploadConfirmationCode,
  getNewShipmentPrice,
  getLastShipments,
};
