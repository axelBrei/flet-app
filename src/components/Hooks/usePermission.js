import {useState, useEffect, useCallback} from 'react';
import PermissionManager from 'components/Permissions/index';
import {PERMISSIONS as PERMISSIONS_BASE} from 'components/Permissions/permissions';

export const PERMISSIONS = PERMISSIONS_BASE;
export const usePermission = (permissions = []) => {
  const [loadingPermission, setLoadingPermission] = useState(true);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);

  const checkPermissions = useCallback(async (_permissions) => {
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
    checkPermissions(permissions);
  }, [permissions, checkPermissions]);

  return {
    loading: loadingPermission,
    status,
    error,
    check: () => checkPermissions(permissions),
  };
};
