import {permissionStatus} from 'components/Permissions/permissionStatus';
import {
  permissionMappings,
  permissionNames,
  PERMISSIONS,
} from 'components/Permissions/permissions';
import Permissions from 'react-native-permissions';
import {Alert} from 'react-native';

const requestPermission = async (permissions = []) => {
  const res = await Permissions.requestMultiple(permissions);
  return res;
};

const checkPermissions = async (permissions = [], mandatory = true) => {
  let res = await Permissions.checkMultiple(permissions);
  if (permissions.some(i => res[i] === permissionStatus.DENIED)) {
    res = await requestPermission(
      permissions.filter(i => res[i] === permissionStatus.DENIED),
    );
  }

  if (mandatory && permissions.some(i => res[i] === permissionStatus.BLOCKED)) {
    const blockedPermissions = permissions.reduce((list, perm) => {
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
  return permissions.every(i => res[i] === permissionStatus.GRANTED);
};
export default {
  checkPermissions,
  requestPermission,
  PERMISSIONS,
  STATUS: permissionStatus,
};
