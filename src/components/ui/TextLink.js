import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const TextLink = styled(AppText)`
  text-decoration: underline;
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color || theme.fontColor};
  text-decoration-color: ${props => props.color || theme.fontColor};
`;

TextLink.defaultProps = {
  fontSize: 16,
};
