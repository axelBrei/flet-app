import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import PaymentButton from 'components/ui/PaymentButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  createNewShipment,
  selectNewShipmentError,
  selectNewShipmentLoading,
} from 'redux-store/slices/newShipmentSlice';

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectNewShipmentLoading);
  const error = useSelector(selectNewShipmentError);

  const onPaymentSubmited = useCallback(paymentMethod => {
    console.log(paymentMethod);
    dispatch(
      createNewShipment({
        paymentMethod: {
          type: 'CARD',
          ...paymentMethod,
        },
      }),
    );
  }, []);

  return (
    <Screen>
      <Container>
        <PaymentButton
          loading={loading}
          onPaymentSubmited={onPaymentSubmited}
        />
      </Container>
    </Screen>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 60px 20px 20px;

  ${props =>
    !props.theme.isMobile &&
    css`
      max-width: 414px;
    `}
`;
