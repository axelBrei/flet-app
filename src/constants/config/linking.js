import { routes } from 'constants/config/routes';
export const linkingConfig = {
    prefixes: [
        'http://localhost:3000'
    ],
    config: {
        screens: {
            [routes.homeScreen]: '/',
            [routes.profileScreen]: '/profile'
        }
    }
}
