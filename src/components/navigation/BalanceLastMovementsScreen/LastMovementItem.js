import React from 'react';
import styled from 'styled-components';
import {Row} from 'components/ui/Row';
import {AppText} from 'components/ui/AppText';
import dayjs from 'dayjs';
import {theme} from 'constants/theme';

export const LastMovementItem = ({item}) => {
  return (
    <StyledRow>
      <AppText>{dayjs(item.dateCreated).format('DD/MM/YYYY - hh:mm')}</AppText>
      <AppText>${item.transactionAmount}</AppText>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-color: ${theme.grayBackground};
`;
