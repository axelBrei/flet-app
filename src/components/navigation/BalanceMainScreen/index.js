import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import Screen from 'components/ui/Screen';
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
import {theme} from 'constants/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Title} from 'components/ui/Title';

export default () => {
  const {isMobile, widthWithPadding, height, width} = useWindowDimension();
  const {top} = useSafeAreaInsets();
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

  return (
    <ScreenComponent
      scrollable
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            dispatch(fetchBalance());
          }}
        />
      }
      notchColor={theme.primaryColor}>
      <Loader
        size="large"
        loading={!refreshing && isLoading}
        message="Cargando balance"
        style={{height, width}}>
        <ScreenContainer>
          <ProfitCard toggle={toggle} />
          <BalanceOptionsList openCbuModal={openCbuModal} />
        </ScreenContainer>
      </Loader>
      <Modal />
      <CbuModal />
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  ${({theme}) =>
    theme.isMobile &&
    css`
      height: ${theme.screenHeight}px;
      width: ${theme.screenWidth}px;
    `}
`;

const ScreenContainer = styled.View`
  padding: 20px;
  height: 100%;
  width: 100%;
  flex: 1;
  ${({theme}) =>
    theme.isMobile
      ? css`
          flex: 1;
          height: 100%;
        `
      : css`
          width: 100%;
          align-self: center;
          max-width: max(414px, 60%);
        `};
`;
