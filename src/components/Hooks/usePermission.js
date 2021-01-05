import {useState, useEffect, useCallback} from 'react';
import PermissionManager from 'components/Permissions/index';
import {PERMISSIONS as PERMISSIONS_BASE} from 'components/Permissions/permissions';
import {Platform} from 'react-native';

export const PERMISSIONS = PERMISSIONS_BASE;
export const usePermission = (permissions = [], onlyMobile) => {
  const [loadingPermission, setLoadingPermission] = useState(true);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);

  const checkPermissions = useCallback(async (_permissions) => {
    if (onlyMobile && Platform.OS === 'web') return;
    try {
      const res = await PermissionManager.checkPermissions(_permissions);
      if (res) {
        setStatus(true);
      }
      setLoadingPermission(false);
    } catch (e) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    if (onlyMobile && Platform.OS === 'web') setLoadingPermission(false);
    else checkPermissions(permissions);
  }, [permissions, checkPermissions]);

  return {
    loading: loadingPermission,
    status,
    error,
    check: () => checkPermissions(permissions),
  };
};
