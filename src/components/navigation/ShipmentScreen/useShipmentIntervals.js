import {useEffect} from 'react';
import {
  fetchShipmentDriverPosition,
  fetchShipmentStatus,
  selectCurrentShipmentStatusString,
} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {useDispatch, useSelector} from 'react-redux';

const STATUS_INTERVAL = 10 * 1000;
const POSITION_INTERVAL = 10 * 1000;
const positionEnabledStates = [
  SHIPMENT_STATE.COURRIER_CONFIRMED,
  SHIPMENT_STATE.ON_PROCESS,
];

export const useShipmentIntervals = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCurrentShipmentStatusString);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      dispatch(fetchShipmentStatus());
    }, STATUS_INTERVAL);

    return () => {
      clearInterval(statusInterval);
    };
  }, []);

  useEffect(() => {
    let positionInterval = null;
    if (positionEnabledStates.includes(status)) {
      positionInterval = setInterval(() => {
        dispatch(fetchShipmentDriverPosition());
      }, POSITION_INTERVAL);
    } else if (positionInterval) {
      clearInterval(positionInterval);
    }

    return () => {
      positionInterval && clearInterval(positionInterval);
    };
  }, [status]);
};
