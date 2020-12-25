import {Animated, Platform} from 'react-native';
import {scaleDp} from 'helpers/responsiveHelper';

export const animateDrawerTo = (
  animatedValue,
  yValue,
  callback = () => {},
  xyValue = false,
) => {
  let toValue = yValue ?? scaleDp(250);
  if (xyValue) {
    toValue = {
      x: 0,
      y: toValue,
    };
  }
  Animated.timing(animatedValue, {
    toValue,
    duration: 150,
    useNativeDriver: true,
  }).start(() => {
    animatedValue.flattenOffset();
    callback();
  });
};

export const openDrawer = (
  animatedValue,
  componentHeight,
  initialHiddenContentPercentage,
  callback = () => {},
  xyVal = false,
) => {
  const toVal = -(
    componentHeight * (1 - initialHiddenContentPercentage) +
    scaleDp(
      Platform.select({
        web: 0,
        ios: 0,
        android: 25,
      }),
    )
  );
  animateDrawerTo(animatedValue, toVal, callback, xyVal);
};

export const closeDrawer = (
  animatedValue,
  callback = () => {},
  xyVal = false,
) => {
  animateDrawerTo(animatedValue, 0, callback, xyVal);
};
