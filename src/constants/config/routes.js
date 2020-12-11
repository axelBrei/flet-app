import {Platform} from 'react-native';
const _routes = {
  landingScreen: 'inicio',
  loginScreen: 'entrar',
  registerStack: 'registro',
  registerScreen: 'normal',
  registerDriverDataScreen: 'driver1',
  registerDriverVehiculeScreen: 'driver2',
  registerDriverLegalsScreen: 'driver3',
  loggedStack: 'private',
  homeScreen: 'home',
  lastShippmentsScreen: 'ultimos-pedidos',
  profileScreen: 'perfil',
  plannedShippments: 'planeados',
};

export const routes = Platform.select({
  native: _routes,
  web: Object.entries(_routes).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key]: '/'.concat(val),
    }),
    {},
  ),
});
