import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBalance,
  fetchCashout,
  selectCashoutError,
  selectCourrierBalance,
  selectIsLoadingCashout,
} from 'redux-store/slices/balanceSlice';
import {Row} from 'components/ui/Row';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {AnimatedError} from 'components/ui/AnimatedError';
import {useAnimatedOperationResult} from 'components/Hooks/useAnimatedSuccesContent';

export const CashoutModalContent = ({closeModal}) => {
  const dispatch = useDispatch();
  const {card, cash} = useSelector(selectCourrierBalance);
  const isLoading = useSelector(selectIsLoadingCashout);
  const error = useSelector(selectCashoutError);
  const [pressed, setPressed] = useState(false);

  const onPressCashout = useCallback(() => {
    dispatch(fetchCashout());
    setPressed(true);
  }, []);

  const {OperationResultContent} = useAnimatedOperationResult({
    successConditions: [pressed, !isLoading],
    title: error
      ? 'Ocurrió un error al querer hacer el retiro'
      : 'Retiro de fondos exitoso!',
    message: error
      ? ''
      : 'Verás el dinero acreditado en tu cuenta en los próximos 4 días habiles.',
    isErrorContent: !!error,
    buttonText: 'Aceptar',
    onHideOperationResult: () => {
      dispatch(fetchBalance());
      setPressed(false);
      closeModal();
    },
  });

  const totalEarned = card?.balance - card?.fee - cash?.fee || '';
  return (
    <Container>
      <Title>Retiro de fondos</Title>
      <Subtitle>Desglose</Subtitle>
      <DataContainer>
        <Row>
          <AppText>Ganancia tarjeta</AppText>
          <AppText>${card.balance}</AppText>
        </Row>
        <Row>
          <AppText>Comisiones Tarjeta</AppText>
          <Discount>- ${card.fee}</Discount>
        </Row>
        <Row>
          <AppText>Comisiones efectivo</AppText>
          <Discount>- ${cash.fee}</Discount>
        </Row>
        <TotalValue>Total: ${totalEarned}</TotalValue>
      </DataContainer>
      <MainButton loading={isLoading} onPress={onPressCashout}>
        Retirar
      </MainButton>
      <CancelButton
        disabled={isLoading}
        color={theme.cancel}
        onPress={closeModal}>
        Cancelar
      </CancelButton>
      <OperationResultContent />
    </Container>
  );
};

const Container = styled.View`
  width: ${({theme}) => theme.screenWidth - 40}px;
  border-radius: 20px;
  padding: 20px;
  min-height: 150px;
`;

const Subtitle = styled(AppText)`
  font-size: 16px;
  text-decoration: underline;
`;

const DataContainer = styled.View`
  padding: 0 10px 10px;
`;

const Discount = styled(AppText)`
  color: ${theme.cancel};
`;

const TotalValue = styled(Title)`
  width: 100%;
  text-align: right;
`;

const CancelButton = styled(MainButton)`
  background-color: ${theme.backgroundColor};
  border-width: 1px;
  border-color: ${theme.cancel};
`;

const ErrorMessage = styled(AppText)`
  font-size: 14px;
  color: ${theme.error};
`;
