import React from 'react';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {WaitingCourrier} from 'components/navigation/ShipmentScreen/WaitingCourrier';
import {ShipmentSecurityCode} from 'components/navigation/ShipmentScreen/ShipmentSecurityCode';
import {CourrierConfirmed} from 'components/navigation/ShipmentScreen/CourrierConfirmed';

export const getCardContentComponent = (status = '', addressName = '') => {
  const address = addressName?.split(',')[0];
  switch (status) {
    case SHIPMENT_STATE.PENDING_COURRIER: {
      return WaitingCourrier;
    }
    case SHIPMENT_STATE.COURRIER_CONFIRMED: {
      return CourrierConfirmed(
        '¡Hemos encontrado un conductor!',
        `Esta yendo a ${address} a levantar el paquete`,
      );
    }
    case SHIPMENT_STATE.WAITING_ORIGIN: {
      return CourrierConfirmed(
        'El conductor llego a retirar el paquete',
        `Está en ${address}.`,
      );
    }
    case SHIPMENT_STATE.ON_PROCESS: {
      return CourrierConfirmed(
        'El conductor esta llevando tu paquete',
        `Se dirige a ${address}.`,
      );
    }
    case SHIPMENT_STATE.WAITING_PACKAGE: {
      return ShipmentSecurityCode(address);
    }
    case SHIPMENT_STATE.DELIVERED: {
      return ShipmentSecurityCode(address);
    }
    default:
      return null;
  }
};
