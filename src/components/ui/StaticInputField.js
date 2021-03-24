import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const StaticInputField = ({label, children, ...props}) => (
  <Container style={props.style}>
    <Label bold>{label}</Label>
    <Text
      numberOfLines={1}
      textAlign={props.textAlign}
      bold={props.bold}
      size={props.fontSize}>
      {children}
    </Text>
  </Container>
);

const Container = styled.View`
  background-color: ${theme.grayBackground};
  border-radius: 30px;
  padding: 5px 20px;
  margin: 5px 0;
`;

const Label = styled(AppText)`
  font-size: 12px;
  color: ${theme.disabledFont};
`;

const Text = styled(AppText)`
  font-size: ${(props) => props.size || 14}px;
`;
