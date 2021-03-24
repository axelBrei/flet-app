import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';

export const WarningMessage = ({message}) => (
  <Container>
    <Icon name="alert" color={theme.white} size={30} />
    <Message>{message}</Message>
  </Container>
);

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.primaryDarkColor};
  width: 100%;
  padding: 10px;
  border-radius: 20px;
`;

const Message = styled(AppText)`
  flex-shrink: 1;
  font-size: 12px;
  color: ${theme.white};
  margin-left: 10px;
  font-weight: bold;
`;
