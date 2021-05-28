export const SHIPMENT_STATE = {
  NEW: 'NEW', // Order has been confirmed but it han't a courrier
  PENDING_PAYMENT: 'PENDING_PAYMENT', // user created the order but didn't pay it YET.
  PAYMENT_ERROR: 'PAYMENT_ERROR', // payment rejected or canceled by client
  PAYMENT_CANCELLED: 'PAYMENT_CANCELLED', // user cancelled the payment
  PENDING_COURRIER: 'COURRIER_PENDING', // Waiting to find a courrier
  COURRIER_CONFIRMED: 'CONFIRMED', // One courrier accepted the order and it's going to pickup the package
  ON_PROCESS: 'ON_PROCESS', // The courrier is delivering the package to it's final location
  WAITING_ORIGIN: 'WAITTING_ORIGIN', // Courrier is waiting to get the package
  WAITING_DESTINATION: 'WAITING_DESTINATION', // Courrier is waiting to deliver the package
  WAITING_PACKAGE: 'WAITING_PACKAGE', // courrier waiting to drop package
  DELIVERED: 'DELIVERED', // Courrier delivered the package
  FINISHED: 'FINISHED', // User accept the delivery with the courrier code.

  CANCELLED: 'CANCEL',
};

export const SHIPMENT_STATE_ORDER = [
  // NON-PRIORITARY STATES
  SHIPMENT_STATE.PENDING_PAYMENT,
  SHIPMENT_STATE.PAYMENT_ERROR,
  SHIPMENT_STATE.PAYMENT_ERROR,
  SHIPMENT_STATE.CANCELLED,
  // PROPROTARY STATES
  SHIPMENT_STATE.NEW,
  SHIPMENT_STATE.PENDING_COURRIER,
  SHIPMENT_STATE.COURRIER_CONFIRMED,
  SHIPMENT_STATE.WAITING_ORIGIN,
  SHIPMENT_STATE.ON_PROCESS,
  SHIPMENT_STATE.WAITING_PACKAGE,
  SHIPMENT_STATE.DELIVERED,
  SHIPMENT_STATE.FINISHED,
];

export const isCurrentShipment = status => {
  const cancelIds = SHIPMENT_STATE_ORDER.findIndex(
    i => i === SHIPMENT_STATE.PENDING_COURRIER,
  );
  const currId = SHIPMENT_STATE_ORDER.findIndex(i => i === status);
  return currId < cancelIds;
};
