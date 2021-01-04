import {Platform, Dimensions} from 'react-native';

const _routes = {
  landingScreen: 'inicio',
  loginScreen: 'entrar',
  registerStack: 'registro',
  registerScreen: 'normal',
  registerDriverDataScreen: 'driver1',
  registerDriverVehiculeScreen: 'driver2',
  registerDriverLegalsScreen: 'driver3',
  loggedStack: 'private',
  shipmentStack: 'envio',
  homeScreen: 'home',
  lastShippmentsScreen: 'ultimos-pedidos',
  profileScreen: 'perfil',
  plannedShippments: 'planeados',
  newShipmentDetailScreen: 'orden',
  newShipmentConfirmationScreen: 'orden/confirmar',
  shipmentScreen: 'orden/seguimiento',
};

const nativeOnlyRoutes = {
  dirverHomeScreen: 'dirverHomeScreen',
  driverNewShipmentScreen: 'driverNewShipmentScreen',
};

const allRoutes = {
  ..._routes,
  ...nativeOnlyRoutes,
};

const {width} = Dimensions.get('window');
export const routes = Platform.select({
  native: () => allRoutes,
  web: () =>
    Object.entries(
      width <= 800 &&
        (navigator.standalone ||
          window.matchMedia('(display-mode: standalone)').matches)
        ? allRoutes
        : _routes,
    ).reduce(
      (acc, [key, val]) => ({
        ...acc,
        [key]: '/'.concat(val),
      }),
      {},
    ),
})();
