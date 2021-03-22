import {defaultMemoize, createSelectorCreator} from 'reselect';

export const createStateCheckSelector = createSelectorCreator(
  defaultMemoize,
  (previosValue, newValue) => previosValue?.status === newValue?.status,
);

export const createPositionCheckSelector = createSelectorCreator(
  defaultMemoize,
  (previousValue, newValue) => {
    return (
      previousValue?.latitude === newValue?.latitude &&
      previousValue.longitude === newValue.longitude
    );
  },
);
