import React, {useCallback, useEffect, useState} from 'react';
import {Modal} from 'components/ui/Modal';
import {useSelector} from 'react-redux';
import {
  selectLoadingShipmentPrice,
  selectNewShipmentPriceData,
} from 'redux-store/slices/newShipmentSlice';
import {AppText} from 'components/ui/AppText';
import styled from 'styled-components';
import {MainButton} from 'components/ui/MainButton';
import {usePrevious} from 'components/Hooks/usePrevious';
import {theme} from 'constants/theme';

export const DebtModal = () => {
  const isLoading = useSelector(selectLoadingShipmentPrice);
  const wasLoading = usePrevious(isLoading);
  const {hasDebt, debt} = useSelector(selectNewShipmentPriceData);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  useEffect(() => {
    if (
      !alertDisplayed &&
      wasLoading &&
      !isLoading &&
      hasDebt &&
      !modalVisible
    ) {
      setModalVisible(true);
      setAlertDisplayed(true);
    }
  }, [alertDisplayed && wasLoading, isLoading, hasDebt, modalVisible]);

  const onPressAccept = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <Modal isVisible={modalVisible}>
      <Container>
        <AppText fontSize={20} bold padding="20px 0 10">
          ¡Atención!
        </AppText>
        <AppText>
          Tenés una deuda de
          <AppText color={theme.error} bold>
            ${debt}
          </AppText>{' '}
          la cual se sumará al costo de tu prócimo envío
        </AppText>
        <Button onPress={onPressAccept}>Aceptar</Button>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  padding: 0 20px;
`;

const Button = styled(MainButton)`
  margin-top: 20px;
  margin-bottom: 20px;
`;
