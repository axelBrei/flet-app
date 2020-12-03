import {useNavigation as navigation, useLinkTo} from '@react-navigation/native';
import {Platform} from 'react-native';

export const useNavigation = () => {
  const nav = navigation();
  const link = useLinkTo();

  const navigate = (route, params) =>
    Platform.select({
      web: link(route),
      native: nav.navigate(route, params),
    });

  return {
    ...nav,
    navigate,
  };
};
