import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import dayjs from 'dayjs';
import {Column, Row} from 'components/ui/Row';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';

export const PendingPaymentItem = ({item}) => {
  const {createdAt, transactionAmount} = item;
  const [date, time] = dayjs(createdAt).format('DD/MM/YYYY-hh:mm').split('-');
  return (
    <Container>
      <Column>
        <Title>{date}</Title>
        <RowWithBoldData
          color={theme.fontColor}
          alternative={false}
          label="Hora"
          data={time}
        />
        <RowWithBoldData
          color={theme.fontColor}
          alternative={false}
          label="Método de pago"
          data={item.status === 'CASH' ? 'Efectivo' : 'Tarjeta'}
        />
      </Column>
      <Amount>${transactionAmount}</Amount>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  padding: 10px 20px;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  flex-direction: row;
`;

const Amount = styled(AppText)`
  background-color: ${theme.online};
  padding: 5px 10px;
  height: 32px;
  border-radius: 12px;
  overflow: hidden;
  color: ${theme.white};
  font-weight: bold;
  font-size: 16px;
`;
