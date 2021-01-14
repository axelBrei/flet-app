import {routes, linkingRoutes} from 'constants/config/routes';
import {
  getPathFromState as getPath,
  getStateFromPath as getState,
} from '@react-navigation/native';
import {getRoutesFromLinking} from 'constants/config/routes';
import reduxStore from 'redux-store/index';

export const linkingConfig = {
  enabled: true,
  prefixes: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  config: {
    screens: linkingRoutes,
  },
  getPathFromState(state, path) {
    return getPath(state, pageXOffset).split('?')[0];
  },
  getStateFromPath(path, options) {
    const routes = getRoutesFromLinking();
    path = path.slice(1);
    if (!Object.values(routes).includes(path)) {
      return {
        index: 0,
        routes: [{name: 'pagina-inexistente'}],
      };
    }
    const isLoggedIn = !!reduxStore.getState().login.userData;
    const isPrivateRoute = path.includes('private');
    if (!isLoggedIn && isPrivateRoute) {
      return {
        routes: [{name: routes.landingScreen}],
      };
    } else return getState(path, options);
  },
};
