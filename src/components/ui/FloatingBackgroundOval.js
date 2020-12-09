import styled from 'styled-components';
import {View, Platform, Dimensions} from 'react-native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const FloatingBackgroundOval = styled(View)`
  position: absolute;
  top: ${scaleDp(-280)}px;
  background-color: ${theme.primaryLightColor};
  min-height: ${(props) => props.theme.scale(500)}px;
  min-width: ${(props) => props.theme.scale(500)}px;
  border-radius: ${scaleDpTheme(250)};
  z-index: 0;
  ${(props) => !props.visible && 'display: none'};
  align-self: center;
`;

FloatingBackgroundOval.defaultProps = {
  visible: true,
};
