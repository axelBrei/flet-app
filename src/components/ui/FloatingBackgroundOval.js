import styled from 'styled-components';
import {View} from 'react-native';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const FloatingBackgroundOval = styled(View)`
  position: absolute;
  top: ${scaleDpTheme(-350)};
  background-color: ${theme.primaryLightColor};
  min-height: ${scaleDpTheme(600)};
  min-width: ${scaleDpTheme(600)};
  border-radius: ${scaleDpTheme(600)};
`;
