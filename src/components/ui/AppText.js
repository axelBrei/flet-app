import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import PropTypes from 'prop-types';
import {theme} from 'constants/theme';

export const AppText = styled(Text)`
  font-size: ${(props) => scaleDpTheme(props.fontSize)};
  color: ${(props) =>
    props.alternative ? 'white' : props.color || props.theme.colors.fontColor};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  width: ${(props) => props.width};
  text-align: ${(props) => props.textAlign};
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
