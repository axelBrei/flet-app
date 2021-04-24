import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPendingShipments,
  selectPendingShipment,
} from 'redux-store/slices/driverShipmentSlice';
import {selectOnlineStatus} from 'redux-store/slices/driverSlice';
import {useIsFocused} from '@react-navigation/native';
import {useInterval} from 'components/Hooks/useInterval';

const FETCH_INTERVAL = 6 * 1000;
export const useFetcingPendingShipment = () => {
  let interval = useRef(null);
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  const isFocused = useIsFocused();
  const pendingShipment = useSelector(selectPendingShipment);

  useEffect(() => {
    if (isOnline && isFocused && !pendingShipment) {
      interval.current = setInterval(() => {
        dispatch(fetchPendingShipments());
      }, FETCH_INTERVAL);
    } else if ((!isFocused && interval) || pendingShipment) {
      clearInterval(interval);
    }

    return () => interval.current && clearInterval(interval);
  }, [pendingShipment, isOnline, isFocused]);
};
