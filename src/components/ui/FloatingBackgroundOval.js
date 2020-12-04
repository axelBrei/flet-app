import styled from 'styled-components';
import {View, Platform} from 'react-native';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const FloatingBackgroundOval = styled(View)`
  position: absolute;
  top: ${scaleDpTheme(-280)};
  background-color: ${theme.primaryLightColor};
  min-height: ${scaleDpTheme(500)};
  min-width: ${scaleDpTheme(500)};
  border-radius: ${scaleDpTheme(400)};

  ${(props) => !props.visible && 'display: none;'}
`;

FloatingBackgroundOval.defaultProps = {
  visible: Platform.OS !== 'web',
};
