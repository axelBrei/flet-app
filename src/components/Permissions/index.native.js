import {permissionStatus} from 'components/Permissions/permissionStatus';
import {PERMISSIONS} from 'components/Permissions/permissions';
import Permissions from 'react-native-permissions';

const requestPermission = async (permissions = []) => {
  const res = await Permissions.requestMultiple(permissions);
  return res;
};

const checkPermissions = async (permissions = []) => {
  let res = await Permissions.checkMultiple(permissions);
  if (permissions.some((i) => res[i] === permissionStatus.DENIED)) {
    res = await requestPermission(
      permissions.filter((i) => res[i] === permissionStatus.DENIED),
    );
  }

  if (permissions.some((i) => res[i] === permissionStatus.BLOCKED)) {
    try {
      Permissions.openSettings();
    } catch (e) {
      // SHOW PROBLEM TO USER
    }
  }
  return permissions.every((i) => res[i] === permissionStatus.GRANTED);
};
export default {
  checkPermissions,
  requestPermission,
  PERMISSIONS,
  STATUS: permissionStatus,
};
