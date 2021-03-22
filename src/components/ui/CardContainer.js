import {View} from 'react-native';
import {theme} from 'constants/theme';
import styled from 'styled-components';

export const CardContainer = styled(View)`
  background-color: ${(props) =>
    props.backgroundColor || theme.primaryLightColor};
  border-radius: 20px;
  width: 100%;
  margin: 5px 20px;
  padding: 10px;
`;
