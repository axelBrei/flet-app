import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPendingShipments,
  selectDriverShipmentData,
  selectPendingShipment,
} from 'redux-store/slices/driverShipmentSlice';
import {selectOnlineStatus} from 'redux-store/slices/driverSlice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useInterval} from 'components/Hooks/useInterval';

const FETCH_INTERVAL = 6 * 1000;
export const useFetcingPendingShipment = () => {
  let interval = useRef(null);
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  const isFocused = useIsFocused();
  const currentShipment = useSelector(selectDriverShipmentData);

  const start = useCallback(() => {
    interval.current = setInterval(() => {
      !currentShipment?.id && dispatch(fetchPendingShipments());
    }, FETCH_INTERVAL);
  }, [interval, currentShipment]);

  useEffect(() => {
    if (currentShipment?.id && interval.current) {
      clearInterval(interval.current);
    }
  }, [currentShipment, interval]);

  useFocusEffect(
    useCallback(() => {
      if (isOnline) {
        start();
      } else if (interval.current) {
        clearInterval(interval.current);
      }
      return () => clearInterval(interval.current);
    }, [isOnline, interval]),
  );
  // useEffect(() => {
  //
  //   if (!isOnline || !isFocused) {
  //     clearInterval(interval.current);
  //   }
  // }, [isOnline, isFocused]);
};
