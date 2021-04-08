import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPendingShipments} from 'redux-store/slices/driverShipmentSlice';
import {selectOnlineStatus} from 'redux-store/slices/driverSlice';
import {useIsFocused} from '@react-navigation/native';
import {useInterval} from 'components/Hooks/useInterval';

const FETCH_INTERVAL = 6 * 1000;
export const useFetcingPendingShipment = () => {
  let timeout = useRef(null).current;
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isOnline && isFocused) {
      timeout = setInterval(() => {
        dispatch(fetchPendingShipments());
      }, FETCH_INTERVAL);
      return () => clearInterval(timeout);
    } else if (!isFocused && timeout) {
      clearInterval(timeout);
    }
  }, [isOnline, isFocused]);
};
