import React, {useEffect} from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {theme} from 'constants/theme';
import {Column, Row} from 'components/ui/Row';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {Loader} from 'components/ui/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBalance,
  selectBalanceError,
  selectCourrierBalance,
  selectIsLoadingBalance,
} from 'redux-store/slices/balanceSlice';
import {ProfitCard} from 'components/navigation/BalanceMainScreen/ProfitCard';
import {CommonList} from 'components/ui/CommonList';
import {BalanceOptionsList} from 'components/navigation/BalanceMainScreen/BalanceOptionsList';
import {useModal} from 'components/Hooks/useModal';
import {CashoutModalContent} from 'components/navigation/BalanceMainScreen/CashoutModalContent';

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingBalance);
  const error = useSelector(selectBalanceError);
  const balance = useSelector(selectCourrierBalance);

  const {Modal, toggle} = useModal(
    CashoutModalContent,
    {},
    {cancelable: false},
  );

  useEffect(() => {
    dispatch(fetchBalance());
  }, []);

  const profit = balance?.card.balance - balance?.card.fee - balance?.cash.fee;
  return (
    <Screen>
      <Loader size="large" loading={isLoading} message="Cargando balance">
        <ScreenContainer>
          <ProfitCard />
          {profit > 0 && (
            <MainButton fontSize={16} onPress={toggle}>
              Cobrar ${profit}
            </MainButton>
          )}
          <BalanceOptionsList />
        </ScreenContainer>
        <Modal />
      </Loader>
    </Screen>
  );
};

const ScreenContainer = styled.View`
  padding: 20px;
`;
