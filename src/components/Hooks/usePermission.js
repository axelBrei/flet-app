import {useState, useEffect, useCallback} from 'react';
import PermissionManager from 'components/Permissions/index';

export const usePermission = (permissions = []) => {
  const [loadingPermission, setLoadingPermission] = useState(true);
  const [status, setStatus] = useState(false);

  const checkPermissions = useCallback(async (_permissions) => {
    const res = await PermissionManager.checkPermissions(_permissions);
    if (res) {
      setStatus(true);
    }
    setLoadingPermission(false);
  }, []);

  useEffect(() => {
    checkPermissions(permissions);
  }, [permissions, checkPermissions]);

  return {
    loading: loadingPermission,
    status,
  };
};
