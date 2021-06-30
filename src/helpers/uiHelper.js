import {theme} from 'constants/theme';

export const applyShadow = (insideStyle = true) => {
  const style = {
    elevation: 4,
    overflow: 'visible',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000000',
  };
  return insideStyle ? {style} : style;
};
