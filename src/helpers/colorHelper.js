export const convertHexToRgb = color => {
  const hex = color.replace('#', '');
  const red = parseInt(hex.substr(0, 2), 16);
  const green = parseInt(hex.substr(2, 2), 16);
  const blue = parseInt(hex.substr(4, 2), 16);
  return {red, green, blue};
};

export const isLightColor = color => {
  let colors;
  if (color?.startsWith('rgb')) {
    const colorsString = color.replace(/rgb(a?)\(/, '').replace(')', '');
    const [red, green, blue] = colorsString.split(',');
    colors = {red, green, blue};
  } else {
    colors = convertHexToRgb(color);
  }
  const {red, green, blue} = colors;
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 155;
};

export const setOpacityToColor = (color, opacity) => {
  const {red, green, blue} = convertHexToRgb(color);
  return `rgba(${red},${green},${blue},${opacity})`;
};
