import {Platform, Dimensions} from 'react-native';

const _routes = {
  landingScreen: 'landing',
  loginScreen: 'login',
  registerStack: 'registro',
  registerScreen: 'normal',
  registerPersonalData: 'personal',
  registerDriverVehiculeScreen: 'vehicle',
  registerDriverLegalsScreen: 'legal',
  registerDriverCompleteScreen: 'revision',
  loggedStack: 'private',
  shipmentStack: 'envio',
  homeScreen: 'inicio',
  lastShipmentStack: 'pedidos',
  lastShippmentsScreen: 'ultimosPedidos',
  lastShipmentsDetailScreen: 'detallePedido',
  profileStack: 'usuario',
  profileScreen: 'perfil',
  profileVehicleStack: 'vehicles',
  profilevehicleListScreen: 'list',
  vehicleDetailScreen: 'detalle',
  userAddressUpdateScreen: 'direcciones',
  plannedShippments: 'planeados',
  newShipmentPackageDetailScreen: 'paquete',
  newShipmentConfirmationScreen: 'confirmar',
  paymentScreen: 'pagar',
  shipmentScreen: 'seguimiento',
  chatScreen: 'chat',
  driverStack: 'courrier',
  driverHomeScreen: 'inicio-conductor',
  disabledCourrierHomeScreen: 'deshabilitado',
  disabledCourrierSolveRejectionScreen: 'resolver',
  driverShipmentScreen: 'envio-conductor',
  shipmentFinishedScreen: 'envio-terminado',
  balanceStack: 'balance',
  balanceMainScreen: 'menu',
  balanceLastMovements: 'movimientos',
  balancePendingMovementsScreen: 'pendiente',
  recoverPasswordScreen: 'recuperar',
  recoverPasswordResultScreen: 'resultado-recupero',
};

const nativeOnlyRoutes = {
  dirverHomeScreen: 'DirverHomeScreen',
  driverNewShipmentScreen: 'DriverNewShipmentScreen',
  driverShipmentDeliveryConfirmationScreen:
    'DriverShipmentDeliveryConfirmationScreen',
};

export const linkingRoutes = {
  [_routes.landingScreen]: 'landing',
  [_routes.loginScreen]: 'login',
  [_routes.recoverPasswordScreen]: _routes.recoverPasswordScreen,
  [_routes.recoverPasswordResultScreen]: _routes.recoverPasswordResultScreen,
  [_routes.registerStack]: {
    path: _routes.registerStack,
    screens: {
      [_routes.registerScreen]: 'normal',
      [_routes.registerPersonalData]: 'personal',
      [_routes.registerDriverVehiculeScreen]: 'vehicle',
      [_routes.registerDriverLegalsScreen]: 'legal',
      [_routes.registerDriverCompleteScreen]: 'revision',
    },
  },
  [_routes.loggedStack]: {
    path: _routes.loggedStack,
    screens: {
      // [_routes.homeScreen]: 'inicio',
      [_routes.shipmentStack]: {
        path: _routes.shipmentStack,
        screens: {
          [_routes.homeScreen]: 'inicio',
          [_routes.newShipmentPackageDetailScreen]: 'paquete',
          [_routes.newShipmentConfirmationScreen]: 'confirmar',
          [_routes.shipmentScreen]: 'seguimiento',
          [_routes.chatScreen]: 'chat',
          [_routes.shipmentFinishedScreen]: 'envio-terminado',
          [_routes.paymentScreen]: 'pagar',
        },
      },
      [_routes.balanceStack]: {
        path: _routes.balanceStack,
        screens: {
          [_routes.balanceMainScreen]: 'menu',
          [_routes.balanceLastMovements]: _routes.balanceLastMovements,
          [_routes.balancePendingMovementsScreen]:
            _routes.balancePendingMovementsScreen,
        },
      },
      [_routes.driverStack]: {
        path: _routes.driverStack,
        screens: {
          [nativeOnlyRoutes.driverHomeScreen]:
            nativeOnlyRoutes.driverHomeScreen,
          [nativeOnlyRoutes.driverShipmentScreen]:
            nativeOnlyRoutes.driverShipmentScreen,
          [_routes.disabledCourrierHomeScreen]:
            _routes.disabledCourrierHomeScreen,
          [_routes.disabledCourrierSolveRejectionScreen]:
            _routes.disabledCourrierSolveRejectionScreen,
        },
      },
      [_routes.profileStack]: {
        path: _routes.profileStack,
        screens: {
          [_routes.profileScreen]: 'perfil',
          [_routes.userAddressUpdateScreen]: 'direcciones',
          [_routes.profileVehicleStack]: {
            path: _routes.profileVehicleStack,
            screens: {
              [_routes.profilevehicleListScreen]: 'list',
              [_routes.vehicleDetailScreen]: _routes.vehicleDetailScreen,
            },
          },
        },
      },
      [_routes.lastShipmentStack]: {
        path: _routes.lastShipmentStack,
        screens: {
          [_routes.lastShippmentsScreen]: 'ultimosPedidos',
          [_routes.lastShipmentsDetailScreen]: 'detallePedido',
        },
      },
      [_routes.plannedShippments]: 'planeados',
    },
  },
  ['pagina-inexistente']: '*',
};

export const getRoutesFromLinking = (obj = linkingRoutes, prefix = null) =>
  Object.entries(obj).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key.toLowerCase()]: prefix
        ? `${prefix}/${key.toLowerCase()}`
        : key.toLowerCase(),
      ...(typeof val === 'object'
        ? getRoutesFromLinking(
            val?.screens || val,
            prefix ? `${prefix}/${key.toLowerCase()}` : key,
          )
        : {
            [key.toLowerCase()]: prefix ? `${prefix}/${val}` : val,
          }),
    }),
    {},
  );

const allRoutes = {
  // ...(Platform.OS === 'web' ? getRoutesFromLinking() : _routes),
  ..._routes,
  ...nativeOnlyRoutes,
};

const {width} = Dimensions.get('window');
export const routes = Platform.select({
  native: () => allRoutes,
  web: () => (width <= 800 ? allRoutes : _routes),
})();
