import {useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export const useRouteParams = () => {
  const {params} = useRoute();
  const navigation = useNavigation();

  const onBack = useCallback(
    (params) => {
      try {
        params?.onBackCallback?.(params);
        navigation.goBack();
      } catch (e) {}
    },
    [navigation, params],
  );

  return {
    ...params,
    handleBackWithCallback: onBack,
  };
};
