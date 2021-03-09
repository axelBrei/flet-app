import React from 'react';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {WaitingCourrier} from 'components/navigation/ShipmentScreen/WaitingCourrier';
import {CourrierDelivering} from 'components/navigation/ShipmentScreen/CourrierDelivering';
import {ShipmentSecurityCode} from 'components/navigation/ShipmentScreen/ShipmentSecurityCode';

export const getCardContentComponent = (status = '') => {
  switch (status) {
    case SHIPMENT_STATE.PENDING_COURRIER: {
      return WaitingCourrier;
    }
    case SHIPMENT_STATE.COURRIER_CONFIRMED: {
      return CourrierDelivering;
    }
    case SHIPMENT_STATE.ON_PROCESS: {
      return CourrierDelivering;
    }
    case SHIPMENT_STATE.DELIVERED: {
      return ShipmentSecurityCode;
    }
    default:
      return React.Fragment;
  }
};
