import React from 'react';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {WaitingCourrier} from 'components/navigation/ShipmentScreen/WaitingCourrier';
import {ShipmentSecurityCode} from 'components/navigation/ShipmentScreen/ShipmentSecurityCode';
import {CourrierConfirmed} from 'components/navigation/ShipmentScreen/CourrierConfirmed';

export const getCardContentComponent = (status = '') => {
  switch (status) {
    case SHIPMENT_STATE.PENDING_COURRIER: {
      return WaitingCourrier;
    }
    case SHIPMENT_STATE.COURRIER_CONFIRMED: {
      return CourrierConfirmed('¡Hemos encontrado un conductor!');
    }
    case SHIPMENT_STATE.ON_PROCESS: {
      return CourrierConfirmed('Te están llevando tu paquete');
    }
    case SHIPMENT_STATE.DELIVERED: {
      return ShipmentSecurityCode;
    }
    default:
      return null;
  }
};
