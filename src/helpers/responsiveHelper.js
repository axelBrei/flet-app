import {Dimensions, Platform} from 'react-native';

/**
 * Calculates the Relative unit (rem) that will be used throughout the styling
 * of the whole application. It's based on some common heuristics.
 *
 * PhM      -> Phone Magic: Good constant number for phones.
 * TaWidth  -> Tablet Width: Good avg for 3:4 tablets.
 * MSW      -> Multiplier Starting Width: Multiplier starts to affect rem after this width.
 * MSV      -> Multiplier Starting Value: Value in which multiplier affects rem.
 * MTV      -> Multiplier Target Value: Value the multiplier will have when `TaWidth` is reached.
 *
 * @param {number} width - Device width
 * @param {number} height - Device height
 * @returns {number} - REM unit for this device
 */
const calculateREMforDevice = ({width, height}) => {
  const PhM = Platform.select({
    ios: () => 330,
    android: () => 380,
    web: () =>
      /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase()) ? 330 : 380,
  })();
  const TaWidth = 775;
  const MSW = 450;
  const MSV = 1;
  const MTV = 0.7;

  let remValue = width / PhM;
  if (width > MSW) {
    const multiplier = ((width - MSW) / (TaWidth - MSW)) * (MTV - MSV) + MSV; // Linear eq
    remValue = remValue * multiplier;
  }

  return remValue;
};

/**
 * Calculates the Relative unit (rem) that will be used throughout the styling
 * of the whole application. It's based on some common heuristics.
 *
 * PhM      -> Phone Magic: Good constant number for phones.
 * screenWidth  -> Tablet Width: Good avg for 3:4 tablets.
 * MSW      -> Multiplier Starting Width: Multiplier starts to affect rem after this width.
 * MSV      -> Multiplier Starting Value: Value in which multiplier affects rem.
 * MTV      -> Multiplier Target Value: Value the multiplier will have when `TaWidth` is reached.
 *
 * @param {number} width - Device width
 * @param {number} height - Device height
 * @returns {number} - REM unit for this device
 */
const calculateREMforWeb = ({width, height}) => {
  const PhM = 460;
  const screenWidth = 1050;
  const MSW = 400;
  const MSV = 1;
  const MTV = 0.7;

  let remValue = width / PhM;
  if (width > MSW) {
    const multiplier =
      ((width - MSW) / (screenWidth - MSW)) * (MTV - MSV) + MSV; // Linear eq
    remValue = remValue * multiplier;
  }
  return remValue;
};

export const calcRem = (dim) =>
  dim.width >= 750 ? calculateREMforWeb(dim) : calculateREMforDevice(dim);

export const scaleDp = (dp) => {
  const dim = Dimensions.get('window');
  return dp * (calcRem(dim) || 1);
};

export const scaleDpTheme = (size) => (props) => `${props.theme.scale(size)}px`;
