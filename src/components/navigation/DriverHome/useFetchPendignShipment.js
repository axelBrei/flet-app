import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCurrentShipment,
  selectPendingShipments,
} from 'redux-store/slices/driverShipmentSlice';
import {selectOnlineStatus} from 'redux-store/slices/driverSlice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const FETCH_INTERVAL = 6 * 1000;
export const useFetcingPendingShipment = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isOnline = useSelector(selectOnlineStatus);
  const pendingShipments = useSelector(selectPendingShipments);
  const [currentInterval, setCurrentInterval] = useState(null);

  console.log(isOnline, pendingShipments, isFocused, currentInterval);

  const tick = useCallback(() => {
    if (isFocused && pendingShipments.length === 0) {
      dispatch(fetchCurrentShipment());
    }
  }, [isFocused, pendingShipments]);

  const cancelInterval = useCallback(() => {
    if (currentInterval) {
      console.log('cancelInterval');
      clearInterval(currentInterval);
      setCurrentInterval(null);
    }
  }, [currentInterval]);

  useEffect(() => {
    if (
      !currentInterval &&
      isFocused &&
      isOnline &&
      pendingShipments.length === 0
    ) {
      const interval = setInterval(tick, FETCH_INTERVAL);
      setCurrentInterval(interval);
    }
  }, [isOnline, isFocused, tick, currentInterval]);

  useEffect(() => {
    if (!isOnline || !isFocused || pendingShipments.length > 0) {
      console.log('data', isOnline, isFocused, pendingShipments);
      console.log(!isOnline || !isFocused || pendingShipments.length > 0);
      cancelInterval();
    }
    // return cancelInterval;
  }, [isOnline, isFocused, pendingShipments, cancelInterval]);
};
