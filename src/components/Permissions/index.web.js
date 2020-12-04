import {permissionStatus} from 'components/Permissions/permissionStatus';
import {PERMISSIONS} from 'components/Permissions/permissions';

const checkPermissions = async (permission) => {
  if ('permissions' in navigator) {
    const result = await navigator.permissions.query({name: permission});
    return [permissionStatus.GRANTED, permissionStatus.PROMPT].includes(result);
  }
};

export default {
  checkPermissions,
  ...PERMISSIONS,
};
