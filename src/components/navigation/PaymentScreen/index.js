import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import Screen from 'components/ui/Screen';
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
    dispatch(
      createNewShipment({
        paymentMethod: {
          ...paymentMethod,
          type: 'CARD',
        },
      }),
    );
  }, []);

  return (
    <Container enableAvoidKeyboard={false}>
      <PaymentButton loading={loading} onPaymentSubmited={onPaymentSubmited} />
    </Container>
  );
};

const Container = styled(Screen)`
  align-items: center;
  padding: 20px 0;
  ${props =>
    !props.theme.isMobile &&
    css`
      flex: 1;
      padding: 60px 20px 20px;
      max-width: 414px;
    `};
`;
