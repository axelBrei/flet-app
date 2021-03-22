import {useState, useEffect, useMemo, useCallback} from 'react';
import {Dimensions, Platform} from 'react-native';
import {calcRem} from 'helpers/responsiveHelper';

export const useWindowDimension = () => {
  const dimensions = Dimensions.get('window');
  const [currentDimension, setCurrentDimension] = useState({
    rem: calcRem(dimensions),
    ...dimensions,
  });

  const isPWA = useMemo(
    () =>
      Platform.select({
        native: () => false,
        web: () =>
          navigator.standalone ||
          window.matchMedia('(display-mode: standalone)').matches,
      })(),
    [],
  );

  const isMobile = useMemo(
    () => Platform.OS !== 'web' || currentDimension.width <= 800,
    [currentDimension],
  );

  const handleChange = useCallback(
    ({window}) => {
      const {width, height} = window;
      setCurrentDimension({
        rem: calcRem({height, width}),
        height,
        width,
      });
    },
    [setCurrentDimension],
  );

  const widthWithPadding = useMemo(() => dimensions.width - 40, [
    dimensions.width,
  ]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      Dimensions.addEventListener('change', (e) => handleChange(e));
      return Dimensions.removeEventListener('change', handleChange);
    }
  }, [handleChange]);

  return {
    ...currentDimension,
    isMobile,
    isPWA,
    widthWithPadding,
  };
};
