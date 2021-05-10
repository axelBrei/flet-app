import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {Loader} from 'components/ui/Loader';
import {RefreshControl} from 'components/ui/RefreshControl';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBalance,
  selectBalanceError,
  selectCourrierBalance,
  selectIsLoadingBalance,
} from 'redux-store/slices/balanceSlice';
import {ProfitCard} from 'components/navigation/BalanceMainScreen/ProfitCard';
import {BalanceOptionsList} from 'components/navigation/BalanceMainScreen/BalanceOptionsList';
import {useModal} from 'components/Hooks/useModal';
import {CashoutModalContent} from 'components/navigation/BalanceMainScreen/CashoutModalContent';
import {ChangeBankNumberModalContent} from 'components/navigation/BalanceMainScreen/ChangeBankNumberModalContent';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default () => {
  const {isMobile, widthWithPadding, height, width} = useWindowDimension();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingBalance);
  const error = useSelector(selectBalanceError);
  const balance = useSelector(selectCourrierBalance);
  const [refreshing, setRefreshing] = useState(false);

  const {Modal, toggle} = useModal(CashoutModalContent, {}, {cancelable: true});

  const {Modal: CbuModal, open: openCbuModal} = useModal(
    ChangeBankNumberModalContent,
    {
      contentStyle: {
        borderRadius: 20,
        width: isMobile ? widthWithPadding : '50%',
        maxWidth: isMobile ? '100%' : 500,
      },
    },
    {cancelable: true, avoidKeyboard: true},
  );

  useEffect(() => {
    dispatch(fetchBalance());
  }, []);

  useEffect(() => {
    if (!isLoading && isLoading !== refreshing) {
      setRefreshing(isLoading);
    }
  }, [refreshing, isLoading]);

  const profit =
    balance?.card?.balance - balance?.card?.fee - balance?.cash?.fee;
  return (
    <Screen
      scrollable
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            dispatch(fetchBalance());
          }}
        />
      }>
      <Loader
        size="large"
        loading={!refreshing && isLoading}
        message="Cargando balance"
        style={{height, width}}>
        <ScreenContainer>
          <ProfitCard />
          {profit > 0 && (
            <MainButton
              style={{alignSelf: 'center', width: '100%'}}
              fontSize={16}
              onPress={toggle}>
              Cobrar ${profit}
            </MainButton>
          )}
          <BalanceOptionsList openCbuModal={openCbuModal} />
        </ScreenContainer>
      </Loader>
      <Modal />
      <CbuModal />
    </Screen>
  );
};

const ScreenContainer = styled.View`
  padding: 20px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      width: 100%;
      align-self: center;
      max-width: max(414px, 60%);
    `};
`;
