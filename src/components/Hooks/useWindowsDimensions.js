import {useState, useEffect, useCallback} from 'react';
import {Dimensions, Platform} from 'react-native';
import {calcRem} from 'helpers/responsiveHelper';

export const useWindowDimension = () => {
  const dimensions = Dimensions.get('window');
  const [currentDimension, setCurrentDimension] = useState({
    rem: calcRem(dimensions),
    ...dimensions,
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleChange = (window) => {
        const {innerWidth: width, innerHeight: height} = window.target;
        setCurrentDimension({
          rem: calcRem({height, width}),
          height,
          width,
        });
      };

      window.addEventListener('resize', handleChange);
      return window.removeEventListener('resize', handleChange);
    }
  }, []);

  return {
    ...currentDimension,
    isMobile: Platform.OS !== 'web' || currentDimension.width <= 800,
  };
};
