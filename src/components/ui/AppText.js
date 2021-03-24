import React from 'react';
import {Text} from 'react-native';
import styled, {css} from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import PropTypes from 'prop-types';
import {theme} from 'constants/theme';
import {Dimensions, Platform} from 'react-native';
import {fonts, fontVariants} from 'constants/fonts';

const {width} = Dimensions.get('screen');

const getFontFamily = (b, i) => {
  if (b && i) return fonts.boldItalic;
  return b ? fonts.bold : i ? fonts.italic : fonts.regular;
};

const getWebFontWeight = ({bold: b, italic: i}) => {
  const variant = getFontFamily(b, i);
  switch (variant.split('-')[1]) {
    case fontVariants.light:
      return 300;
    case fontVariants.bold:
      return 600;
    case fontVariants.extraBold:
      return 800;
    default:
      return 400;
  }
};

export const AppText = styled(Text)`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) =>
    props.alternative ? 'white' : props.color || props.theme.colors.fontColor};
  width: ${(props) => props.width};
  text-align: ${(props) => props.textAlign};
  padding: ${(props) => props.padding}px;
  font-family: ${(props) =>
    props.fontFamily || getFontFamily(props.bold, props.italic)};
  ${Platform.OS === 'web' &&
  css`
    min-font-size: 17px;
    font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
    font-weight: ${getWebFontWeight};
  `};
`;

AppText.propTypes = {
  title: PropTypes.bool.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  alternative: PropTypes.bool,
  fontFamily: PropTypes.oneOf(Object.values(fonts)),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectable: PropTypes.bool,
  textAlign: PropTypes.oneOf(['right', 'center', 'left']),
};

AppText.defaultProps = {
  title: false,
  alternative: false,
  fontColor: theme.fontColor,
  fontSize: 14,
  bold: false,
  italic: false,
  width: 'auto',
  textAlign: 'left',
  selectable: Platform.OS === 'web' && width <= 800,
  padding: 0,
  fontFamily: null,
  autoCapitalize: 'none',
};
