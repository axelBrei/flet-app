import axios from 'axios';

const acceptShipment = async (shipmentId) =>
  await axios.get(
    'https://run.mocky.io/v3/8d590e06-40a9-49e6-80eb-11f105f2d58f',
    {params: {shipmentId}},
  );

export default {
  acceptShipment,
};
