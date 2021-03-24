import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const Title = styled(AppText)`
  font-size: ${(props) => props?.size || 20}px;
  font-weight: bold;
  margin-bottom: 5px;
`;
