import React from 'react';
import {Text} from 'react-native';
import styled, {css} from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import PropTypes from 'prop-types';
import {theme} from 'constants/theme';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('screen');

export const AppText = styled(Text)`
  font-size: ${(props) => scaleDpTheme(props.fontSize)};
  color: ${(props) =>
    props.alternative ? 'white' : props.color || props.theme.colors.fontColor};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  width: ${(props) => props.width};
  text-align: ${(props) => props.textAlign};
  ${Platform.OS === 'web' &&
  width < 800 &&
  css`
    min-font-size: 17px;
    font-size: max(${(props) => scaleDp(props.fontSize) + 'px'}, 20px);
  `}
`;

AppText.propTypes = {
  fontSize: PropTypes.number,
  color: PropTypes.string,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  alternative: PropTypes.bool,
};
AppText.defaultProps = {
  alternative: false,
  fontColor: theme.fontColor,
  fontSize: 14,
  bold: false,
  italic: false,
  width: 'auto',
  textAlign: 'left',
};
