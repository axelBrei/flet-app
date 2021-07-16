import React from 'react';
import {AppText} from 'components/ui/AppText';
import {Column, Row} from 'components/ui/Row';
import styled, {css} from 'styled-components';
import {theme} from 'constants/theme';
import {useSelector} from 'react-redux';
import {selectCourrierBalance} from 'redux-store/slices/balanceSlice';
import {applyShadow} from 'helpers/uiHelper';
import {MainButton} from 'components/ui/MainButton';
import {setOpacityToColor} from 'helpers/colorHelper';

export const ProfitCard = ({toggle}) => {
  const balance = useSelector(selectCourrierBalance);

  const totalFee = balance?.card?.fee + balance?.cash?.fee;
  const netProfit = balance?.card?.balance + balance?.cash?.balance + totalFee;
  const totalEarned = netProfit - totalFee;

  const cashoutProfit = balance?.card?.balance - balance?.cash?.fee;
  return (
    <>
      <BalanceCard>
        <CenteredColumn>
          <AppText>Ganancia bruta</AppText>
          <TotalEarned positive={!totalEarned || totalEarned >= 0}>
            ${totalEarned || 0}
          </TotalEarned>
        </CenteredColumn>
        <MiddleContainer>
          <CenteredColumn style={{flex: 1}} displayBorder>
            <AppText>Ganancia neta</AppText>
            <PaymentValue>${netProfit || 0}</PaymentValue>
          </CenteredColumn>
          <CenteredColumn style={{flex: 1}} displayBorder comission>
            <AppText>Comisiones</AppText>
            <PaymentValue comission>${totalFee || 0}</PaymentValue>
          </CenteredColumn>
        </MiddleContainer>
        <AppText textAlign="center">Detalle ganancias</AppText>
        <ProfitDetailContainer>
          <Column>
            <AppText color={theme.primaryDarkColor} bold>
              Efectivo
            </AppText>
            <AppText>
              Ganancia:{' '}
              <AppText bold color={theme.online}>
                ${balance?.cash?.balance}
              </AppText>
            </AppText>
            <AppText>
              Comisión:{' '}
              <AppText bold color={theme.error}>
                ${balance?.cash?.fee}
              </AppText>
            </AppText>
          </Column>
          <Column>
            <AppText color={theme.primaryDarkColor} bold>
              Tarjeta
            </AppText>
            <AppText>
              Ganancia:{' '}
              <AppText bold color={theme.online}>
                ${balance?.card?.balance}
              </AppText>
            </AppText>
            <AppText>
              Comisión:{' '}
              <AppText bold color={theme.error}>
                ${balance?.card?.fee}
              </AppText>
            </AppText>
          </Column>
        </ProfitDetailContainer>
      </BalanceCard>
      {totalEarned > 0 && (
        <MainButton
          style={{alignSelf: 'center', width: '100%'}}
          fontSize={16}
          onPress={toggle}>
          Cobrar ${cashoutProfit}
        </MainButton>
      )}
    </>
  );
};

const BalanceCard = styled.View`
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 20px;
  box-shadow: 0px 3px 6px ${theme.shadowColor};
  background-color: ${theme.white};
`;
BalanceCard.defaultProps = applyShadow();

const MiddleContainer = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${setOpacityToColor(theme.lightGray, 0.6)};
  margin: 10px 0;
`;

const TotalEarned = styled(AppText)`
  font-size: 40px;
  color: ${({positive}) => (positive ? theme.online : theme.error)};
  font-weight: bold;
`;

const CenteredColumn = styled(Column)`
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  ${({displayBorder, comission}) =>
    displayBorder &&
    css`
      border-color: ${setOpacityToColor(theme.lightGray, 0.6)};
      flex: 1;
      border-left-width: ${comission ? 1 : 0}px;
    `}
`;

const PaymentValue = styled(AppText)`
  font-size: 16px;
  font-weight: bold;
  border-top-color: ${theme.disabled};
  color: ${({comission}) => theme[comission ? 'cancel' : 'fontColor']};
`;

const ProfitDetailContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;
