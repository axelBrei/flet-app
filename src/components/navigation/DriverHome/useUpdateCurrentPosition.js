import {useEffect, useState, useCallback} from 'react';
import {useDebounce} from 'components/Hooks/useDebounce';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOnlineStatus,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import PermissionManager from 'components/Permissions';
import {trackUserPosition, getCurrentPosition} from 'helpers/locationHelper';
import {Platform} from 'react-native';

export const useUpdateCurrentPosition = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  const isFocused = useIsFocused();

  const [currentPosition, setCurrentPosition] = useState(null);
  const debouncedPosition = useDebounce(currentPosition, 3000);

  useEffect(() => {
    debouncedPosition && dispatch(updatePosition(debouncedPosition));
  }, [debouncedPosition]);

  useEffect(() => {
    const askPermissions = async (skip = false) => {
      let status = skip;
      if (!skip) {
        status = await PermissionManager.checkPermissions([
          PermissionManager.PERMISSIONS.location,
        ]);
      }
      if (status) {
        trackUserPosition(p => setCurrentPosition(p?.coords));
      }
    };

    if (isFocused) {
      askPermissions(!['android', 'ios'].includes(Platform.OS));
    }
  }, [isFocused]);

  return debouncedPosition || {};
};
