import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import webStyled from '../../../../node_modules/styled-components';
import Config from 'react-native-config';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {Loader} from 'components/ui/Loader';
import {useUserData} from 'components/Hooks/useUserData';
import {keysToCamelCase} from 'helpers/objectHelper';
import {useSelector} from 'react-redux';
import {selectNewShipmentPrice} from 'redux-store/slices/newShipmentSlice';

export default ({onPaymentSubmited, loading}) => {
  const price = useSelector(selectNewShipmentPrice);
  const mp = new window.MercadoPago(
    'TEST-26dcc4a1-7a5b-4d63-9de5-e6d818994dfa',
  );

  useEffect(() => {
    const cardForm = mp.cardForm({
      amount: Math.ceil(price).toString(),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular de la tarjeta',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
          defaultValue: 'Tomate',
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número de la tarjeta',
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'Mes de vencimiento',
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'Año de vencimiento',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de seguridad',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número de documento',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor',
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error)
            return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onSubmit: event => {
          event.preventDefault();

          const {
            paymentMethodId,
            issuerId,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          onPaymentSubmited?.({
            installments,
            docNumber: identificationNumber,
            docType: identificationType,
            issuerId,
            paymentMethodId,
            token,
          });

          // fetch('/process_payment', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     token,
          //     issuer_id,
          //     payment_method_id,
          //     transaction_amount: Number(amount),
          //     installments: 1, // Number(installments),
          //     description: 'Viaje FletApp', // 'Descripción del producto',
          //     payer: {
          //       first_name: name,
          //       last_name: lastName,
          //       email,
          //       identification: {
          //         type: identificationType,
          //         number: identificationNumber,
          //       },
          //     },
          //   }),
          // });
        },
      },
    });
  }, []);

  return (
    <>
      <Container nativeID="mp-container">
        <script src="https://sdk.mercadopago.com/js/v2"></script>
        <Loader
          loading={loading}
          unmount={false}
          size={24}
          message="Estamos enviando tu pago">
          <Form id="form-checkout">
            <Title>Datos de la tarjeta</Title>
            <Input
              type="text"
              name="cardNumber"
              id="form-checkout__cardNumber"
            />
            <Row>
              <Input
                type="text"
                name="cardExpirationMonth"
                id="form-checkout__cardExpirationMonth"
              />
              <Input
                type="text"
                name="cardExpirationYear"
                id="form-checkout__cardExpirationYear"
              />
            </Row>
            <Input
              type="text"
              name="securityCode"
              id="form-checkout__securityCode"
            />
            <Row>
              <Select flex name="issuer" id="form-checkout__issuer" />
              <Select
                flex
                name="installments"
                id="form-checkout__installments"
              />
            </Row>
            <Title padding="20px 0 0">Datos de la personales</Title>
            <Input
              type="text"
              name="cardholderName"
              id="form-checkout__cardholderName"
            />
            <Input
              hidden
              type="email"
              name="cardholderEmail"
              id="form-checkout__cardholderEmail"
            />
            <Row>
              <Select
                name="identificationType"
                id="form-checkout__identificationType"
              />
              <Input
                type="text"
                name="identificationNumber"
                id="form-checkout__identificationNumber"
              />
            </Row>
            <PayButton type="submit" id="form-checkout__submit">
              Pagar
            </PayButton>
          </Form>
        </Loader>
      </Container>
    </>
  );
};

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Form = webStyled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Input = webStyled.input`
  border: none;
  border-radius: 20px;
  background-color: ${theme.grayBackground};
  padding: 15px 20px;
  margin: 5px;
  flex: 1;
  
  ${props => !props.theme.isMobile < 800 && 'max-width: 414px'}
`;

const Select = webStyled.select`
  border: none;
  border-radius: 20px;
  background-color: ${theme.grayBackground};
  padding: 15px 20px;
  margin: 5px;
  flex: ${props => (props.flex ? 1 : 'initial')};
`;

const PayButton = webStyled.button`
    border: none;
    box-shadow: none;
    background-color: ${theme.primaryColor};
    color: ${theme.white};
    margin: 20px 5px 5px;
    padding: 10px 50px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    z-index: 0;
`;
