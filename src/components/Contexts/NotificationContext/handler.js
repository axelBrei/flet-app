import {NOTIFICATION_TYPES} from 'components/Contexts/NotificationContext/constants';
import {api} from 'constants/network';
import {receiveNewShipmentSuccess} from 'redux-store/slices/newShipmentSlice';
import {useCallback} from 'react';
import {useUserData} from 'components/Hooks/useUserData';
import {useDispatch} from 'react-redux';
import {
  receiveFetchShipmentsSuccess,
  receiveRejectShipmentFail,
} from 'redux-store/slices/driverShipmentSlice';
import {keysToCamelCase} from 'helpers/objectHelper';
import {fetchCourrierRejectionsList} from 'redux-store/slices/driverSlice';
import {changeCourrierEnabledStatus} from 'redux-store/slices/loginSlice';
import {
  cleanShipments,
  receiveShipmentStatusSuccess,
} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {addMessage} from 'redux-store/slices/chatSlice';
import dayjs from 'dayjs';

export const handleNewToken = async token => {
  try {
    await api.post('user/token', {token});
  } catch (e) {}
};

export const useNotificationHandler = () => {
  const userData = useUserData();
  const dispatch = useDispatch();

  return useCallback(
    (appOpenedByNotification = false) =>
      async notification => {
        const {type, ...data} = notification?.data || {};
        let shipment = {};
        if (data.shipment) {
          const _shipment = keysToCamelCase(JSON.parse(data.shipment));
          shipment = {
            ..._shipment,
            destinations: _shipment?.addresses || [],
            vehicle: _shipment?.courrier?.vehicle || _shipment?.vehicle || {},
          };
        }
        switch (type) {
          case NOTIFICATION_TYPES.SHIPMENT_UPDATE: {
            dispatch(receiveNewShipmentSuccess(shipment));
            break;
          }
          case NOTIFICATION_TYPES.NEW_SHIPMENT: {
            if (userData.isDriver) {
              dispatch(receiveFetchShipmentsSuccess([shipment]));
            }
            break;
          }
          case NOTIFICATION_TYPES.CANCEL_SHIPMENT: {
            if (userData.isDriver) {
              dispatch(
                receiveRejectShipmentFail('El usuario cancelo el pedido'),
              );
            }
            break;
          }
          case NOTIFICATION_TYPES.SHIPMENT_FINISHED: {
            if (appOpenedByNotification) {
              dispatch(cleanShipments());
            } else {
              dispatch(
                receiveShipmentStatusSuccess({
                  ...shipment,
                  status: SHIPMENT_STATE.FINISHED,
                }),
              );
            }
            break;
          }
          case NOTIFICATION_TYPES.COURRIER_REJECTION_CHANGED: {
            dispatch(fetchCourrierRejectionsList());
            dispatch(changeCourrierEnabledStatus(false));
            break;
          }
          case NOTIFICATION_TYPES.COURRIER_ENABLED_CHANGE: {
            // change courrier to enabled if notification bringd data;
            dispatch(changeCourrierEnabledStatus(data.enabled === 'true'));
            break;
          }
          case NOTIFICATION_TYPES.SHIPMENT_CHAT_MESSAGE: {
            dispatch(
              addMessage({
                confirmed: true,
                ...keysToCamelCase(JSON.parse(data.data)),
              }),
            );
            break;
          }
        }
      },
    [dispatch, userData],
  );
};
