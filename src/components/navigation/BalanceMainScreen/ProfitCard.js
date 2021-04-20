import React from 'react';
import {AppText} from 'components/ui/AppText';
import {Column, Row} from 'components/ui/Row';
import styled, {css} from 'styled-components';
import {theme} from 'constants/theme';
import {useSelector} from 'react-redux';
import {selectCourrierBalance} from 'redux-store/slices/balanceSlice';

export const ProfitCard = () => {
  const balance = useSelector(selectCourrierBalance);

  const totalEarned =
    balance?.card?.balance - balance?.card?.fee - balance?.cash?.fee;
  const netProfit = balance?.card?.balance + balance?.cash?.balance;
  const totalFee = balance?.card?.fee + balance?.cash?.fee;
  return (
    <BalanceCard>
      <CenteredColumn>
        <AppText>Ganancia bruta</AppText>
        <TotalEarned>${totalEarned}</TotalEarned>
      </CenteredColumn>
      <Row>
        <CenteredColumn style={{flex: 1}} displayBorder>
          <AppText>Ganancia neta</AppText>
          <PaymentValue>${netProfit}</PaymentValue>
        </CenteredColumn>
        <CenteredColumn style={{flex: 1}} displayBorder comission>
          <AppText>Comisiones</AppText>
          <PaymentValue comission>${totalFee}</PaymentValue>
        </CenteredColumn>
      </Row>
    </BalanceCard>
  );
};

const BalanceCard = styled.View`
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 20px;
  box-shadow: 0px 3px 6px ${theme.shadowColor};
  background-color: ${theme.backgroundColor};
`;

const TotalEarned = styled(AppText)`
  font-size: 40px;
  color: ${theme.online};
  font-weight: bold;
`;

const CenteredColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  ${({displayBorder, comission}) =>
    displayBorder &&
    css`
      border-top-width: 1px;
      border-color: ${theme.grayBackground};
      flex: 1;
      border-left-width: ${comission ? 1 : 0}px;
      padding-bottom: 0;
    `}
`;

const PaymentValue = styled(AppText)`
  font-size: 16px;
  font-weight: bold;
  border-top-color: ${theme.disabled};
  color: ${({comission}) => theme[comission ? 'cancel' : 'fontColor']};
`;
