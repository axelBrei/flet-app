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
import {ChangeBankNumberModalContent} from 'components/navigation/BalanceMainScreen/ChangeBankNumberModalContent';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default () => {
  const {isMobile, widthWithPadding} = useWindowDimension();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingBalance);
  const error = useSelector(selectBalanceError);
  const balance = useSelector(selectCourrierBalance);

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

  const profit =
    balance?.card?.balance - balance?.card?.fee - balance?.cash?.fee;
  return (
    <Screen>
      <Loader size="large" loading={isLoading} message="Cargando balance">
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
        <Modal />
        <CbuModal />
      </Loader>
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
