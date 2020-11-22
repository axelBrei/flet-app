import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';

export const AppText = styled(Text)`
  font-size: ${(props) => scaleDpTheme(props.fontSize || 14)};
  color: ${(props) => props.color || props.theme.colors.fontColor};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;
