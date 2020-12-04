import {Platform} from 'react-native';
const _routes = {
  landingScreen: 'inicio',
  loginScreen: 'entrar',
  registerStack: 'registro',
  registerScreen: 'normal',
  registerDriverDataScreen: 'driver1',
  profileScreen: 'perfil',
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
console.log(routes);
