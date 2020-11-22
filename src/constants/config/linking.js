import {routes} from 'constants/config/routes';
import {Linking} from 'react-native';

export const linkingConfig = {
  enabled: true,
  prefixes: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  config: {
    screens: {
      [routes.homeScreen]: routes.homeScreen,
      [routes.registerPersonalDataScreen]: routes.registerPersonalDataScreen,
    },
  },
};
