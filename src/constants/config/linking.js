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
    const res = getPath(state, pageXOffset).split('?')[0];
    if (res === `/${routes.landingScreen}`) {
      return '/';
    }
    return res;
  },
  getStateFromPath(path, options) {
    const linkingRoutes = getRoutesFromLinking();
    path = path?.slice(1) ?? path;
    if (path.length <= 1) {
      path = routes.landingScreen;
    }
    if (!Object.values(linkingRoutes).includes(path)) {
      return {
        index: 0,
        routes: [{name: 'pagina-inexistente'}],
      };
    }
    const isLoggedIn = !!reduxStore.getState()?.login?.userData;
    const isPrivateRoute = path.includes('private');
    if (!isLoggedIn && isPrivateRoute) {
      return {
        index: 0,
        routes: [{name: routes.loginScreen}],
      };
    } else return getState(path, options);
  },
};
