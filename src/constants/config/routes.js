import {Platform, Dimensions} from 'react-native';

const _routes = {
  landingScreen: 'landing',
  loginScreen: 'login',
  registerStack: 'registro',
  registerScreen: 'normal',
  registerDriverDataScreen: 'driverData',
  registerDriverVehiculeScreen: 'driverVehicle',
  registerDriverLegalsScreen: 'driverLegal',
  loggedStack: 'private',
  shipmentStack: 'envio',
  homeScreen: 'inicio',
  lastShippmentsScreen: 'ultimosPedidos',
  profileScreen: 'perfil',
  plannedShippments: 'planeados',
  newShipmentDetailScreen: 'orden',
  newShipmentConfirmationScreen: 'confirmar',
  shipmentScreen: 'seguimiento',
  driverStack: 'courrier',
  driverHomeScreen: 'inicio-conductor',
  driverShipmentScreen: 'envio-conductor',
  shipmentFinishedScreen: 'envio-terminado',
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
  [_routes.registerStack]: {
    path: _routes.registerStack,
    screens: {
      [_routes.registerScreen]: 'cliente',
      [_routes.registerDriverDataScreen]: 'driverDatos',
      [_routes.registerDriverVehiculeScreen]: 'driverVehiculo',
      [_routes.registerDriverLegalsScreen]: 'driverLegal',
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
          [_routes.newShipmentDetailScreen]: 'detalle',
          [_routes.newShipmentConfirmationScreen]: 'confirmar',
          [_routes.shipmentScreen]: 'seguimiento',
          [_routes.shipmentFinishedScreen]: 'envio-terminado',
        },
      },
      [_routes.driverStack]: {
        path: _routes.driverStack,
        screens: {
          [nativeOnlyRoutes.driverHomeScreen]: 'inicio-conductor',
          [nativeOnlyRoutes.driverShipmentScreen]: 'envio-conductor',
        },
      },
      [_routes.lastShippmentsScreen]: 'ultimosPedidos',
      [_routes.profileScreen]: 'perfil',
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
