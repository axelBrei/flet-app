import {NOTIFICATION_TYPES} from 'components/Contexts/NotificationContext/constants';
import {api} from 'constants/network';
import {receiveNewShipmentSuccess} from 'redux-store/slices/newShipmentSlice';
import {useCallback} from 'react';
import {useUserData} from 'components/Hooks/useUserData';
import {useDispatch} from 'react-redux';
import {
  receiveFetchPendingShipmentSuccess,
  receiveRejectShipmentFail,
} from 'redux-store/slices/driverShipmentSlice';
import {keysToCamelCase} from 'helpers/objectHelper';

export const handleNewToken = async token => {
  try {
    await api.post('user/token', {token});
  } catch (e) {}
};

export const useNotificationHandler = () => {
  const userData = useUserData();
  const dispatch = useDispatch();

  return useCallback(
    (appOpenedByNotification = false) => notification => {
      const {type, ...data} = notification?.data || {};
      if (data.shipment) {
        data.shipment = keysToCamelCase(JSON.parse(data.shipment));
      }
      switch (type) {
        case NOTIFICATION_TYPES.SHIPMENT_UPDATE: {
          dispatch(receiveNewShipmentSuccess(data?.shipment));
          break;
        }
        case NOTIFICATION_TYPES.NEW_SHIPMENT: {
          if (userData.isDriver) {
            dispatch(receiveFetchPendingShipmentSuccess(data.shipment));
          }
          break;
        }
        case NOTIFICATION_TYPES.CANCEL_SHIPMENT: {
          if (userData.isDriver) {
            dispatch(receiveRejectShipmentFail('El usuario cancelo el pedido'));
          }
          break;
        }
      }
    },
    [dispatch, userData],
  );
};
