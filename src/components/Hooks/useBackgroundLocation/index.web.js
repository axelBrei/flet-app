import {useEffect, useState, useCallback, useRef} from 'react';
import {useDebounce} from 'components/Hooks/useDebounce';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOnlineStatus,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import PermissionManager from 'components/Permissions';
import {
  trackUserPosition,
  getCurrentPosition,
  clearWebWatcher,
} from 'helpers/locationHelper';
import {Platform} from 'react-native';

export default (
  onLocationObtained = () => new Promise(resolve => resolve('test')),
) => {
  let watchNumber = useRef(null).current;
  const [enabled, setEnabled] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const debouncedPosition = useDebounce(currentPosition, 8000);

  useEffect(() => {
    onLocationObtained?.(debouncedPosition);
  }, [debouncedPosition]);

  useEffect(() => {
    if (enabled) {
      return trackUserPosition(p => {
        watchNumber = p?.watchNumber;
        setCurrentPosition(p?.coords);
      });
    } else {
      clearWebWatcher(watchNumber);
    }
  }, [enabled]);

  return {
    enable: () => setEnabled(true),
    disable: () => setEnabled(false),
    hasLocationPermission: () => true,
  };
};
