import {useNavigation as useNav, useLinkTo} from '@react-navigation/native';
import {Platform} from 'react-native';

export const useNavigation = () => {
  const nav = useNav();
  const link = useLinkTo();

  const navigate = Platform.select({
    web: (route, params) => {
      console.log(route, nav.dangerouslyGetState());
      link(route);
    },
    native: nav.navigate,
  });

  return {
    ...nav,
    navigate,
  };
};
