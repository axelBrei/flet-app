import React from 'react';
import styled from 'styled-components';
import {Column, Row} from 'components/ui/Row';
import {AppText} from 'components/ui/AppText';
import dayjs from 'dayjs';
import {theme} from 'constants/theme';

export const LastMovementItem = ({item}) => {
  return (
    <StyledRow>
      <Text>Hora: {dayjs(item.createdAt).format('hh:mm')}</Text>
      <Text>${item.transactionAmount}</Text>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  padding: 10px 20px;
  height: 55px;
  border-bottom-width: 1px;
  border-color: ${theme.grayBackground};
`;

const Text = styled(AppText)`
  font-size: 16px;
  font-weight: 500;
`;
