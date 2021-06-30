import {permissionStatus} from 'components/Permissions/permissionStatus';
import {
  permissionMappings,
  permissionNames,
  PERMISSIONS,
} from 'components/Permissions/permissions';
import Permissions from 'react-native-permissions';
import {Alert} from 'react-native';
import {Platform} from 'react-native';

const requestPermission = async (permissions = []) => {
  const res = await Permissions.requestMultiple(permissions);
  return res;
};

const checkPermissions = async (permissions = [], mandatory = true) => {
  const filteredPermissions = permissions.filter(p => {
    if (
      Platform.OS === 'android' &&
      p === PERMISSIONS.backgroundLocation &&
      Platform.Version < 28
    ) {
      return false;
    }
    return true;
  });
  let res = await Permissions.checkMultiple(filteredPermissions);
  if (filteredPermissions.some(i => res[i] === permissionStatus.DENIED)) {
    res = await requestPermission(
      filteredPermissions.filter(i => res[i] === permissionStatus.DENIED),
    );
  }

  if (
    mandatory &&
    filteredPermissions.some(i => res[i] === permissionStatus.BLOCKED)
  ) {
    const blockedPermissions = filteredPermissions.reduce((list, perm) => {
      if (res[perm] === permissionStatus.BLOCKED) {
        list.push(`- ${permissionNames[permissionMappings[perm]]}`);
      }
      return list;
    }, []);

    try {
      Alert.alert(
        `Necesitamos ${
          blockedPermissions.length === 1 ? 'el permiso' : 'los permisos'
        } a:`,
        `${blockedPermissions.join(
          '\n',
        )}\n\n Tené en cuenta que si no lo otorgas no podrás usar la funcionalidad`,
        [
          {
            text: 'Abrir configuración',
            onPress: Permissions.openSettings,
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ],
      );
    } catch (e) {
      Alert.alert('No pudimos abrir la configuración');
      // SHOW PROBLEM TO USER
    }
  }
  return filteredPermissions.every(i => res[i] === permissionStatus.GRANTED);
};
export default {
  checkPermissions,
  requestPermission,
  PERMISSIONS,
  STATUS: permissionStatus,
};
