import {routes} from 'constants/config/routes';
import {Linking} from 'react-native';

export const linkingConfig = {
  enabled: true,
  prefixes: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  config: {
    screens: {
      ...Object.entries(routes).reduce(
        (acc, curr) => ({
          ...acc,
          [curr[0]]: curr[1],
        }),
        {},
      ),
      // [routes.homeScreen]: routes.homeScreen,
      // [routes.loginScreen]: routes.loginScreen,
      // [routes.registerPersonalDataScreen]: routes.registerPersonalDataScreen,
    },
  },
};
