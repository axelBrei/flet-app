import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp} from 'helpers/responsiveHelper';

export const TextLink = styled(AppText)`
  text-decoration: underline;
  font-size: ${(props) => scaleDp(props.fontSize)}px;
`;

TextLink.defaultProps = {
  fontSize: 16,
};
