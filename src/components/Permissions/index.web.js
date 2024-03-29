import {permissionStatus} from 'components/Permissions/permissionStatus';
import {PERMISSIONS} from 'components/Permissions/permissions';

const checkPermissions = async (permissions = []) => {
  if ('permissions' in navigator) {
    const res = (permissions || [])?.map(async p => {
      return await navigator.permissions.query({name: p});
    });
    if (
      res.some(
        i => ![permissionStatus.GRANTED, permissionStatus.PROMPT].includes(i),
      )
    ) {
      return false;
    }
    return res.every(i =>
      [permissionStatus.GRANTED, permissionStatus.PROMPT].includes(i),
    );
  }
  return true;
};

export default {
  checkPermissions,
  ...PERMISSIONS,
};
